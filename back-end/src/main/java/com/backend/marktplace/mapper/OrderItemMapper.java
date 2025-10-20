package com.backend.marktplace.mapper;

import com.backend.marktplace.dto.response.order.OrderItemDTO;
import com.backend.marktplace.entity.OrderItemEntity;

public class OrderItemMapper {

    public static OrderItemDTO toOrderItemDTO (OrderItemEntity orderItemEntity) {
        return new OrderItemDTO(
                orderItemEntity.getProduct().getImageName(),
                orderItemEntity.getNameAtPurchase(),
                orderItemEntity.getPriceAtPurchase(),
                orderItemEntity.getQuantity() );
    }


}
