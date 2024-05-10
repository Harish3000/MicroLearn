package com.microlearn.InstructorService.service;

import com.microlearn.InstructorService.entity.Course;
import com.microlearn.InstructorService.entity.Instructor;
import com.microlearn.InstructorService.repo.CourseRepo;
import com.microlearn.InstructorService.repo.InstructorRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class InstructorService
{
    @Autowired
    private InstructorRepo instructorRepo;

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private CourseRepo courseRepo;

    public Instructor insertInstructor(Instructor instructor){
        return instructorRepo.save(instructor);
    }


//    public Course createCourse(Course course){
//        return courseRepo.save(course);
//    }


    public Course createCourse(Course course) {
        Set<String> existingCourseIds = new HashSet<>();
        for (Course existingCourse : courseRepo.findAll()) {
            existingCourseIds.add(existingCourse.getCourseId());
        }
        if (existingCourseIds.contains(course.getCourseId())) {
            throw new IllegalArgumentException("Course ID already exists " + course.getCourseId());
        }

        return courseRepo.save(course);
    }

    public List<Course> getAllCourses(){
        return courseRepo.findAll();
    }

    // Delete a Course by ID
    public void deleteCourseById(String courseId) {
        courseRepo.deleteById(courseId);
    }

//    // Update a Course by ID
//    public Course updateCourse(Course course) {
//        Optional<Course> existingCourseOptional = courseRepo.findById(course.getCourseId());
//
//        if (existingCourseOptional.isPresent()) {
//            Course existingCourse = existingCourseOptional.get();
//            // Update relevant fields (replace with your logic)
//            existingCourse.setCourseName(course.getCourseName()); // Example update
//            existingCourse.setCourseDetails(course.getCourseDetails()); // Example update
//            // ... update other fields as needed
//
//            return courseRepo.save(existingCourse);
//        } else {
//            throw new IllegalArgumentException("Course with ID " + course.getCourseId() + " not found");
//        }
//    }

    public Course updateCourse(Course course) {
        Optional<Course> existingCourseOptional = courseRepo.findById(course.getCourseId());

        if (existingCourseOptional.isPresent()) {
            Course existingCourse = existingCourseOptional.get();

            // Update all course fields using the provided values from the course object
            existingCourse.setCourseId(course.getCourseId());
            existingCourse.setCourseName(course.getCourseName());
            existingCourse.setCourseDetails(course.getCourseDetails());
            existingCourse.setCourseImage(course.getCourseImage());
            existingCourse.setPrice(course.getPrice());
            existingCourse.setApproved(course.getApproved());
            existingCourse.setInstructorId(course.getInstructorId());

            existingCourse.getContent().setContentTitle(course.getContent().getContentId());
            existingCourse.getContent().setContentTitle(course.getContent().getContentTitle());
            existingCourse.getContent().setContentDescription(course.getContent().getContentDescription());
            existingCourse.getContent().setContentDescription(course.getContent().getContentUrl());

            return courseRepo.save(existingCourse);
        } else {
            // Course not found - return appropriate error response (e.g., 404 Not Found)
            throw new IllegalArgumentException("Course with ID " + course.getCourseId() + " not found");
        }
    }


}