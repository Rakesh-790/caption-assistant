package com.captionassistant.backend.service.IService;


import com.captionassistant.backend.dto.Request.AuthRequestDTO;
import com.captionassistant.backend.dto.Request.UserRequestDTO;
import com.captionassistant.backend.dto.Response.AuthResponseDTO;

public interface IAuthService {
    void signup(UserRequestDTO request);
    AuthResponseDTO login(AuthRequestDTO request);
}
