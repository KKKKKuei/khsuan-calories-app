package com.khusan.ollama;

import lombok.Data;

import java.util.List;

@Data
public class OllamaResponse {
    private String model;
    private String createdAt;
    private String response;
    private List<String> images;
    private boolean done;
}
