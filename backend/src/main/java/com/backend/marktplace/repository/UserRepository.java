package com.backend.marktplace.repository;

import com.backend.marktplace.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UserRepository extends JpaRepository<UserEntity,UUID> {

    UserEntity findByIdUser (UUID idUsuario);
    UserEntity findByEmail (String email);

}
