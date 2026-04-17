package com.captionassistant.backend.mapper;

import java.util.List;
import java.util.stream.Collectors;

import com.captionassistant.backend.dto.Request.ImageUploadRequestDTO;
import com.captionassistant.backend.dto.Response.ImageResponseDTO;
import com.captionassistant.backend.model.ImageEntity;

public class ImageMapper {
    public static ImageResponseDTO toDTO(ImageEntity image) {
        if (image == null)
            return null;

        ImageResponseDTO dto = new ImageResponseDTO();

        dto.setId(image.getImageId());
        dto.setImageUrl(image.getImageURL());
        dto.setCreatedAt(image.getCreatedAt());

        if (image.getUser() != null) {
            dto.setUserId(image.getUser().getUserId());
        }

        return dto;
    }

    public static List<ImageResponseDTO> toDTOList(List<ImageEntity> images) {
        if (images == null)
            return null;

        return images.stream()
                .map(ImageMapper::toDTO)
                .collect(Collectors.toList());
    }

    public static ImageEntity toEntity(ImageUploadRequestDTO request) {
        if (request == null) return null;

        ImageEntity image = new ImageEntity();

        image.setImageURL(request.getImageURL());

        return image;

    }
}
