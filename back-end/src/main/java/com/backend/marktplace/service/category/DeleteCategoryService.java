package com.backend.marktplace.service.category;

import com.backend.marktplace.entity.CategoryEntity;
import com.backend.marktplace.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class DeleteCategoryService {

    @Autowired
    CategoryRepository categoryRepository;

    public void deleteCategory (Long categoryId) {
        CategoryEntity category = categoryRepository.findByCategoryId(categoryId);
        categoryRepository.delete(category);
    }


}
