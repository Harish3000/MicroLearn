package com.microlearn.AdminService.repo;

import com.microlearn.AdminService.entity.Learner;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface LearnerRepo extends MongoRepository<Learner, String> {
}
