package com.captionassistant.backend.service.ServiceImpl;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.captionassistant.backend.dto.Response.UploadResponseDTO;
import com.captionassistant.backend.model.ImageEntity;
import com.captionassistant.backend.model.UserEntity;
import com.captionassistant.backend.repository.ImageRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ImageServiceImpl {
    
    private final AwsS3Service s3Service;

    private final ImageRepository imageRepository;

    public ImageEntity uploadImage(MultipartFile file, UserEntity userEntity){

        UploadResponseDTO uploadResponseDTO = s3Service.uploadFile(file);

        ImageEntity imageEntity = new ImageEntity();

        imageEntity.setImageURL(uploadResponseDTO.getImageURL());
        
        imageEntity.setImageKey(uploadResponseDTO.getImageKey());

        imageEntity.setCreatedAt(LocalDateTime.now());

        imageEntity.setUser(userEntity);

        return imageRepository.save(imageEntity);
    }
}
