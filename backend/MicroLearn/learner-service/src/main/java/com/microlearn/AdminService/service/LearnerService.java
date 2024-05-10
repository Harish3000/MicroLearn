package com.microlearn.AdminService.service;

import com.microlearn.AdminService.entity.Learner;
import com.microlearn.AdminService.repo.LearnerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class LearnerService
{

     @Autowired
    private LearnerRepo learnerRepo;

    @Autowired
    private RestTemplate restTemplate;



    public Learner getLearnerById(String id){
        return learnerRepo.findById(id).get();
    }

    public Learner insertLearner(Learner learner){

        return  learnerRepo.save(learner);

    }

}
