package com.microlearn.AdminService.service;

import com.microlearn.AdminService.entity.Admin;
import com.microlearn.AdminService.entity.AppCourse;
import com.microlearn.AdminService.repo.AdminRepo;
import com.microlearn.AdminService.repo.AppCourseRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class AdminService {

    @Autowired
    private AdminRepo adminRepo;

    @Autowired
    private AppCourseRepo appCourseRepo;

    @Autowired
    private RestTemplate restTemplate;

    public Admin getAdminById(String id){
        return adminRepo.findById(id).get();
    }

    public Admin insertAdmin(Admin admin){
        return adminRepo.save(admin);
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

    public AppCourse createAppCourse(AppCourse appCourse) {
        return appCourseRepo.save(appCourse);
    }

    public AppCourse getAppCourseById(String id) {
        return appCourseRepo.findById(id).orElse(null);
    }

    public List<AppCourse> getAllAppCourses() {
        return appCourseRepo.findAll();
    }

    public AppCourse updateAppCourse(AppCourse appCourseRequest) {
        // Get the existing AppCourse from DB
        AppCourse existingAppCourse = appCourseRepo.findById(appCourseRequest.getId()).orElse(null);

        // Update the fields of the existing AppCourse
        existingAppCourse.setCourseDetails(appCourseRequest.getCourseDetails());
        existingAppCourse.setInstructorId(appCourseRequest.getInstructorId());

        // Save the updated AppCourse back to the database
        return appCourseRepo.save(existingAppCourse);
    }

    public AppCourse deleteAppCourse(String id) {
        // Get the existing AppCourse from DB
        AppCourse existingAppCourse = appCourseRepo.findById(id).orElse(null);

        // Delete the AppCourse from the database
        appCourseRepo.deleteById(id);

        // Return the deleted AppCourse
        return existingAppCourse;
    }
}