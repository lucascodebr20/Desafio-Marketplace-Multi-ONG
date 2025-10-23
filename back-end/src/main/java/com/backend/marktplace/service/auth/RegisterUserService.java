package com.backend.marktplace.service.auth;

import com.backend.marktplace.dto.request.auth.RegisterUserDTO;
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

    public String registerUser(RegisterUserDTO registerUserDTO) {

        if (userRepository.findByEmail(registerUserDTO.email()) != null) {
            throw new RuntimeException("e-mail já cadastrado.");
        }

        UserRole requestedRole;

        requestedRole = UserRole.valueOf(registerUserDTO.userRole().toUpperCase());

        if (requestedRole.equals(UserRole.ADMIN)) {
            throw new IllegalArgumentException();
        }

        if (userRepository.findAll().size() >= 1000) {
            throw new RuntimeException("Limite de usuário excedido");
        }

        String encryptedPassword = passwordEncoder.encode(registerUserDTO.password());
        UserEntity user = new UserEntity();
        user.setEmail(registerUserDTO.email().toLowerCase());
        user.setPassword(encryptedPassword);
        user.setName(registerUserDTO.name());
        user.setUserRole(requestedRole);
        userRepository.save(user);
        return tokenService.generateToken(user);

    }

}
