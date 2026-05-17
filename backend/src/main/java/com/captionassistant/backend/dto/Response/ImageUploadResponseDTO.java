package com.captionassistant.backend.dto.Response;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;


@Data
@AllArgsConstructor
@Builder
public class ImageUploadResponseDTO {

    private Long imageId;

    private String imageUrl;

    private String imageKey;

    private LocalDateTime createdAt;
}
