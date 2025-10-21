package com.backend.marktplace.controller.product;

import com.backend.marktplace.dto.request.product.RegisterProductDTO;
import com.backend.marktplace.dto.request.product.UpdateProductDTO;
import com.backend.marktplace.dto.response.product.ProductDTO;
import com.backend.marktplace.entity.UserEntity;
import com.backend.marktplace.service.product.UpdateProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.net.http.HttpResponse;
import java.util.UUID;

@RestController
@RequestMapping("/dashboard-product")
public class UpdateProductController {

    @Autowired
    UpdateProductService updateProductService;

    @PutMapping(path = "/update", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updateProduct(
            UpdateProductDTO updateProductDTO, @RequestParam (value = "imageFile", required = false) MultipartFile imageFile) {
        try {
            var authentication = SecurityContextHolder.getContext().getAuthentication();
            UserEntity user = (UserEntity) authentication.getPrincipal();
            UUID organizationId = user.getOrganization().getOrganizationId();
            updateProductService.updateProduct(updateProductDTO, organizationId, imageFile);
            return ResponseEntity.status(HttpStatus.ACCEPTED).build();
        } catch (RuntimeException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro na requisição: " + e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocorreu um erro inesperado.");
        }
    }

}
