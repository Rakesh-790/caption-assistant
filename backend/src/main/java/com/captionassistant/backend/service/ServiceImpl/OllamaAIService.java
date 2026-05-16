package com.captionassistant.backend.service.ServiceImpl;

import java.io.IOException;
import java.util.Base64;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.client.WebClient;

import com.captionassistant.backend.dto.Request.CaptionCreateRequestDTO;
import com.captionassistant.backend.dto.Request.OllamaVisionRequestDTO;
import com.captionassistant.backend.dto.Response.OllamaResponseDTO;
import com.captionassistant.backend.service.IService.IAIService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OllamaAIService implements IAIService {
    private final WebClient webClient;

    @Value("${ollama.api.url}")
    private String ollamaUrl;

    @Value("${ollama.api.model}")
    private String model;

    public String generateCaption(CaptionCreateRequestDTO createRequestDTO, MultipartFile image) {

        String finalPrompt = buildPrompt(createRequestDTO);

        String base64Image;

        try {
            base64Image = encodeImage(image);
        } catch (IOException e) {
            throw new RuntimeException("Failed to process image", e);
        }

        OllamaVisionRequestDTO request = new OllamaVisionRequestDTO(
                model,
                finalPrompt,
                false,
                List.of(base64Image));

        OllamaResponseDTO response = webClient
                .post()
                .uri(ollamaUrl)
                .bodyValue(request)
                .retrieve()
                .bodyToMono(OllamaResponseDTO.class)
                .block();

        if (response == null || response.getResponse() == null) {
            throw new RuntimeException("Failed to generate AI caption");
        }

        return cleanAiResponse(response.getResponse());
    }

    private String buildPrompt(CaptionCreateRequestDTO responseDTO) {

        return """
                You are an expert social media caption writer.

                Analyze the uploaded image carefully and generate a highly engaging caption based on the visual content of the image.

                Caption Requirements:
                - Platform: %s
                - Tone: %s
                - Language: %s
                - Additional User Context: %s

                Strict Rules:
                - Use the uploaded image as the primary context
                - Return ONLY the caption
                - Do NOT explain anything
                - Do NOT return JSON
                - Do NOT use quotation marks
                - Keep the caption natural and human-like
                - Make it engaging and attractive
                - Add suitable emojis naturally
                - Add 3 to 5 relevant hashtags
                - Avoid repetitive wording
                - Keep it concise and platform-appropriate

                Generate the caption now.
                """
                .formatted(
                        responseDTO.getPlatform(),
                        responseDTO.getTone(),
                        responseDTO.getLanguage(),
                        responseDTO.getPrompt());
    }

    private String cleanAiResponse(String response) {
        if (response == null || response.isBlank()) {
            return "";
        }

        response = response.trim();

        if (response.startsWith("\"") && response.endsWith("\"")) {
            response = response.substring(1, response.length() - 1);
        }

        response = response.replace("\\\"", "\"");

        response = response.replace("\n", " ").trim();

        return response;
    }

    private String encodeImage(MultipartFile file) throws IOException {
        return Base64.getEncoder().encodeToString(file.getBytes());
    }
}
