package com.microlearn.AdminService.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "Payment")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Payment {

    @Id
    private String paymentID;
    private String courseId;
    private String type;
    private String userId;
    private String learnerName;
    private String email;
    private String amount;
    private Date date;

}