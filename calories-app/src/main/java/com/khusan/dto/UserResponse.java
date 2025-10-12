package com.khusan.dto;

import lombok.Data;

@Data
public class UserResponse {

    private Integer id;
    private String email;
    private String username;

    // Constructors
    public UserResponse() {}

    public UserResponse(Integer id, String email, String username) {
        this.id = id;
        this.email = email;
        this.username = username;
    }

}