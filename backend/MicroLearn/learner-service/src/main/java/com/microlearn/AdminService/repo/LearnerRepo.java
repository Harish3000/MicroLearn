package com.microlearn.AdminService.repo;

import com.microlearn.AdminService.entity.Learner;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface LearnerRepo extends MongoRepository<Learner, String> {
}
