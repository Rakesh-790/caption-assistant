package com.captionassistant.backend.dto.Response;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class ImageResponseDTO {
    private Long id;

    private String imageUrl;

    private LocalDateTime createdAt;
    
    private Long userId;
}
