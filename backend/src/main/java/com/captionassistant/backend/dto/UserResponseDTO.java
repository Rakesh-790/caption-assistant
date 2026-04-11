package com.captionassistant.backend.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class UserResponseDTO {

    private String email;

    private String role;

    private LocalDateTime createdAt;
}
