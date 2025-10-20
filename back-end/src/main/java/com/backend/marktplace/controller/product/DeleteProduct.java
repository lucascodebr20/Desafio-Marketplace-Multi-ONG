package com.backend.marktplace.controller.product;

import com.backend.marktplace.entity.UserEntity;
import com.backend.marktplace.service.product.DeleteProductService;
import org.apache.tomcat.websocket.AuthenticationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.http.HttpRequest;

@RestController
@RequestMapping("/dashboard-product")
public class DeleteProduct {

    @Autowired
    DeleteProductService deleteProductService;

    @DeleteMapping("/{productId}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long productId) throws AuthenticationException {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        UserEntity user = (UserEntity) authentication.getPrincipal();
        deleteProductService.deleteProduct(productId, user.getUserId());
        return ResponseEntity.noContent().build();
    }



}
