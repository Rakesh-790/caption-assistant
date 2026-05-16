package com.captionassistant.backend.dto.Request;

import lombok.Data;

@Data
public class UserRequestDTO {

    private String username;

    private String password;

    private String email;
}
