package com.microlearn.AdminService.controller;

import com.microlearn.AdminService.entity.Learner;
import com.microlearn.AdminService.service.LearnerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
}
