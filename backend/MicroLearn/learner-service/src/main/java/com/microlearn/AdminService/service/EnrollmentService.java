package com.microlearn.AdminService.service;

import com.microlearn.AdminService.entity.Enrollment;
import com.microlearn.AdminService.entity.Learner;
import com.microlearn.AdminService.repo.EnrollmentRepo;
import com.microlearn.AdminService.repo.LearnerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EnrollmentService {

    private final EnrollmentRepo learnerRepository;
    private final LearnerRepo learnerRepo2;

    @Autowired
    public EnrollmentService(EnrollmentRepo learnerRepository, LearnerRepo learnerRepo2) {
        this.learnerRepository = learnerRepository;
        this.learnerRepo2 = learnerRepo2;
    }


    public Enrollment createLearner(Enrollment learner) {
        System.out.println("Saving data: " + learner);
        return learnerRepository.save(learner);
    }

    public Learner addLerner(Learner learner) {
        return learnerRepo2.save(learner);
    }

    public List<Enrollment> getAllLearners() {
        return learnerRepository.findAll();
    }

    public Enrollment getLearnerById(String enrollmentId) {
        return learnerRepository.findById(enrollmentId).orElse(null);
    }

    public Enrollment updateEnrollment(String enrollmentId, Enrollment updatedEnrollment) {
        Optional<Enrollment> existingEnrollment = learnerRepository.findById(enrollmentId);
        if (existingEnrollment.isPresent()) {
            Enrollment enrollment = existingEnrollment.get();
            enrollment.setLearnerId(updatedEnrollment.getLearnerId());
            enrollment.setCourseId(updatedEnrollment.getCourseId());
            enrollment.setPaymentId(updatedEnrollment.getPaymentId());
            // Add any other fields that need updating
            return learnerRepository.save(enrollment);
        } else {
            return null;
        }
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
