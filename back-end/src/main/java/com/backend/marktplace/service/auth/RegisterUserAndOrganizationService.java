package com.backend.marktplace.service.auth;

import com.backend.marktplace.dto.request.auth.RegisterUserAndOrganizationDTO;
import com.backend.marktplace.entity.OrganizationEntity;
import com.backend.marktplace.entity.UserEntity;
import com.backend.marktplace.enums.UserRole;
import com.backend.marktplace.infra.security.TokenService;
import com.backend.marktplace.repository.OrganizationRepository;
import com.backend.marktplace.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class RegisterUserAndOrganizationService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    TokenService tokenService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private OrganizationRepository organizationRepository;

    public String registerUserAndOrganization (RegisterUserAndOrganizationDTO dto) {

        if (userRepository.findByEmail(dto.email()) != null) {
            throw new RuntimeException("E-mail já cadastrado.");
        }

        UserRole requestedRole;
        requestedRole = UserRole.valueOf(dto.userRole().toUpperCase());

        if (requestedRole.equals(UserRole.ADMIN)) {
            throw new IllegalArgumentException();
        }

        if (organizationRepository.existsByCNPJ(dto.CNPJ())) {
            throw new RuntimeException("CNPJ já cadastrado");
        }

        String encryptedPassword = passwordEncoder.encode(dto.password());
        UserEntity user = new UserEntity();
        user.setEmail(dto.email().toLowerCase());
        user.setPassword(encryptedPassword);
        user.setName(dto.name());
        user.setUserRole(requestedRole);
        userRepository.save(user);

        OrganizationEntity organization = new OrganizationEntity();
        organization.setOrganizationName(dto.organizationName());
        organization.setCNPJ(dto.CNPJ());
        organization.setUser(user);
        organizationRepository.save(organization);

        return tokenService.generateToken(user);

    }

}
