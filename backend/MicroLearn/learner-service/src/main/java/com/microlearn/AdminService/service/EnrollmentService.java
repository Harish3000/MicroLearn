package com.microlearn.AdminService.service;

import com.microlearn.AdminService.entity.Enrollment;
import com.microlearn.AdminService.entity.Learner;
import com.microlearn.AdminService.repo.EnrollmentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EnrollmentService {
    @Autowired
    private EnrollmentRepo enrollmentRepo;

    public Enrollment insertEnroll(Enrollment enrollment) {
        return enrollmentRepo.save(enrollment);
    }

    public Enrollment getEnrollById(String id) {
        return enrollmentRepo.findById(id).get();
    }




}
