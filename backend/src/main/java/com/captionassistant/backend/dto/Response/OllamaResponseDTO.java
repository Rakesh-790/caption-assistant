package com.captionassistant.backend.dto.Response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class OllamaResponseDTO {
    private String response;    
}
