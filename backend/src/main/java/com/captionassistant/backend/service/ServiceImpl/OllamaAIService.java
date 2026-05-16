package com.captionassistant.backend.service.ServiceImpl;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.captionassistant.backend.dto.Request.CaptionCreateRequestDTO;
import com.captionassistant.backend.dto.Request.OllamaRequestDTO;
import com.captionassistant.backend.dto.Response.OllamaResponseDTO;
import com.captionassistant.backend.service.IService.IAIService;

import lombok.RequiredArgsConstructor;

@Primary
@Service
@RequiredArgsConstructor
public class OllamaAIService implements IAIService {
    private final WebClient webClient;

    @Value("${ollama.api.url}")
    private String ollamaUrl;

    @Value("${ollama.api.model}")
    private String model;

    public String generateCaption(CaptionCreateRequestDTO createRequestDTO) {

        String finalPrompt = buildPrompt(createRequestDTO);

        OllamaRequestDTO request = new OllamaRequestDTO(
                model,
                finalPrompt,
                false);

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
                You are a professional social media caption writer.

                Generate a highly engaging social media caption.

                Caption Details:
                - Platform: %s
                - Tone: %s
                - Language: %s
                - Topic: %s

                Strict Rules:
                - Return ONLY the caption
                - Do NOT return JSON
                - Do NOT use quotation marks
                - Do NOT explain anything
                - Keep it short and attractive
                - Add suitable emojis
                - Add 3 to 5 relevant hashtags
                - Make it human-like and natural
                - Avoid repeating words

                Generate the caption now.
                """.formatted(
                responseDTO.getPlatform(),
                responseDTO.getTone(),
                responseDTO.getLanguage(),
                responseDTO.getPrompt());
    }

    private String cleanAiResponse(String response){
        if (response == null || response.isBlank()) {
            return "";
        }

        response = response.trim();

        if (response.startsWith("\"") && response.endsWith("\"")) {
            response = response.substring(1, response.length() - 1);
        }

        response = response.replace("\\\"", "\"");

        response.replace("\n", " ").trim();

        return response;
    }
}
