package com.backend.marktplace.service.product;

import com.backend.marktplace.dto.response.product.ProductDTO;
import com.backend.marktplace.entity.ProductEntity;
import com.backend.marktplace.repository.ProductRepository;
import com.backend.marktplace.service.image.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@Service
public class UpdateProductService {

    @Autowired
    ProductRepository productRepository;

    @Autowired
    ImageService imageService;

    public void updateProduct (ProductDTO productDTO, UUID organizationId, MultipartFile imageFile) throws IOException {

        ProductEntity product = productRepository.findByProductId(productDTO.productId());

        if (!(product.getOrganization().getOrganizationId().equals(organizationId))) {
            throw new RuntimeException("Você não tem autorização para editar esse produto");
        }

        product.setNameProduct(productDTO.nameProduct());
        product.setWeightGrams(productDTO.weightGrams());
        product.setPrice(productDTO.price());
        product.setDescription(productDTO.description());
        product.setStockQty(productDTO.stockQty());
        product.setImageUrl(productDTO.imageUrl());

        if (imageFile != null && !imageFile.isEmpty()) {
            String oldNameImage = product.getImageName();
            product.setImageName(imageService.saveImage(imageFile));
            imageService.deleteImage(oldNameImage);
        }

        productRepository.save(product);

    }


}
