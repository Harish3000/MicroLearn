package com.microlearn.AdminService.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "AppCourse")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AppCourse {

    @Id
    private String id;
    private String courseDetails;
    private String instructorId;

}