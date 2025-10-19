package com.backend.marktplace.service.product;

import com.backend.marktplace.dto.request.product.RegisterProductDTO;
import com.backend.marktplace.entity.ProductEntity;
import com.backend.marktplace.entity.UserEntity;
import com.backend.marktplace.repository.ProductRepository;
import com.backend.marktplace.service.image.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class RegisterProductService {

    @Autowired
    ProductRepository productRepository;

    @Autowired
    ImageService imageService;

    private final Path uploadDir = Paths.get("./uploads/images");

    public void registerProduct (RegisterProductDTO registerProductDTO,
                                 UserEntity user, MultipartFile imageFile) throws IOException {

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
        if (imageFile != null && !imageFile.isEmpty()) {
            productEntity.setImageName(imageService.saveImage(imageFile));
        }
        productEntity.setImageUrl(registerProductDTO.imageUrl());
        productRepository.save(productEntity);

    }

}
