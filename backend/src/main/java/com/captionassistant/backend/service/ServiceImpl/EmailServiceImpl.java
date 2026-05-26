package com.captionassistant.backend.service.ServiceImpl;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.captionassistant.backend.service.IService.IEmailService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements IEmailService{
    
    private final JavaMailSender mailSender;

    @Override
    public void sendPasswordRestMail(String to, String restLink) {
        
        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(to);

        message.setSubject("password rest request");

        message.setText("Click the link to rest your password: \n\n" + restLink);

        mailSender.send(message);
        
    }
}
