package com.microlearn.AdminService.repo;

import com.microlearn.AdminService.entity.Payment;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PaymentRepo extends MongoRepository<Payment, String> {
}