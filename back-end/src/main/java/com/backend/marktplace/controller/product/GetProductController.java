package com.backend.marktplace.controller.product;

import com.backend.marktplace.dto.response.product.ProductAndOrganizationDTO;
import com.backend.marktplace.entity.ProductEntity;
import com.backend.marktplace.mapper.ProductAnOrganizationMapper;
import com.backend.marktplace.repository.ProductRepository;
import com.backend.marktplace.specifications.ProductSpecifications;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/product")
public class GetProductController {

    @Autowired
    ProductRepository productRepository;

    @GetMapping("/all")
    public ResponseEntity<Page<ProductAndOrganizationDTO>> getAllProducts(
            @RequestParam(required = false) BigDecimal priceMin,
            @RequestParam(required = false) BigDecimal priceMax,
            @RequestParam(required = false) List<Long> categoryIds,
            Pageable pageable) {
        Specification<ProductEntity> specification = ProductSpecifications.byPriceRange(priceMin, priceMax)
                .and(ProductSpecifications.byCategoryIds(categoryIds));
        Page<ProductEntity> productPageEntity = productRepository.findAll(specification, pageable);
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
