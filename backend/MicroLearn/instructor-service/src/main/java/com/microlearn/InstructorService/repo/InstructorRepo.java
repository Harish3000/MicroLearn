package com.microlearn.InstructorService.repo;

import com.microlearn.InstructorService.entity.Instructor;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface InstructorRepo extends MongoRepository<Instructor, String> {
}