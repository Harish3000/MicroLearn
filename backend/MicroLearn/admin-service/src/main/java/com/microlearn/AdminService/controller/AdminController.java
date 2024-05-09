package com.microlearn.AdminService.controller;

import com.microlearn.AdminService.entity.Admin;
import com.microlearn.AdminService.entity.AppCourse;
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

    @GetMapping("/{id}")
    public Admin getAdminById(@PathVariable String id){
        return adminService.getAdminById(id);
    }

    @PostMapping("/insert")
    public Admin insertAdmin(@RequestBody Admin admin){
        return adminService.insertAdmin(admin);
    }

    @GetMapping("/courses")
    public ResponseEntity<Object> getAllCourses() {
        return adminService.getAllCourses();
    }

    @PostMapping("/appCourse")
    public AppCourse createAppCourse(@RequestBody AppCourse appCourse) {
        return adminService.createAppCourse(appCourse);
    }

    @GetMapping("/appCourse/{id}")
    public AppCourse getAppCourseById(@PathVariable String id) {
        return adminService.getAppCourseById(id);
    }

    @GetMapping("/appCourses")
    public List<AppCourse> getAllAppCourses() {
        return adminService.getAllAppCourses();
    }

    @PutMapping("/appCourse")
    public AppCourse updateAppCourse(@RequestBody AppCourse appCourse) {
        return adminService.updateAppCourse(appCourse);
    }

    @DeleteMapping("/appCourse/{id}")
    public AppCourse deleteAppCourse(@PathVariable String id) {
        return adminService.deleteAppCourse(id);
    }
}