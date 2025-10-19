package com.backend.marktplace.repository;

import com.backend.marktplace.entity.ProductEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ProductRepository extends JpaRepository<ProductEntity, UUID> {

    Page<ProductEntity> findByOrganizationOrganizationId(UUID organizationId, Pageable pageable);
    ProductEntity findByProductId(Long productId);

}
