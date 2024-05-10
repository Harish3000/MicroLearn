package com.microlearn.AdminService.repo;

import com.microlearn.AdminService.entity.Course;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CourseRepo extends MongoRepository<Course, String> {
}