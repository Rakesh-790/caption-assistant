package com.captionassistant.backend.service.ServiceImpl;

import org.springframework.stereotype.Service;

import com.captionassistant.backend.dto.Request.CaptionCreateRequestDTO;
import com.captionassistant.backend.service.IService.IAIService;

@Service
public class AIServiceImpl implements IAIService {
    
    @Override
    public String generateCaption(CaptionCreateRequestDTO createRequestDTO){
        return "This is a demo caption for" + createRequestDTO.getPrompt();
    }
}
