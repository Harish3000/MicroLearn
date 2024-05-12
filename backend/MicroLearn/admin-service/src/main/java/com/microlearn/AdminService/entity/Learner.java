package com.microlearn.AdminService.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "Learner")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Learner {
    @Id
    private String learnerId;
    private String learnerName;
    private String email;
    private List<String> courseIdList;
}
