package com.backend.marktplace.controller.category;

import com.backend.marktplace.dto.response.category.CategoryDTO;
import com.backend.marktplace.entity.CategoryEntity;
import com.backend.marktplace.mapper.CategoryMapper;
import com.backend.marktplace.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/category")
public class GetCategoryController {

    @Autowired
    CategoryRepository categoryRepository;

    @GetMapping
    public ResponseEntity<List<CategoryDTO>> getAllCategory () {
        List<CategoryEntity> listCategory = categoryRepository.findAll();
        List<CategoryDTO> listCategoryDTO = listCategory.stream().map(
                CategoryMapper::toCategoryDTO).toList();
        return ResponseEntity.ok().body(listCategoryDTO);
    }

}
