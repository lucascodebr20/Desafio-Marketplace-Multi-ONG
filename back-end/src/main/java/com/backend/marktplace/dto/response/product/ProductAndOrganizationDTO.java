package com.backend.marktplace.dto.response.product;

import com.backend.marktplace.dto.response.category.CategoryDTO;

import java.math.BigDecimal;
import java.util.List;

public record ProductAndOrganizationDTO (
        Long productId,
        String nameProduct,
        String description,
        BigDecimal price,
        String imageUrl,
        String imageName,
        int stockQty,
        int weightGrams,
        String nameOrganization,
        List<CategoryDTO> category) { }