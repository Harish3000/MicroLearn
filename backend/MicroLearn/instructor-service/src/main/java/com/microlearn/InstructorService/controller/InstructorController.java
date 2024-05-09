package com.microlearn.InstructorService.controller;

import com.microlearn.InstructorService.entity.Course;
import com.microlearn.InstructorService.entity.Instructor;
import com.microlearn.InstructorService.service.InstructorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/instructor")
public class InstructorController {

    @Autowired
    private InstructorService instructorService;

    @PostMapping("/insert")
    public Instructor insertLib(@RequestBody Instructor instructor){
        return instructorService.insertInstructor(instructor);
    }

    @PostMapping("/course/create")
    public Course createCourse(@RequestBody Course course){
        return instructorService.createCourse(course);
    }


    @GetMapping("/courses")
    public List<Course> getAllCourses(){
        return instructorService.getAllCourses();
    }
}