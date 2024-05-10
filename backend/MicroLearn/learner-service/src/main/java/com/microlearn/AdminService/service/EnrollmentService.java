package com.microlearn.AdminService.service;

import com.microlearn.AdminService.entity.Enrollment;
import com.microlearn.AdminService.repo.EnrollmentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EnrollmentService {

    private final EnrollmentRepo learnerRepository;

    @Autowired
    public EnrollmentService(EnrollmentRepo learnerRepository) {
        this.learnerRepository = learnerRepository;
    }

    public Enrollment createLearner(Enrollment learner) {
        System.out.println("Saving data: " + learner);
        return learnerRepository.save(learner);
    }

    public List<Enrollment> getAllLearners() {
        return learnerRepository.findAll();
    }

    public Enrollment getLearnerById(String enrollmentId) {
        return learnerRepository.findById(enrollmentId).orElse(null);
    }

    public boolean deleteLearnerById(String enrollmentId) {
        if (learnerRepository.existsById(enrollmentId)) {
            learnerRepository.deleteById(enrollmentId);
            return true;
        } else {
            return false;
        }
    }

}
