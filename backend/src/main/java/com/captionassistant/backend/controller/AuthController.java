package com.captionassistant.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.captionassistant.backend.dto.AuthRequestDTO;
import com.captionassistant.backend.dto.AuthResponseDTO;
import com.captionassistant.backend.dto.UserRequestDTO;
import com.captionassistant.backend.service.IService.IAuthService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final IAuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody UserRequestDTO request) {
        authService.signup(request);
        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody AuthRequestDTO request) {
        return ResponseEntity.ok(authService.login(request));
    }
}
