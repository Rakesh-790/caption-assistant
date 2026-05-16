package com.captionassistant.backend.service.IService;

import org.springframework.web.multipart.MultipartFile;

import com.captionassistant.backend.dto.Request.CaptionCreateRequestDTO;

public interface IAIService {
    String generateCaption(CaptionCreateRequestDTO createRequestDTO, MultipartFile image);
}
