package com.microlearn.InstructorService.controller;

import com.microlearn.InstructorService.entity.Course;
import com.microlearn.InstructorService.entity.Instructor;
import com.microlearn.InstructorService.service.InstructorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
    public ResponseEntity<Course> createCourse(@RequestBody Course course) {
        Course createdCourse = instructorService.createCourse(course);
        return new ResponseEntity<>(createdCourse, HttpStatus.CREATED);
    }

    @GetMapping("/courses")
    public List<Course> getAllCourses(){
        return instructorService.getAllCourses();
    }


    // Delete a Course by ID
    @DeleteMapping("/course/{courseId}")
    public ResponseEntity<Void> deleteCourse(@PathVariable String  courseId) {
        instructorService.deleteCourseById(courseId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // Update a Course by ID
    @PutMapping("/course/update/{courseId}")
    public ResponseEntity<Course> updateCourse(@PathVariable String courseId, @RequestBody Course course) {
        course.setCourseId(courseId); // Set the ID to be updated
        Course updatedCourse = instructorService.updateCourse(course);
        return new ResponseEntity<>(updatedCourse, HttpStatus.OK);
    }
}
