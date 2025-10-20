package com.backend.marktplace.dto.response.product;

import java.math.BigDecimal;

public record ProductAndOrganizationDTO (
        Long productId,
        String nameProduct,
        String description,
        BigDecimal price,
        String imageUrl,
        String imageName,
        int stockQty,
        int weightGrams,
        String nameOrganization) { }