package com.backend.marktplace.service.category;

import com.backend.marktplace.dto.request.category.RegisterCategoryDTO;
import com.backend.marktplace.entity.CategoryEntity;
import com.backend.marktplace.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RegisterCategoryService {

    @Autowired
    CategoryRepository categoryRepository;

    public CategoryEntity registerCategory(RegisterCategoryDTO registerCategoryDTO) {

        if (categoryRepository.existsByNameCategory(registerCategoryDTO.nameCategory())){
            throw new RuntimeException("Categoria já cadastrada");
        }

        CategoryEntity category = new CategoryEntity();
        category.setNameCategory(registerCategoryDTO.nameCategory());
        categoryRepository.save(category);
        return category;
    }

}
