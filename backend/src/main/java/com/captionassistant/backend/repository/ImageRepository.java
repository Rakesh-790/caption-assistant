package com.captionassistant.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.captionassistant.backend.model.ImageEntity;

@Repository
public interface ImageRepository extends JpaRepository<ImageEntity, Long>{
    
}
