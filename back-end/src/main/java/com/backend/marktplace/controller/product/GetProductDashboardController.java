package com.backend.marktplace.controller.product;

import com.backend.marktplace.dto.response.product.ProductDTO;
import com.backend.marktplace.entity.ProductEntity;
import com.backend.marktplace.entity.UserEntity;
import com.backend.marktplace.mapper.ProductMapper;
import com.backend.marktplace.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/dashboard-product")
public class ListProductDashboardController {

    @Autowired
    private ProductRepository productRepository;

    @GetMapping("/list")
    public ResponseEntity<Page<ProductDTO>> getProductsByOrganization (Pageable pageable) {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        UserEntity user = (UserEntity) authentication.getPrincipal();
        UUID organizationId = user.getOrganization().getOrganizationId();
        Page<ProductEntity> productPageEntity = productRepository.findByOrganizationOrganizationId(organizationId, pageable);
        Page<ProductDTO> productPageDTO = productPageEntity.map(ProductMapper::toProductDTO);
        return ResponseEntity.ok(productPageDTO);
    }

}
