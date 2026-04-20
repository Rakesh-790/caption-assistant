package com.captionassistant.backend.service.IService;

import java.util.List;

import org.springframework.data.domain.Page;

import com.captionassistant.backend.dto.Request.CaptionCreateRequestDTO;
import com.captionassistant.backend.dto.Response.CaptionResponseDTO;

public interface ICaptionService {
    CaptionResponseDTO createCaption(CaptionCreateRequestDTO requestDTO);

    List<CaptionResponseDTO> getCaptionsByGroup(Long groupId);

    Page<CaptionResponseDTO> getCaptionsByGroupPage(Long groupId, int page, int size);
}
