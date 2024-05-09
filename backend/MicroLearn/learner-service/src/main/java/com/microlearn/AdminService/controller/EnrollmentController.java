package com.microlearn.AdminService.controller;

import com.microlearn.AdminService.entity.Enrollment;
import com.microlearn.AdminService.service.EnrollmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/enrollments")
public class EnrollmentController {

    @Autowired
    private EnrollmentService enrollmentService;

    // Endpoint to get an enrollment by its ID
    @GetMapping("read-one/{id}")
    public ResponseEntity<Enrollment> getEnrollById(@PathVariable String id) {
        Enrollment enrollment = enrollmentService.getEnrollById(id);
        if (enrollment == null) {
            return ResponseEntity.notFound().build(); // HTTP 404 if enrollment not found
        }
        return ResponseEntity.ok(enrollment); // HTTP 200 with the enrollment data
    }

    // Endpoint to insert a new enrollment
    @PostMapping("/create")
    public ResponseEntity<Enrollment> insertEnroll(@RequestBody Enrollment enrollment) {
        Enrollment newEnrollment = enrollmentService.insertEnroll(enrollment);
        return ResponseEntity.ok(newEnrollment); // HTTP 200 with the inserted enrollment
    }
}
