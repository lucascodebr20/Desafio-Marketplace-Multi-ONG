package com.backend.marktplace.mapper;

import com.backend.marktplace.dto.response.order.OrderUserDTO;
import com.backend.marktplace.entity.OrderEntity;

public class OrderUserMapper {

    public static OrderUserDTO toOrderUserDTO (OrderEntity orderEntity) {
        return new OrderUserDTO(
                orderEntity.getOrderId(),
                orderEntity.getOrganization().getOrganizationName(),
                orderEntity.getOrderDate(),
                orderEntity.getStatusOrder().getDescription(),
                orderEntity.getTotalAmount(),
                orderEntity.getOrderItems().stream()
                        .map(OrderItemMapper::toOrderItemDTO).toList()
        );
    }

}
