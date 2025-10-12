package com.khusan.service;

import com.khusan.ollama.OllamaRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;


@Service
public class OllamaService {

    private final WebClient webClient;

    @Value("${ollama.model}")
    private String modelName;

    @Autowired
    public OllamaService(WebClient.Builder webClientBuilder, Environment env) {
        String apiUrl = env.getProperty("ollama.api.url");
        this.webClient = webClientBuilder.baseUrl(apiUrl).build();
    }

    public Mono<String> getFoodNutritionInfo(String prompt) {
        OllamaRequest request = new OllamaRequest();
        request.setModel(modelName);
        request.setPrompt(prompt);

        return webClient.post()
                .uri("/api/generate")
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(request)
                .retrieve()
                .bodyToMono(String.class);
    }

}
