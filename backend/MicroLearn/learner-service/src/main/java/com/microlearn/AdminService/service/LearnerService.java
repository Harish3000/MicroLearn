package com.microlearn.AdminService.service;

import com.microlearn.AdminService.entity.Learner;
import com.microlearn.AdminService.repo.LearnerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
