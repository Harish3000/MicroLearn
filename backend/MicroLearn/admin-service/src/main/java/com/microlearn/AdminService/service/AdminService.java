package com.microlearn.AdminService.service;

import com.microlearn.AdminService.entity.Admin;
import com.microlearn.AdminService.entity.Course;
import com.microlearn.AdminService.repo.AdminRepo;
import com.microlearn.AdminService.repo.CourseRepo;
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
    private CourseRepo courseRepo;

    @Autowired
    private RestTemplate restTemplate;



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

    //new ones ---------------------------------------------------------------------------
    public Course createCourse(Course course) {
        return courseRepo.save(course);
    }

    public Course getCourseById(String id) {
        return courseRepo.findById(id).orElse(null);
    }

    public List<Course> getAllCourses() {
        return courseRepo.findAll();
    }


    public Course updateCourse(Course courseRequest) {
        Course existingCourse = courseRepo.findById(courseRequest.getCourseId()).orElse(null);
        existingCourse.setCourseName(courseRequest.getCourseName());
        existingCourse.setCourseDetails(courseRequest.getCourseDetails());
        existingCourse.setCourseImage(courseRequest.getCourseImage());
        existingCourse.setPrice(courseRequest.getPrice());
        existingCourse.setApproved(courseRequest.isApproved());
        existingCourse.setInstructorId(courseRequest.getInstructorId());
        existingCourse.setContent(courseRequest.getContent()); // new line
        return courseRepo.save(existingCourse);
    }

    public Course deleteCourse(String id) {
        Course existingCourse = courseRepo.findById(id).orElse(null);
        courseRepo.deleteById(id);
        return existingCourse;
    }

    public Course toggleApproval(String id) {
        Course existingCourse = courseRepo.findById(id).orElse(null);
        existingCourse.setApproved(!existingCourse.isApproved());
        return courseRepo.save(existingCourse);
    }
}