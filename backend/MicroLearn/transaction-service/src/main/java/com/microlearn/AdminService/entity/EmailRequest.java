package com.microlearn.AdminService.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmailRequest {
    private String receiver;
    private String title;
    private String message;
    private Object details;
}