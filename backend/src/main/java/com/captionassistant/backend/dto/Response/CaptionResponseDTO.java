package com.captionassistant.backend.dto.Response;

import java.time.LocalDateTime;

import com.captionassistant.backend.constants.Language;
import com.captionassistant.backend.constants.Platform;
import com.captionassistant.backend.constants.Tone;

import lombok.Data;

@Data
public class CaptionResponseDTO {
    private Long id;

    private String prompt;

    private Language language;

    private Tone tone;

    private Platform platform;

    private Long userId;

    private Long imageId;

    private LocalDateTime createdAt;

    private String aiCaption;
    
    private Long groupId;
}
