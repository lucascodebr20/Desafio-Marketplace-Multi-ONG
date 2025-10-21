package com.backend.marktplace.component;

import com.backend.marktplace.entity.UserEntity;
import com.backend.marktplace.enums.UserRole;
import com.backend.marktplace.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            UserEntity admin = new UserEntity();
            admin.setName("Admin");
            admin.setEmail("admin@gmail.com");
            admin.setPassword(passwordEncoder.encode("123456"));
            admin.setUserRole(UserRole.ADMIN);
            userRepository.save(admin);
        }
    }
}