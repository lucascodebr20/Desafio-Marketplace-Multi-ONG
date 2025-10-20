package com.backend.marktplace.dto.response.order;

import java.math.BigDecimal;

public record OrderItemDTO(
        String imageName,
        String nameAtPurchase,
        BigDecimal priceAtPurchase,
        int quantity) { }
