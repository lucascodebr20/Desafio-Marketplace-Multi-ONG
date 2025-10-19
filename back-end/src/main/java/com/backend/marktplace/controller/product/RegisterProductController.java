package com.backend.marktplace.controller.product;

import com.backend.marktplace.dto.request.product.RegisterProductDTO;
import com.backend.marktplace.entity.UserEntity;
import com.backend.marktplace.service.product.RegisterProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/product")
public class RegisterProductController {

    @Autowired
    RegisterProductService registerProductService;

    @PostMapping()
    public ResponseEntity<HttpStatus> registerProduct(
            @RequestBody RegisterProductDTO registerProductDTO) {
        try {
            var authentication = SecurityContextHolder.getContext().getAuthentication();
            UserEntity user = (UserEntity) authentication.getPrincipal();
            registerProductService.registerProduct(registerProductDTO,user);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
