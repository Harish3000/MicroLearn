package com.microlearn.AdminService.repo;

import com.microlearn.AdminService.entity.AppCourse;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AppCourseRepo extends MongoRepository<AppCourse, String> {
}