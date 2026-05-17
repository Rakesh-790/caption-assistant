package com.captionassistant.backend.dto.Response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UploadResponseDTO {
    
    private String imageURL;

    private String imageKey;
}
