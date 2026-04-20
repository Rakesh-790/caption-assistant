package com.captionassistant.backend.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.captionassistant.backend.model.CaptionEntity;

@Repository
public interface CaptionRepository extends JpaRepository<CaptionEntity, Long>{
    List<CaptionEntity> findByGroup_GroupId(Long groupId);

    Page<CaptionEntity> findByGroup_GroupId(Long groupId, Pageable pageable);
}
