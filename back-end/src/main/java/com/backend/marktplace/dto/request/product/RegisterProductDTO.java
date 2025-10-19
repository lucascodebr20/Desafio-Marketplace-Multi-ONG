package com.backend.marktplace.dto.request.product;

import java.math.BigDecimal;

public record RegisterProductDTO (
        String nameProduct,
        String description,
        BigDecimal price,
        String imageUrl,
        int stockQty,
        int weightGrams) { }
