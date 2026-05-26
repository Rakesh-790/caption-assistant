package com.captionassistant.backend.service.IService;

public interface IEmailService {
    void sendPasswordRestMail(String to, String restLink);
}
