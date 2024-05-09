package com.microlearn.AdminService.repo;

import com.microlearn.AdminService.entity.Enrollment;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface EnrollmentRepo extends MongoRepository<Enrollment, String> {
}
