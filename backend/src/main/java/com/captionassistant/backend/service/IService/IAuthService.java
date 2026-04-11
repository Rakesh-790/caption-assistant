package com.captionassistant.backend.service.IService;


import com.captionassistant.backend.dto.AuthRequestDTO;
import com.captionassistant.backend.dto.AuthResponseDTO;
import com.captionassistant.backend.dto.UserRequestDTO;

public interface IAuthService {
    void signup(UserRequestDTO request);
    AuthResponseDTO login(AuthRequestDTO request);
}
