package com.microlearn.AdminService.controller;


import com.microlearn.AdminService.entity.Learner;
import com.microlearn.AdminService.service.LearnerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/learner")
public class LearnerController {


     @Autowired
     private LearnerService learnerService;
    @GetMapping("/{id}")
   public Learner getLearnerById(@PathVariable String id){
        return  learnerService.getLearnerById(id);

    }

    @PostMapping("/insert")
    public Learner insertLearner(@RequestBody Learner learner){
        return  learnerService.insertLearner(learner);

    }
}
