package com.captionassistant.backend.dto.Request;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OllamaVisionRequestDTO {
    private String model;

    private String prompt;

    private boolean stream;

    private List<String> images;
}
