package com.captionassistant.backend.dto.Response;

import lombok.Data;

@Data
public class UserProfileResponse {

    private Long userId;
    private String email;
    private String role;

}
