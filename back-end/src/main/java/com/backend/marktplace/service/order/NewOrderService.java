package com.backend.marktplace.service.order;

import com.backend.marktplace.dto.request.order.NewItemOrderDTO;
import com.backend.marktplace.dto.request.order.NewOrderDTO;
import com.backend.marktplace.entity.*;
import com.backend.marktplace.enums.StatusOrder;
import com.backend.marktplace.enums.UserRole;
import com.backend.marktplace.repository.OrderItemRepository;
import com.backend.marktplace.repository.OrderRepository;
import com.backend.marktplace.repository.ProductRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class NewOrderService {

    @Autowired
    ProductRepository productRepository;

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    OrderItemRepository orderItemRepository;


    @Transactional
    public void newOrder (NewOrderDTO newOrderDTO, UserEntity user) {

        List<ProductEntity> productList = newOrderDTO.listItemOrder().stream()
                .map(newItemOrderDTO -> productRepository.findByProductId(newItemOrderDTO.productId()))
                .toList();

        List<OrganizationEntity> organizationEntities = productList.stream()
                .map(ProductEntity::getOrganization)
                .distinct()
                .toList();

        List<NewItemOrderDTO> listItemDTO = newOrderDTO.listItemOrder();

        List<OrderEntity> orderList = new ArrayList<>();
        List<OrderItemEntity> orderItemList = new ArrayList<>();

        for (OrganizationEntity organization : organizationEntities) {

            if (!user.getUserRole().equals(UserRole.USER)) {
                if (organization.getOrganizationId().equals(user.getOrganization().getOrganizationId())) {
                    throw new RuntimeException("Usuário não pode fazer pedido para si mesmo");
                }
            }

            OrderEntity orderEntity = new OrderEntity();
            orderEntity.setOrderDate(LocalDateTime.now());
            orderEntity.setStatusOrder(StatusOrder.AWAITING_PAYMENT);
            orderEntity.setOrganization(organization);
            orderEntity.setUser(user);

            orderList.add(orderEntity);

            for (NewItemOrderDTO itemDTO: listItemDTO ) {
                ProductEntity product = productRepository.findByProductId(itemDTO.productId());
                if (product.getOrganization().getOrganizationId()
                        .equals(organization.getOrganizationId())) {
                    OrderItemEntity orderItem = new OrderItemEntity();
                    orderItem.setOrder(orderEntity);
                    orderItem.setQuantity(itemDTO.quantity());
                    orderItem.setNameAtPurchase(product.getNameProduct());
                    orderItem.setProduct(product);
                    orderItem.setPriceAtPurchase(product.getPrice());

                    orderItemList.add(orderItem);
                }
            }
        }

        orderRepository.saveAll(orderList);
        orderItemRepository.saveAll(orderItemList);

    }




}
