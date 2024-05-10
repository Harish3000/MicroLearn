package com.microlearn.AdminService.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Enrollment")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Learner {

    @Id
    private String enrollmentId;
    private String learnerId;
    private String courseId;
    private String paymentId;

}