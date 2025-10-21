package com.backend.marktplace.dto.request.product;

import java.math.BigDecimal;
import java.util.List;

public record UpdateProductDTO (
        Long productId,
        String nameProduct,
        String description,
        BigDecimal price,
        String imageUrl,
        int stockQty,
        int weightGrams,
        List<Long> categoryIds) {}
