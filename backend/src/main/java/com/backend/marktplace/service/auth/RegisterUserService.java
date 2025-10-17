package com.backend.marktplace.service.auth;

import com.backend.marktplace.dto.request.auth.RegisterDTO;
import com.backend.marktplace.entity.UserEntity;
import com.backend.marktplace.enums.UserRole;
import com.backend.marktplace.infra.security.TokenService;
import com.backend.marktplace.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class RegisterUserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    TokenService tokenService;

    @Autowired
    private PasswordEncoder passwordEncoder;


    public String registerUser(RegisterDTO registerDTO) {

        if (userRepository.findByEmail(registerDTO.email()) != null) {
            throw new RuntimeException("e-mail já cadastrado.");
        }

        UserRole requestedRole;

        requestedRole = UserRole.valueOf(registerDTO.userRole().toUpperCase());

        if (requestedRole.equals(UserRole.ADMIN)) {
            throw new IllegalArgumentException();
        }

        String encryptedPassword = passwordEncoder.encode(registerDTO.password());
        UserEntity user = new UserEntity();
        user.setEmail(registerDTO.email().toLowerCase());
        user.setPassword(encryptedPassword);
        user.setName(registerDTO.name());
        user.setUserRole(requestedRole);
        userRepository.save(user);
        return tokenService.generateToken(user);
    }

}
