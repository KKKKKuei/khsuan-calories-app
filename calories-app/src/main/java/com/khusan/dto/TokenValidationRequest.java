package com.khusan.dto;

public class TokenValidationRequest {

    private String token;

    // Constructors
    public TokenValidationRequest() {}

    public TokenValidationRequest(String token) {
        this.token = token;
    }

    // Getters and Setters
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
}