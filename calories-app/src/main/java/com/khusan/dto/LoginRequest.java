package com.khusan.dto;

import lombok.Data;

@Data
public class LoginRequest {

    private String email;
    private String password;

    // Constructors
    public LoginRequest() {
    }

    public LoginRequest(String email, String password) {
        this.email = email;
        this.password = password;
    }

}