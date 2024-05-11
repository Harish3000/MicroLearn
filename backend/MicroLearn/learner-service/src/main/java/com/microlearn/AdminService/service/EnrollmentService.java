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

    private final EnrollmentRepo enrollmentRepo;
    private final LearnerRepo learnerRepo;

//    Enrollment CRUD Services

    @Autowired
    public EnrollmentService(EnrollmentRepo learnerRepository, LearnerRepo learnerRepo2) {
        this.enrollmentRepo = learnerRepository;
        this.learnerRepo = learnerRepo2;
    }


    public Enrollment enroll(Enrollment learner) {
        System.out.println("Saving data: " + learner);
        return enrollmentRepo.save(learner);
    }

    public List<Enrollment> getAllEnrolled() {
        return enrollmentRepo.findAll();
    }


    public Enrollment getEnrollById(String enrollmentId) {
        return enrollmentRepo.findById(enrollmentId).orElse(null);
    }

    public Enrollment updateEnrollment(String enrollmentId, Enrollment updatedEnrollment) {
        Optional<Enrollment> existingEnrollment = enrollmentRepo.findById(enrollmentId);
        if (existingEnrollment.isPresent()) {
            Enrollment enrollment = existingEnrollment.get();
            enrollment.setLearnerId(updatedEnrollment.getLearnerId());
            enrollment.setCourseId(updatedEnrollment.getCourseId());
            enrollment.setPaymentId(updatedEnrollment.getPaymentId());
            // Add any other fields that need updating
            return enrollmentRepo.save(enrollment);
        } else {
            return null;
        }
    }

    public boolean unEnroll(String enrollmentId) {
        if (enrollmentRepo.existsById(enrollmentId)) {
            enrollmentRepo.deleteById(enrollmentId);
            return true;
        } else {
            return false;
        }
    }

//    Learner CRUD Services
    public Learner addLerner(Learner learner) {
    return learnerRepo.save(learner);
}

    public Learner getLearnerById(String learnerId) {
        return learnerRepo.findById(learnerId).orElse(null);
    }

    public boolean deleteLearner(String learnerId) {
        if (enrollmentRepo.existsById(learnerId)) {
            enrollmentRepo.deleteById(learnerId);
            return true;
        } else {
            return false;
        }
    }


}
