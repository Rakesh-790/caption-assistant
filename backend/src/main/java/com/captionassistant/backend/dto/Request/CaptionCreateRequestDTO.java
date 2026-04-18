package com.captionassistant.backend.dto.Request;


import com.captionassistant.backend.constants.Language;
import com.captionassistant.backend.constants.Platform;
import com.captionassistant.backend.constants.Tone;

import lombok.Data;

@Data
public class CaptionCreateRequestDTO {

    private String prompt;

    private Language language;

    private Platform platform;

    private Tone tone;

    private Long groupId;
}
