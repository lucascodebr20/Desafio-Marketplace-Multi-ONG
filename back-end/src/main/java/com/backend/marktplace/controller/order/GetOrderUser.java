package com.backend.marktplace.controller.order;

import com.backend.marktplace.dto.response.order.OrderUserDTO;
import com.backend.marktplace.entity.OrderEntity;
import com.backend.marktplace.entity.UserEntity;
import com.backend.marktplace.mapper.OrderUserMapper;
import com.backend.marktplace.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/order")
public class GetOrderUser {

    @Autowired
    OrderRepository orderRepository;

    @GetMapping()
    public ResponseEntity<Page<OrderUserDTO>> getOrderUser (Pageable pageable) {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        UserEntity user = (UserEntity) authentication.getPrincipal();
        Page<OrderEntity> orderEntityPage = orderRepository.findByUserUserId(user.getUserId(),pageable);
        Page<OrderUserDTO> orderUserDTOS = orderEntityPage.map(OrderUserMapper::toOrderUserDTO);
        return ResponseEntity.ok().body(orderUserDTOS);
    }



}
