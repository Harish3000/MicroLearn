package com.microlearn.AdminService.repo;

import com.microlearn.AdminService.entity.Transaction;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TransactionRepo extends MongoRepository<Transaction, String> {
}