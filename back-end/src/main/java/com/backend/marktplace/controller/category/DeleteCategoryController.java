package com.backend.marktplace.controller.category;

import com.backend.marktplace.service.category.DeleteCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/dashboard-admin/")
public class DeleteCategoryController {

    @Autowired
    DeleteCategoryService deleteCategoryService;

    @DeleteMapping("/{categoryId}")
    public ResponseEntity<HttpStatus> deleteCategory (@PathVariable Long categoryId ) {
        deleteCategoryService.deleteCategory(categoryId);
        return ResponseEntity.ok().build();
    }

}
