package com.microlearn.AdminService.service;

import com.microlearn.AdminService.entity.Payment;
import com.microlearn.AdminService.entity.Transaction;
import com.microlearn.AdminService.repo.PaymentRepo;
import com.microlearn.AdminService.repo.TransactionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class TransactionService
{

     @Autowired
    private TransactionRepo transactionRepo;

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private PaymentRepo paymentRepo;



//    public ResponseEntity<Object> getAllCourses() {
//        ResponseEntity<List> response = restTemplate.getForEntity("http://instructor-service:9092/instructor/courses", List.class);
//        List<Object> courses = response.getBody();
//
//        List<Object> courseDetails = new ArrayList<>();
//        for(Object course : courses){
//            Map<String, Object> courseMap = (Map<String, Object>) course;
//            courseDetails.add(courseMap);
//        }
//
//        Map<String, Object> responseMap = new LinkedHashMap<>();
//        responseMap.put("courses", courseDetails);
//
//        return ResponseEntity.ok().body(responseMap);
//    }

    //---------------new ones--------------------------------


    public Payment createPayment(Payment payment) {
        return paymentRepo.save(payment);
    }

    public Payment getPaymentById(String id) {
        return paymentRepo.findById(id).orElse(null);
    }

    public List<Payment> getAllPayments() {
        return paymentRepo.findAll();
    }

    public Payment updatePayment(Payment paymentRequest) {
        Payment existingPayment = paymentRepo.findById(paymentRequest.getPaymentID()).orElse(null);
        existingPayment.setCourseId(paymentRequest.getCourseId());
        existingPayment.setType(paymentRequest.getType());
        existingPayment.setUserId(paymentRequest.getUserId());
        existingPayment.setLearnerName(paymentRequest.getLearnerName());
        existingPayment.setEmail(paymentRequest.getEmail());
        existingPayment.setAmount(paymentRequest.getAmount());
        existingPayment.setDate(paymentRequest.getDate());

        return paymentRepo.save(existingPayment);
    }

    public Payment deletePayment(String id) {
        Payment existingPayment = paymentRepo.findById(id).orElse(null);
        paymentRepo.deleteById(id);
        return existingPayment;
    }


}
