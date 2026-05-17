package com.captionassistant.backend.service.ServiceImpl;

import java.io.IOException;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.captionassistant.backend.dto.Response.UploadResponseDTO;

import lombok.RequiredArgsConstructor;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

@Service
@RequiredArgsConstructor
public class AwsS3Service {

    private final S3Client client;

    @Value("${aws.s3.bucket-name}")
    private String bucketName;

    public UploadResponseDTO uploadFile(MultipartFile file) {
        try {
            String originalFile = file.getOriginalFilename();

            String fileName = UUID.randomUUID() + "-" + originalFile;

            String key = "caption/" + fileName;

            PutObjectRequest objectRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(key)
                    .contentType(file.getContentType())
                    .build();

            client.putObject(objectRequest, RequestBody.fromBytes(file.getBytes()));

            return new UploadResponseDTO(generateFileURL(key), key) ;

        } catch (IOException e) {
            throw new RuntimeException("Failed to upload image to S3", e);
        }
    }

    private String generateFileURL(String key) {
        return String.format(
                "https://%s.s3.ap-south-1.amazonaws.com/%s",
                bucketName,
                key);
    }
}
