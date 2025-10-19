package com.backend.marktplace.controller.product;

import com.backend.marktplace.dto.request.product.RegisterProductDTO;
import com.backend.marktplace.entity.UserEntity;
import com.backend.marktplace.service.product.RegisterProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/dashboard-product")
public class RegisterProductController {

    @Autowired
    RegisterProductService registerProductService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<HttpStatus> registerProduct (RegisterProductDTO registerProductDTO,
            @RequestParam("imageFile") MultipartFile imageFile) {
        try {
            var authentication = SecurityContextHolder.getContext().getAuthentication();
            UserEntity user = (UserEntity) authentication.getPrincipal();
            registerProductService.registerProduct(registerProductDTO,user,imageFile);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (RuntimeException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
