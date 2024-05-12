package com.microlearn.InstructorService.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
@Data
@AllArgsConstructor
@NoArgsConstructor

public class Content {

    @Id
    private String contentId;
    private String contentTitle;
    private String contentDescription;
    private String contentUrl;

}