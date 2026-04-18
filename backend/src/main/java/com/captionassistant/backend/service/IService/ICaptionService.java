package com.captionassistant.backend.service.IService;

import com.captionassistant.backend.dto.Request.CaptionCreateRequestDTO;
import com.captionassistant.backend.dto.Response.CaptionResponseDTO;

public interface ICaptionService {
    CaptionResponseDTO createCaption(CaptionCreateRequestDTO requestDTO);
}
