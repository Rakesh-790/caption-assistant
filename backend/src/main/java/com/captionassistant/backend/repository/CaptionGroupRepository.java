package com.captionassistant.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.captionassistant.backend.model.CaptionGroup;

@Repository
public interface CaptionGroupRepository extends JpaRepository<CaptionGroup, Long> {
    
}
