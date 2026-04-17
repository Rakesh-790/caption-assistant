package com.captionassistant.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.captionassistant.backend.model.CaptionEntity;

public interface CaptionRepository extends JpaRepository<CaptionEntity, Long>{
    
}
