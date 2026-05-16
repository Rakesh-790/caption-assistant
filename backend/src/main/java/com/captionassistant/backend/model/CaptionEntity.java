package com.captionassistant.backend.model;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import com.captionassistant.backend.constants.Language;
import com.captionassistant.backend.constants.Platform;
import com.captionassistant.backend.constants.Tone;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "captions")
public class CaptionEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long captionId;

    private String prompt;

    @Column(columnDefinition = "TEXT")
    private String aiCaption;

    @Column(updatable = false, nullable = false)
    @CreationTimestamp
    private LocalDateTime createdAt;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Language language;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Platform platform;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Tone tone;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", referencedColumnName = "userId")
    private UserEntity user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "image_id", referencedColumnName = "imageId")
    private ImageEntity image;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "group_id")
    private CaptionGroup group;
}
