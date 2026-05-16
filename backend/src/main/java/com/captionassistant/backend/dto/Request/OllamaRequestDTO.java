package com.captionassistant.backend.dto.Request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OllamaRequestDTO {
    private String model;

    private String prompt;

    private boolean stream;
}
