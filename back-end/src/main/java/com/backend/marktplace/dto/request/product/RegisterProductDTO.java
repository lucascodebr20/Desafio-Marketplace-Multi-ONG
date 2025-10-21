package com.backend.marktplace.dto.request.product;

import com.backend.marktplace.dto.request.category.RegisterCategoryProductDTO;

import java.math.BigDecimal;
import java.util.List;

public record RegisterProductDTO (
        String nameProduct,
        String description,
        BigDecimal price,
        String imageUrl,
        int stockQty,
        int weightGrams,
        List<RegisterCategoryProductDTO> categoryList){};
