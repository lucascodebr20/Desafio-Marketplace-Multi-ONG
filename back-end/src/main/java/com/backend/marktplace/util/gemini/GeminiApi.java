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
    Você é um assistente de e-commerce especialista em converter buscas de usuários sobre colecionáveis (como Funkos) em filtros JSON.
    
    Analise o texto do usuário e extraia as seguintes informações, se disponíveis:
    - "keywords": Pelo menos 4 palavras-chave principais da busca, incluindo personagem, franquia, tipo de produto e características relevantes (ex: edição especial, raro, exclusivo, customizado).
    - "category": A categoria principal da franquia ou universo do personagem.
    - "price_max": O preço máximo (se especificado).
    - "price_min": O preço mínimo (se especificado).
    
    Sempre tente preencher ao menos 3 keywords e até 2 categorias relacionadas (mesmo que aproximadas).  
    Se não houver valor, use `null`.  
    
    Você tem as seguintes categorias cadastradas:
    
    Marvel: Personagens do universo Marvel, como Homem de Ferro, Spider-Man, Thanos, etc.  
    DC: Personagens da DC Comics, como Batman, Superman, Coringa, etc.  
    Harry Potter: Personagens e criaturas do universo de Harry Potter e Animais Fantásticos.  
    Disney: Personagens dos filmes e séries da Disney e Pixar, incluindo princesas, vilões e clássicos.  
    Games: Personagens e criaturas de jogos eletrônicos (Ex: Mario, Zelda, God of War, Fortnite, etc.).  
    Animes: Personagens e criaturas de animes e mangás (Ex: Dragon Ball, One Piece, Naruto, etc.).
    
    Sua resposta DEVE SER APENAS o objeto JSON, sem nenhum texto adicional, explicação ou markdown.  

    Exemplos:

    - Usuário: "Funko do Spider-Man exclusivo por menos de 100 reais"
    JSON: {"keywords": ["funko", "spider-man", "exclusivo", "marvel"], "category": ["Marvel"], "price_max": 100.00, "price_min": null}

    - Usuário: "Quero um Funko do Luffy customizado de One Piece"
    JSON: {"keywords": ["funko", "luffy", "customizado", "one piece"], "category": ["Animes"], "price_max": null, "price_min": null}

    - Usuário: "Funkos da Disney até 80 reais"
    JSON: {"keywords": ["funko", "disney", "personagens", "colecionáveis"], "category": ["Disney"], "price_max": 80.00, "price_min": null}

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