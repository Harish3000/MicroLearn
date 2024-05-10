package com.microlearn.AdminService.controller;

import com.microlearn.AdminService.entity.Enrollment;
import com.microlearn.AdminService.entity.Learner;
import com.microlearn.AdminService.service.EnrollmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/learner")
public class EnrollmentController {

    private final EnrollmentService learnerService;

    @Autowired
    public EnrollmentController(EnrollmentService learnerService) {
        this.learnerService = learnerService;
    }

    @PostMapping("/create")
    public ResponseEntity<Enrollment> createLearner(@RequestBody Enrollment learner) {
        System.out.println("Received data: " + learner);
        Enrollment createdLearner = learnerService.createLearner(learner);
        return ResponseEntity.ok(createdLearner);
    }

    @PostMapping("/create-learner")
    public ResponseEntity<Learner> addLearner(@RequestBody Learner learner) {
        Learner newLearner = learnerService.addLerner(learner);
        return ResponseEntity.ok(newLearner);
    }

    @GetMapping("/get-all")
    public ResponseEntity<List<Enrollment>> getAllLearners() {
        List<Enrollment> learners = learnerService.getAllLearners();
        return ResponseEntity.ok(learners);
    }

    @GetMapping("/get-one/{id}")
    public ResponseEntity<Enrollment> getLearnerById(@PathVariable("id") String enrollmentId) {
        Enrollment learner = learnerService.getLearnerById(enrollmentId);
        if (learner != null) {
            return ResponseEntity.ok(learner);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<Void> deleteLearner(@PathVariable("id") String enrollmentId) {
        boolean deleted = learnerService.deleteLearnerById(enrollmentId);
        if (deleted) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

}
