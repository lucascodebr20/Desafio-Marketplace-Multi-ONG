package com.backend.marktplace.mapper;

import com.backend.marktplace.dto.response.category.CategoryDTO;
import com.backend.marktplace.entity.CategoryEntity;

public class CategoryMapper {

    public static CategoryDTO toCategoryDTO(CategoryEntity categoryEntity) {
        return new CategoryDTO(
                categoryEntity.getCategoryId(),
                categoryEntity.getNameCategory()
        );
    }

}
