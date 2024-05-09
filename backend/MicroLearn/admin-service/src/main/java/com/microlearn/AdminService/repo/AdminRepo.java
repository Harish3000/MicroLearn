package com.microlearn.AdminService.repo;

import com.microlearn.AdminService.entity.Admin;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AdminRepo extends MongoRepository<Admin, String> {
}