package com.captionassistant.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.captionassistant.backend.model.ImageEntity;

public interface ImageRepository extends JpaRepository<ImageEntity, Long>{
    
}
