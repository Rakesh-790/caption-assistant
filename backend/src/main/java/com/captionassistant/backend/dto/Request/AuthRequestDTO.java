package com.captionassistant.backend.dto.Request;


import lombok.Data;

@Data
public class AuthRequestDTO {

    private String email;

    private String password;
}
