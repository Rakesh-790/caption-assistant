package com.captionassistant.backend.mapper;

import java.util.List;
import java.util.stream.Collectors;

import com.captionassistant.backend.dto.Request.CaptionCreateRequestDTO;
import com.captionassistant.backend.dto.Response.CaptionResponseDTO;
import com.captionassistant.backend.model.CaptionEntity;

public class CaptionMapper {
    public static CaptionResponseDTO toDTO(CaptionEntity caption) {
        if (caption == null)
            return null;

        CaptionResponseDTO dto = new CaptionResponseDTO();

        dto.setId(caption.getCaptionId());
        dto.setPrompt(caption.getPrompt());
        dto.setLanguage(caption.getLanguage());
        dto.setTone(caption.getTone());
        dto.setPlatform(caption.getPlatform());
        dto.setCreatedAt(caption.getCreatedAt());

        if (caption.getUser() != null) {
            dto.setUserId(caption.getUser().getUserId());
        }

        if (caption.getImage() != null) {
            dto.setImageId(caption.getImage().getImageId());
        }

        dto.setAiCaption(caption.getAiCaption());

        if (caption.getGroup() != null) {
            dto.setGroupId(caption.getGroup().getGroupId());
        }

        return dto;
    }

    public static List<CaptionResponseDTO> toDTOList(List<CaptionEntity> captions) {
        if (captions == null)
            return null;

        return captions.stream()
                .map(CaptionMapper::toDTO)
                .collect(Collectors.toList());
    }

    public static CaptionEntity toEntity(CaptionCreateRequestDTO request) {
        if (request == null)
            return null;

        CaptionEntity caption = new CaptionEntity();

        caption.setPrompt(request.getPrompt());
        caption.setLanguage(request.getLanguage());
        caption.setTone(request.getTone());
        caption.setPlatform(request.getPlatform());

        return caption;
    }
}
