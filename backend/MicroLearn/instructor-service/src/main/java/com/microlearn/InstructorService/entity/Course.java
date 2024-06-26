package com.microlearn.InstructorService.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

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
    private Boolean Approved;
    private String instructorId;
    private Content content;

}