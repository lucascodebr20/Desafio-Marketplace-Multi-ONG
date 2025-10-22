package com.backend.marktplace.util.gemini;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import java.util.List;

@Service
public class GeminiApi {

    @Value("${gemini.api.key}")
    private String apiKey;

    private final WebClient webClient;

    public GeminiApi(WebClient.Builder webClientBuilder,
                     @Value("${gemini.api.url}") String apiUrl) {
        this.webClient = webClientBuilder.baseUrl(apiUrl).build();
    }

    public String generateResponseSearch(String userInput) {
        String prompt = """
    Você é um assistente de e-commerce especialista em converter buscas de usuários em filtros JSON.
    Analise o texto do usuário e extraia as seguintes informações, se disponíveis:
    - "keywords": Pelo menos 4 palavras-chave principais da busca, incluindo marca, tipo de produto e características relevantes.
    - "category": A categoria principal do produto.
    - "price_max": O preço máximo (se especificado).
    - "price_min": O preço mínimo (se especificado).
    
    Sempre tente preencher ao menos 4 keywords e 3 categorias relacionadas (mesmo que aproximadas).  
    Se não houver valor, use `null`.  

    Sua resposta DEVE SER APENAS o objeto JSON, sem nenhum texto adicional, explicação ou markdown.  

    Exemplos:
    - Usuário: "Quero um boneco de herói"
      JSON: {"keywords": ["herói", "protagonista", "salvador", "quadrinhos"], "category": ["Marvel", "DC", "Quadrinhos"], "price_max": 500.00, "price_min": null}
    
    - Usuário: "Quero um funko de princesa"
      JSON: {"keywords": ["princesa","menina","rosa","disney"], "category": ["Disney", "Princesas", "Menina"], "price_max": null, "price_min": null}

    Agora, analise a seguinte busca do usuário:
    "%s"
    """.formatted(userInput);

        Part part = new Part(prompt);
        Content content = new Content(List.of(part));
        GeminiRequest requestBody = new GeminiRequest(List.of(content));

        GeminiResponse geminiResponse = webClient.post()
                .uri("")
                .header("x-goog-api-key", apiKey)
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(GeminiResponse.class)
                .block();

        if (geminiResponse != null && !geminiResponse.candidates().isEmpty()) {
            // Retornamos o texto puro, que esperamos ser um JSON
            return geminiResponse.candidates().getFirst().content().parts().getFirst().text();
        }

        throw new RuntimeException("Não foi possível obter uma resposta da API do Gemini.");
    }
}