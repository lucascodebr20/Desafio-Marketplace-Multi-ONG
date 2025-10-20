package com.backend.marktplace.controller.order;

import com.backend.marktplace.dto.request.order.NewOrderDTO;
import com.backend.marktplace.entity.UserEntity;
import com.backend.marktplace.service.order.NewOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.http.HttpResponse;

@RestController
@RequestMapping("/order")
public class OrderController {

    @Autowired
    NewOrderService newOrderService;

    @PostMapping("/new-order")
    public ResponseEntity<HttpStatus> newOrder (@RequestBody NewOrderDTO newOrderDTO) {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        UserEntity user = (UserEntity) authentication.getPrincipal();
        newOrderService.newOrder(newOrderDTO,user);
        return ResponseEntity.ok(HttpStatus.ACCEPTED);
    }




}
