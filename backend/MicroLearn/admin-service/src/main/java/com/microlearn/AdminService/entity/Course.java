package com.microlearn.AdminService.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Courses")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Course {

    @Id
    private String courseId;
    private String courseName;
    private String courseDetails;
    private String courseImage;
    private String price;
    private boolean Approved;
    private String instructorId;

}