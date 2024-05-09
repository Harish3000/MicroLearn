package com.microlearn.InstructorService.repo;

import com.microlearn.InstructorService.entity.Course;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CourseRepo extends MongoRepository<Course, String> {
}