package com.microlearn.AdminService.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class GenericEmailService {

    @Autowired
    private JavaMailSender emailSender;

    public void sendEmail(String receiver, String title, String message, Map<String, String> details) {
        SimpleMailMessage email = new SimpleMailMessage();
        email.setTo(receiver);
        email.setSubject(title);

        StringBuilder detailsString = new StringBuilder("\n\nDetails\n");
        for (Map.Entry<String, String> entry : details.entrySet()) {
            detailsString.append("-").append(entry.getKey()).append(" : ").append(entry.getValue()).append("\n");
        }

        email.setText(message + detailsString.toString() + "\nThank you !\n\nMicroLearn\nEmail Service");
        emailSender.send(email);
    }
}