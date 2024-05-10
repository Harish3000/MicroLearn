package com.microlearn.AdminService.controller;

import com.microlearn.AdminService.entity.Learner;
import com.microlearn.AdminService.service.LearnerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/learner")
public class LearnerController {

    private final LearnerService learnerService;

    @Autowired
    public LearnerController(LearnerService learnerService) {
        this.learnerService = learnerService;
    }

    @PostMapping("/create")
    public ResponseEntity<Learner> createLearner(@RequestBody Learner learner) {
        System.out.println("Received data: " + learner);
        Learner createdLearner = learnerService.createLearner(learner);
        return ResponseEntity.ok(createdLearner);
    }

    @GetMapping("/get-all")
    public ResponseEntity<List<Learner>> getAllLearners() {
        List<Learner> learners = learnerService.getAllLearners();
        return ResponseEntity.ok(learners);
    }

    @GetMapping("/get-one/{id}")
    public ResponseEntity<Learner> getLearnerById(@PathVariable("id") String enrollmentId) {
        Learner learner = learnerService.getLearnerById(enrollmentId);
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
