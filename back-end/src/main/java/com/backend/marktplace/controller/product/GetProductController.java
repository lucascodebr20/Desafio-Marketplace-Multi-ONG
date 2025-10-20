package com.backend.marktplace.controller.product;

import com.backend.marktplace.dto.response.product.ProductAndOrganizationDTO;
import com.backend.marktplace.entity.ProductEntity;
import com.backend.marktplace.mapper.ProductAnOrganizationMapper;
import com.backend.marktplace.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/product")
public class GetProductController {

    @Autowired
    ProductRepository productRepository;

    @GetMapping("/all")
    public ResponseEntity<Page<ProductAndOrganizationDTO>> getAllProducts (Pageable pageable) {
        Page<ProductEntity> productPageEntity = productRepository.findAll(pageable);
        Page<ProductAndOrganizationDTO> productPageDTO = productPageEntity
                .map(ProductAnOrganizationMapper::toProductAndOrganizationDTO);
        return ResponseEntity.ok(productPageDTO);
    }

    @GetMapping("/{productId}")
    public ResponseEntity<ProductAndOrganizationDTO> getProduct (@PathVariable Long productId) {
        System.out.println("Product: " + productId);
        ProductEntity product = productRepository.findByProductId(productId);
        return ResponseEntity.ok().body
                (ProductAnOrganizationMapper.toProductAndOrganizationDTO(product));
    }

}
