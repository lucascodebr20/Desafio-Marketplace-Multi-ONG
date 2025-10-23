package com.backend.marktplace.service.organization;

import com.backend.marktplace.dto.request.company.RegisterOrganizationDTO;
import com.backend.marktplace.entity.OrganizationEntity;
import com.backend.marktplace.entity.UserEntity;
import com.backend.marktplace.enums.UserRole;
import com.backend.marktplace.repository.OrganizationRepository;
import com.backend.marktplace.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RegisterOrganizationService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    OrganizationRepository organizationRepository;

    @Transactional
    public void registerOrganization (RegisterOrganizationDTO registerOrganizationDTO, UserEntity user) {

        if (organizationRepository.existsByCNPJ(registerOrganizationDTO.CNPJ())) {
            throw new RuntimeException("CNPJ already registered.");
        }

        if (organizationRepository.existsByUser_UserId(user.getUserId())) {
            throw new RuntimeException("User already has an organization registered.");
        }

        if (organizationRepository.findAll().size() >= 2) {
            throw new RuntimeException("Organization limit exceeded.");
        }

        OrganizationEntity organization = new OrganizationEntity();
        organization.setOrganizationName(registerOrganizationDTO.nameOrganization());
        organization.setCNPJ(registerOrganizationDTO.CNPJ());
        organization.setUser(user);
        user.setUserRole(UserRole.ONG);

        userRepository.save(user);
        organizationRepository.save(organization);
    }



}
