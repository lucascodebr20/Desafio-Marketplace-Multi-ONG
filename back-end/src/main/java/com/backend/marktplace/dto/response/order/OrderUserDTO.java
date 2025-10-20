package com.backend.marktplace.dto.response.order;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public record OrderUserDTO(
        Long orderId,
        String organizationName,
        LocalDateTime orderDate,
        String statusOrder,
        BigDecimal totalAmount,
        List<OrderItemDTO> listOrder){}
