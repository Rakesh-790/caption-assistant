package com.captionassistant.backend.service.ServiceImpl;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.captionassistant.backend.dto.Request.CaptionCreateRequestDTO;
import com.captionassistant.backend.dto.Response.CaptionResponseDTO;
import com.captionassistant.backend.mapper.CaptionMapper;
import com.captionassistant.backend.model.CaptionEntity;
import com.captionassistant.backend.model.CaptionGroup;
import com.captionassistant.backend.model.ImageEntity;
import com.captionassistant.backend.model.UserEntity;
import com.captionassistant.backend.repository.CaptionGroupRepository;
import com.captionassistant.backend.repository.CaptionRepository;
import com.captionassistant.backend.repository.UserRepository;
import com.captionassistant.backend.service.IService.IAIService;
import com.captionassistant.backend.service.IService.ICaptionService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class CaptionServiceImpl implements ICaptionService {
    private final CaptionRepository captionRepository;
    private final UserRepository userRepository;
    private final CaptionGroupRepository captionGroupRepository;
    private final IAIService aiService;
    private final ImageServiceImpl imageServiceImpl;

    @Override
    public CaptionResponseDTO createCaption(CaptionCreateRequestDTO requestDTO, MultipartFile image) {

        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        CaptionGroup group;

        if (requestDTO.getGroupId() == null) {
            group = new CaptionGroup();
            group.setPrompt(requestDTO.getPrompt());
            group.setUser(user);

            captionGroupRepository.save(group);
        } else {
            // existing group
            group = captionGroupRepository.findById(requestDTO.getGroupId())
                    .orElseThrow(() -> new RuntimeException("Group not found"));

            // Security check
            if (!group.getUser().getUserId().equals(user.getUserId())) {
                throw new RuntimeException("Unauthorized");
            }
        }

        CaptionEntity caption = CaptionMapper.toEntity(requestDTO);

        ImageEntity savedImage = imageServiceImpl.uploadImage(image, user);

        String aiCaption = aiService.generateCaption(requestDTO, image);

        caption.setAiCaption(aiCaption);

        caption.setUser(user);

        caption.setGroup(group);

        caption.setImage(savedImage);

        captionRepository.save(caption);

        return CaptionMapper.toDTO(caption);
    }

    @Override
    public List<CaptionResponseDTO> getCaptionsByGroup(Long groupId) {

        CaptionGroup group = captionGroupRepository.findById(groupId)
                .orElseThrow(() -> new RuntimeException("Group not found"));

        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        if (!group.getUser().getEmail().equals(email)) {
            throw new RuntimeException("Unauthorized");
        }

        List<CaptionEntity> captions = captionRepository.findByGroup_GroupId(groupId);

        return CaptionMapper.toDTOList(captions);
    }

    @Override
    public Page<CaptionResponseDTO> getCaptionsByGroupPage(Long groupId, int page, int size) {

        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());

        Page<CaptionEntity> captionPage = captionRepository.findByGroup_GroupId(groupId, pageable);

        return captionPage.map(CaptionMapper::toDTO);
    }

    @Override
    public CaptionResponseDTO getCaptionById(Long id) {
        return captionRepository.findById(id)
                .map(CaptionMapper::toDTO)
                .orElseThrow(() -> new IllegalArgumentException("Caption not found with id: " + id));
    }
}
