package com.khusan.ollama;

import lombok.Data;

import java.util.List;

@Data
public class OllamaRequest {
    private String model;
    private String prompt;
    private List<String> images;
    private boolean stream = false; // 為了簡單起見，我們關閉串流
}
