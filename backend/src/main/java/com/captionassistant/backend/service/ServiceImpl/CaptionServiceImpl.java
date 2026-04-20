package com.captionassistant.backend.service.ServiceImpl;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.captionassistant.backend.dto.Request.CaptionCreateRequestDTO;
import com.captionassistant.backend.dto.Response.CaptionResponseDTO;
import com.captionassistant.backend.mapper.CaptionMapper;
import com.captionassistant.backend.model.CaptionEntity;
import com.captionassistant.backend.model.CaptionGroup;
import com.captionassistant.backend.model.UserEntity;
import com.captionassistant.backend.repository.CaptionGroupRepository;
import com.captionassistant.backend.repository.CaptionRepository;
import com.captionassistant.backend.repository.UserRepository;
import com.captionassistant.backend.service.IService.ICaptionService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class CaptionServiceImpl implements ICaptionService {
    private final CaptionRepository captionRepository;
    private final UserRepository userRepository;
    private final CaptionGroupRepository captionGroupRepository;

    @Override
    public CaptionResponseDTO createCaption(CaptionCreateRequestDTO requestDTO) {

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

        caption.setAiCaption("This is genereted behalf of ai : " + requestDTO.getPrompt());

        caption.setUser(user);

        caption.setGroup(group);

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
}
