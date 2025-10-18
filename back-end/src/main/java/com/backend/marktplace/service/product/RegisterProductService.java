package com.backend.marktplace.service.product;

import com.backend.marktplace.dto.request.product.RegisterProductDTO;
import com.backend.marktplace.entity.ProductEntity;
import com.backend.marktplace.entity.UserEntity;
import com.backend.marktplace.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RegisterProductService {

    @Autowired
    ProductRepository productRepository;

    public void registerProduct (RegisterProductDTO registerProductDTO, UserEntity user) {

        if (user.getOrganization() == null) {
            throw new RuntimeException("User has not registered an organization.");
        }

        ProductEntity productEntity = new ProductEntity();
        productEntity.setNameProduct(registerProductDTO.nameProduct());
        productEntity.setDescription(registerProductDTO.description());
        productEntity.setPrice(registerProductDTO.price());
        productEntity.setStockQty(registerProductDTO.stockQty());
        productEntity.setWeightGrams(registerProductDTO.weightGrams());
        productEntity.setOrganization(user.getOrganization());
        productRepository.save(productEntity);

    }

}
