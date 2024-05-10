package com.microlearn.AdminService.service;

import com.microlearn.AdminService.entity.Learner;
import com.microlearn.AdminService.repo.LearnerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Service
public class LearnerService {

    private final LearnerRepo learnerRepository;

    @Autowired
    public LearnerService(LearnerRepo learnerRepository) {
        this.learnerRepository = learnerRepository;
    }

    public Learner createLearner(Learner learner) {
        System.out.println("Saving data: " + learner);
        return learnerRepository.save(learner);
    }

    public List<Learner> getAllLearners() {
        return learnerRepository.findAll();
    }

    public Learner getLearnerById(String enrollmentId) {
        return learnerRepository.findById(enrollmentId).orElse(null);
    }

}
