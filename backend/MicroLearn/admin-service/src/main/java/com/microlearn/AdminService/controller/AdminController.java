package com.microlearn.AdminService.controller;

import com.microlearn.AdminService.entity.Admin;
import com.microlearn.AdminService.entity.Course;
import com.microlearn.AdminService.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

//    @GetMapping("/courses")
//    public ResponseEntity<Object> getAllCourses() {
//        return adminService.getAllCourses();
//    }
//

//new ones---------------------------------------------------------

    @PostMapping("/course")
    public Course createCourse(@RequestBody Course course) {
        return adminService.createCourse(course);
    }

    @GetMapping("/course/{id}")
    public Course getCourseById(@PathVariable String id) {
        return adminService.getCourseById(id);
    }

    @GetMapping("/courses")
    public List<Course> getAllCourses() {
        return adminService.getAllCourses();
    }

    @PutMapping("/course")
    public Course updateCourse(@RequestBody Course course) {
        return adminService.updateCourse(course);
    }

    @DeleteMapping("/course/{id}")
    public Course deleteCourse(@PathVariable String id) {
        return adminService.deleteCourse(id);
    }

    @PutMapping("/course/toggleApproval/{id}")
    public Course toggleApproval(@PathVariable String id) {
        return adminService.toggleApproval(id);
    }
}