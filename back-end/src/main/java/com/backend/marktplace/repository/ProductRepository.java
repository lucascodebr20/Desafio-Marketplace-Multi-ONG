package com.backend.marktplace.repository;

import com.backend.marktplace.entity.ProductEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.UUID;

public interface ProductRepository extends JpaRepository<ProductEntity, Long>,
        JpaSpecificationExecutor<ProductEntity> {

    Page<ProductEntity> findByOrganizationOrganizationId(UUID organizationId, Pageable pageable);
    ProductEntity findByProductId(Long productId);
    Page<ProductEntity> findAll(Pageable pageable);
    Page<ProductEntity> findByNameProductContainingIgnoreCaseOrDescriptionContainingIgnoreCase (
                String name, String description, Pageable pageable);


}
