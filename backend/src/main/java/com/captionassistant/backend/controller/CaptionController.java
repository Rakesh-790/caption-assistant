package com.captionassistant.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
}
