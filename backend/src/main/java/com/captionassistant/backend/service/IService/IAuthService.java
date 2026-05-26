package com.captionassistant.backend.service.IService;


import com.captionassistant.backend.dto.Request.AuthRequestDTO;
import com.captionassistant.backend.dto.Request.ForgetPasswordRequestDTO;
import com.captionassistant.backend.dto.Request.ResetPasswordRequestDTO;
import com.captionassistant.backend.dto.Request.UserRequestDTO;
import com.captionassistant.backend.dto.Response.AuthResponseDTO;

import jakarta.servlet.http.HttpServletResponse;

public interface IAuthService {
    void signup(UserRequestDTO request);

    AuthResponseDTO login(AuthRequestDTO request, HttpServletResponse response);

    void forgetPassword(ForgetPasswordRequestDTO passwordRequestDTO);

    void resetPassword(ResetPasswordRequestDTO resetPasswordRequestDTO);
}
