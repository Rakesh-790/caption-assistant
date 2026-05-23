package com.captionassistant.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.captionassistant.backend.dto.Request.AuthRequestDTO;
import com.captionassistant.backend.dto.Request.UserRequestDTO;
import com.captionassistant.backend.dto.Response.AuthResponseDTO;
import com.captionassistant.backend.service.IService.IAuthService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
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
    public ResponseEntity<AuthResponseDTO> login(@RequestBody AuthRequestDTO request, HttpServletResponse response) {
        return ResponseEntity.ok(authService.login(request, response));
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletResponse response) {

        Cookie cookie = new Cookie("token", null);

        cookie.setHttpOnly(true);
        cookie.setSecure(false); // true in production HTTPS
        cookie.setPath("/");
        cookie.setMaxAge(0);

        response.addCookie(cookie);

        return ResponseEntity.ok("Logged out successfully");
    }
}
