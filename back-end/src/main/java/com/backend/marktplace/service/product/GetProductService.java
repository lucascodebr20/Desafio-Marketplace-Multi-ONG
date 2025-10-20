package com.backend.marktplace.service.product;

import com.backend.marktplace.dto.response.product.ProductDTO;
import com.backend.marktplace.entity.ProductEntity;
import com.backend.marktplace.mapper.ProductMapper;
import com.backend.marktplace.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class GetProductService {

    @Autowired
    ProductRepository productRepository;

    public ProductDTO getOneProductDashboard(Long productId, UUID organizationId) {
        ProductEntity product = productRepository.findByProductId(productId);
        if (!product.getOrganization().getOrganizationId().equals(organizationId)){
            throw new RuntimeException("Você não tem autorização para ver esse produto");
        }
        return ProductMapper.toProductDTO(product);
    }


}
