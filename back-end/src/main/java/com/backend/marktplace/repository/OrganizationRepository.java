package com.backend.marktplace.repository;

import com.backend.marktplace.entity.OrganizationEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface OrganizationRepository extends JpaRepository<OrganizationEntity, UUID> {
    Boolean existsByCNPJ(String CNPJ);
    Boolean existsByUser_UserId(UUID userId);

}
