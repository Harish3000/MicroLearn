package com.microlearn.InstructorService.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "Instructors")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Instructor {

    @Id
    private String instructorId;
    private String instructorName;
    private String email;
    private String courseId;

}