package com.microlearn.AdminService.service;

import com.microlearn.AdminService.entity.Transaction;
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



    public Transaction getTransactionById(String id){
        return transactionRepo.findById(id).get();
    }

    public Transaction insertTransaction(Transaction transaction){

        return  transactionRepo.save(transaction);

    }


    public ResponseEntity<Object> getAllCourses() {
        ResponseEntity<List> response = restTemplate.getForEntity("http://instructor-service:9092/instructor/courses", List.class);
        List<Object> courses = response.getBody();

        List<Object> courseDetails = new ArrayList<>();
        for(Object course : courses){
            Map<String, Object> courseMap = (Map<String, Object>) course;
            courseDetails.add(courseMap);
        }

        Map<String, Object> responseMap = new LinkedHashMap<>();
        responseMap.put("courses", courseDetails);

        return ResponseEntity.ok().body(responseMap);
    }

}
