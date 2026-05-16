package com.captionassistant.backend.service.IService;

import com.captionassistant.backend.dto.Request.CaptionCreateRequestDTO;

public interface IAIService {
    String generateCaption(CaptionCreateRequestDTO createRequestDTO);
}
