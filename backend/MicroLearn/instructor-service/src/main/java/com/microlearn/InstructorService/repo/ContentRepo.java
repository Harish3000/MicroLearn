package com.microlearn.InstructorService.repo;
import com.microlearn.InstructorService.entity.Content;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ContentRepo {

    public interface InstructorRepo extends MongoRepository<Content, String> {
    }
}

