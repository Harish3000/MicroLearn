package com.microlearn.AdminService.controller;


import com.microlearn.AdminService.entity.Transaction;
import com.microlearn.AdminService.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/transaction")
public class TransactionController {


     @Autowired
     private TransactionService transactionService;
    @GetMapping("/{id}")
   public Transaction getTransactionById(@PathVariable String id){
        return  transactionService.getTransactionById(id);

    }

    @PostMapping("/insert")
    public Transaction insertTransaction(@RequestBody Transaction transaction){
        return  transactionService.insertTransaction(transaction);

    }

    @GetMapping("/courses")
    public ResponseEntity<Object> getAllCourses() {
        return transactionService.getAllCourses();
    }
}
