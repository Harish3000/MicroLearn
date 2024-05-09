package com.microlearn.InstructorService.service;

import com.microlearn.InstructorService.entity.Course;
import com.microlearn.InstructorService.entity.Instructor;
import com.microlearn.InstructorService.repo.CourseRepo;
import com.microlearn.InstructorService.repo.InstructorRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class InstructorService
{
    @Autowired
    private InstructorRepo instructorRepo;

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private CourseRepo courseRepo;

    public Instructor insertInstructor(Instructor instructor){
        return instructorRepo.save(instructor);
    }


    public Course createCourse(Course course){
        return courseRepo.save(course);
    }

    public List<Course> getAllCourses(){
        return courseRepo.findAll();
    }
}