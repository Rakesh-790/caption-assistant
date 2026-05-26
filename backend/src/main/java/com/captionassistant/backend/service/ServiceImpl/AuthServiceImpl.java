package com.captionassistant.backend.service.ServiceImpl;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.captionassistant.backend.constants.Role;
import com.captionassistant.backend.dto.Request.AuthRequestDTO;
import com.captionassistant.backend.dto.Request.ForgetPasswordRequestDTO;
import com.captionassistant.backend.dto.Request.ResetPasswordRequestDTO;
import com.captionassistant.backend.dto.Request.UserRequestDTO;
import com.captionassistant.backend.dto.Response.AuthResponseDTO;
import com.captionassistant.backend.model.UserEntity;
import com.captionassistant.backend.repository.UserRepository;
import com.captionassistant.backend.security.jwt.JwtUtils;
import com.captionassistant.backend.service.IService.IAuthService;
import com.captionassistant.backend.service.IService.IEmailService;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements IAuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final IEmailService emailService;

    @Override
    public void signup(UserRequestDTO request) {

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        UserEntity user = new UserEntity();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.USER); 
        user.setCreatedAt(LocalDateTime.now());

        userRepository.save(user);
    }   

    @Override
    public AuthResponseDTO login(AuthRequestDTO request, HttpServletResponse response) {

        UserEntity user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        String accessToken = jwtUtils.generateAccessToken(user, user.getRole().name());
        String refreshToken = jwtUtils.generateRefreshToken(user);

        jwtUtils.addAccessTokenCookie(response, accessToken);
        jwtUtils.addRefreshTokenCookie(response, refreshToken);

        return new AuthResponseDTO(
                accessToken,
                refreshToken,
                user.getEmail(),
                user.getRole().name() 
        );
    }

    @Override
    public void forgetPassword(ForgetPasswordRequestDTO passwordRequestDTO) {
        UserEntity entity = userRepository.findByEmail(passwordRequestDTO.getEmail()).
                        orElseThrow(() -> new RuntimeException("User Not found"));

        String resetToken = UUID.randomUUID().toString();

        entity.setResetToken(resetToken);

        entity.setResetTokenExpiry(LocalDateTime.now().plusMinutes(15));

        userRepository.save(entity);

        String restLink = "http://localhost:5173/reset-password?token=" + resetToken;

        emailService.sendPasswordRestMail(entity.getEmail(), restLink);
        
    }

    @Override
    public void resetPassword(ResetPasswordRequestDTO resetPasswordRequestDTO) {
        UserEntity entity = userRepository.findByResetToken(resetPasswordRequestDTO.getToken())
                                .orElseThrow(() -> new RuntimeException("Invalid Token"));

        if(entity.getResetTokenExpiry().isBefore(LocalDateTime.now())){
            throw new RuntimeException("token has been expaired");
        }

        entity.setPassword(passwordEncoder.encode(resetPasswordRequestDTO.getNewPassword()));

        entity.setResetToken(null);
        entity.setResetTokenExpiry(null);

        userRepository.save(entity);
    }
}

