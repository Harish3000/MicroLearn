package com.microlearn.AdminService.service;

import com.microlearn.AdminService.entity.Learner;
import com.microlearn.AdminService.repo.LearnerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class LearnerService
{

     @Autowired
    private LearnerRepo learnerRepo;

    @Autowired
    private RestTemplate restTemplate;



    public Learner getLearnerById(String id){
        return learnerRepo.findById(id).get();
    }

    public Learner insertLearner(Learner learner){

        return  learnerRepo.save(learner);

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
