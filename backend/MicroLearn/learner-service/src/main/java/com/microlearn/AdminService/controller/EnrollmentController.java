package com.microlearn.AdminService.controller;

import com.microlearn.AdminService.entity.Enrollment;
import com.microlearn.AdminService.entity.Learner;
import com.microlearn.AdminService.service.EnrollmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/learner")
public class EnrollmentController {

    private final EnrollmentService enrollmentService;

    @Autowired
    public EnrollmentController(EnrollmentService learnerService) {
        this.enrollmentService = learnerService;
    }

//    Enrollment Controllers
    @PostMapping("/enroll")
    public ResponseEntity<Enrollment> enroll(@RequestBody Enrollment learner) {
        System.out.println("Received data: " + learner);
        Enrollment createdLearner = enrollmentService.enroll(learner);
        return ResponseEntity.ok(createdLearner);
    }

    @GetMapping("/get-all-enrolled")
    public ResponseEntity<List<Enrollment>> getAllEnrolled() {
        List<Enrollment> learners = enrollmentService.getAllEnrolled();
        return ResponseEntity.ok(learners);
    }

    @GetMapping("/get-one-enrolled/{id}")
    public ResponseEntity<Enrollment> getEnrollById(@PathVariable("id") String enrollmentId) {
        Enrollment learner = enrollmentService.getEnrollById(enrollmentId);
        if (learner != null) {
            return ResponseEntity.ok(learner);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PutMapping("/update-enrolled/{id}")
    public ResponseEntity<Enrollment> updateEnrollment(
            @PathVariable("id") String enrollmentId,
            @RequestBody Enrollment updatedEnrollment
    ) {
        Enrollment updated = enrollmentService.updateEnrollment(enrollmentId, updatedEnrollment);
        if (updated != null) {
            return ResponseEntity.ok(updated);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("un-enroll/{id}")
    public ResponseEntity<Void> unEnroll(@PathVariable("id") String enrollmentId) {
        boolean deleted = enrollmentService.unEnroll(enrollmentId);
        if (deleted) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

//    Learner Controllers
    @PostMapping("/create-learner")
    public ResponseEntity<Learner> addLearner(@RequestBody Learner learner) {
        Learner newLearner = enrollmentService.addLerner(learner);
        return ResponseEntity.ok(newLearner);
    }





}
