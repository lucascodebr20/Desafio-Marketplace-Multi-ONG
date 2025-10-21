package com.backend.marktplace.repository;

import com.backend.marktplace.entity.CategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<CategoryEntity,Long> {

    Boolean existsByNameCategory(String nameCategory);
    Boolean existsByProductsProductId(Long productId);
    CategoryEntity findByCategoryId(Long categoryId);

}
