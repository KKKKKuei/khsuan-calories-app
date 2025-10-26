package com.khusan.dto;

import com.khusan.entity.Users;

public class AuthResponse {

    private String token;
    private Users user;
    private String message;

    // Constructors
    public AuthResponse() {}

    public AuthResponse(String token, Users user) {
        this.token = token;
        this.user = user;
    }

    public AuthResponse(String message) {
        this.message = message;
    }

    // Getters and Setters
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }

    public Users getUser() { return user; }
    public void setUser(Users user) { this.user = user; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

}