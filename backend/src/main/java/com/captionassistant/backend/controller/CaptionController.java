package com.captionassistant.backend.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.captionassistant.backend.dto.Request.CaptionCreateRequestDTO;
import com.captionassistant.backend.dto.Response.CaptionResponseDTO;
import com.captionassistant.backend.service.IService.ICaptionService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/caption")
public class CaptionController {
    private final ICaptionService captionService;

    @PostMapping(value = "/generate", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<CaptionResponseDTO> createCaption(@ModelAttribute CaptionCreateRequestDTO request,
            @RequestParam("images") MultipartFile image) {
        
        CaptionResponseDTO response = captionService.createCaption(request, image);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/group/{groupId}")
    public ResponseEntity<List<CaptionResponseDTO>> getCaptionsByGroupList(
            @PathVariable Long groupId) {

        List<CaptionResponseDTO> captions = captionService.getCaptionsByGroup(groupId);

        return ResponseEntity.ok(captions);
    }

    @GetMapping("/captions/{id}")
    public ResponseEntity<CaptionResponseDTO> getCaption(@PathVariable Long id) {
        return ResponseEntity.ok(captionService.getCaptionById(id));
    }

    @GetMapping("/group/{groupId}/paginated")
    public ResponseEntity<Page<CaptionResponseDTO>> getCaptionsByGroupPage(
            @PathVariable Long groupId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {

        return ResponseEntity.ok(
                captionService.getCaptionsByGroupPage(groupId, page, size));
    }
}
