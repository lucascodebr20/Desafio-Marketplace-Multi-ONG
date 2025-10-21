package com.backend.marktplace.controller.category;

import com.backend.marktplace.dto.request.category.RegisterCategoryDTO;
import com.backend.marktplace.entity.CategoryEntity;
import com.backend.marktplace.service.category.RegisterCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/dashboard-admin/")
public class RegisterCategoryController {

    @Autowired
    RegisterCategoryService registerCategoryService;

    @PostMapping("/register-category")
    public ResponseEntity<CategoryEntity> registerCategory(@RequestBody RegisterCategoryDTO dto) {
        CategoryEntity novaCategoria = registerCategoryService.registerCategory(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(novaCategoria);
    }


}
