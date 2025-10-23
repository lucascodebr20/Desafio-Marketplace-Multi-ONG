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
    
    Sempre tente preencher ao menos 3 keywords e 2 categorias relacionadas (mesmo que aproximadas).  
    Se não houver valor, use `null`.  
    
    Você tem as seguintes categorias cadastradas: 
    
    Romance: Foca em relacionamentos amorosos e no desenvolvimento emocional dos protagonistas.
    Thriller: Envolve crimes, investigações, perigos, alta tensão e corridas contra o tempo.
    Sci-Fi: Explora conceitos de ciência, tecnologia, futuros distópicos e vida extraterrestre.
    Fantasia: Utiliza elementos mágicos, sobrenaturais, mundos imaginários e criaturas míticas.
    Jovem Adulto: Focada em protagonistas adolescentes e seus desafios, descobertas e amadurecimento.
    Terror: Projetado para causar medo, choque ou repulsa no leitor, lidando com o macabro.
    Biografia: A história da vida de uma pessoa real, contada por ela mesma (memória) ou por outra.
    Auto Ajuda: Oferece conselhos e técnicas para o leitor melhorar aspectos de sua vida.
    História: Obras que examinam e narram eventos, períodos e figuras do passado, baseadas em fatos.
    Informativo: Livros sobre ciência, negócios, filosofia, saúde e outros tópicos factuais.

    Sua resposta DEVE SER APENAS o objeto JSON, sem nenhum texto adicional, explicação ou markdown.  

    Exemplos:

    - Usuário: "Livros de aventura no espaço com alienígenas por menos de 80 reais"
    JSON: {"keywords": ["livro", "aventura", "espaço", "alienígenas"], "category": ["Sci-Fi"], "price_max": 80.00, "price_min": null}

    - Usuário: "Quero a biografia de um inventor famoso"
    JSON: {"keywords": ["biografia", "inventor", "famoso", "vida"], "category": ["Biografia", "Informativo"], "price_max": null, "price_min": null}

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
            return geminiResponse.candidates().getFirst().content().parts().getFirst().text();
        }

        throw new RuntimeException("Não foi possível obter uma resposta da API do Gemini.");
    }
}