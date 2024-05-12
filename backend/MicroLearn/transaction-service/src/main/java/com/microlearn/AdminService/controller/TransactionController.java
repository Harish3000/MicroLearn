package com.microlearn.AdminService.controller;

import com.microlearn.AdminService.entity.EmailRequest;
import com.microlearn.AdminService.entity.Payment;
import com.microlearn.AdminService.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/transaction")
public class TransactionController {


     @Autowired
     private TransactionService transactionService;




//    @GetMapping("/courses")
//    public ResponseEntity<Object> getAllCourses() {
//        return transactionService.getAllCourses();
//    }

    @PostMapping("/payment")
    public Payment createPayment(@RequestBody Payment payment) {
        return transactionService.createPayment(payment);
    }

    @GetMapping("/payment/{id}")
    public Payment getPaymentById(@PathVariable String id) {
        return transactionService.getPaymentById(id);
    }

    @GetMapping("/payments")
    public List<Payment> getAllPayments() {
        return transactionService.getAllPayments();
    }

    @PutMapping("/payment")
    public Payment updatePayment(@RequestBody Payment payment) {
        return transactionService.updatePayment(payment);
    }

    @DeleteMapping("/payment/{id}")
    public Payment deletePayment(@PathVariable String id) {
        return transactionService.deletePayment(id);
    }

    @PostMapping("/sendEmail")
    public ResponseEntity<String> sendEmail(@RequestBody EmailRequest request) {
        transactionService.sendEmail(request);
        return ResponseEntity.ok("Email sent successfully");
    }


}
