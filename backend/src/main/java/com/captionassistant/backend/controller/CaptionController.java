package com.captionassistant.backend.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
// import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.captionassistant.backend.dto.Request.CaptionCreateRequestDTO;
import com.captionassistant.backend.dto.Response.CaptionResponseDTO;
import com.captionassistant.backend.service.IService.ICaptionService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
// @RequestMapping("/api")
public class CaptionController {
    private final ICaptionService captionService;

    @PostMapping("/captions")
    public ResponseEntity<CaptionResponseDTO> createCaption(@RequestBody CaptionCreateRequestDTO request) {
        return ResponseEntity.ok(captionService.createCaption(request));
    }

    @GetMapping("/group/{groupId}")
    public ResponseEntity<List<CaptionResponseDTO>> getCaptionsByGroup(
            @PathVariable Long groupId) {

        List<CaptionResponseDTO> captions = captionService.getCaptionsByGroup(groupId);

        return ResponseEntity.ok(captions);
    }

    @GetMapping("/group/{groupId}/paginated")
    public ResponseEntity<Page<CaptionResponseDTO>> getCaptionsByGroup(
            @PathVariable Long groupId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {

        return ResponseEntity.ok(
                captionService.getCaptionsByGroupPage(groupId, page, size));
    }
}
