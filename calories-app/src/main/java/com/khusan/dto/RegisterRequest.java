package com.khusan.dto;

import lombok.Data;

@Data
public class RegisterRequest {

    private String email;
    private String username;
    private String password;

    // Constructors
    public RegisterRequest() {
    }

    public RegisterRequest(String email, String username, String password) {
        this.email = email;
        this.username = username;
        this.password = password;
    }

}