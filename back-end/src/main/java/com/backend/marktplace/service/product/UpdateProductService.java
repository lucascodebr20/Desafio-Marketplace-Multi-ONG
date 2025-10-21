package com.backend.marktplace.service.product;

import com.backend.marktplace.dto.request.product.UpdateProductDTO;
import com.backend.marktplace.entity.CategoryEntity;
import com.backend.marktplace.entity.ProductEntity;
import com.backend.marktplace.repository.CategoryRepository;
import com.backend.marktplace.repository.ProductRepository;
import com.backend.marktplace.service.image.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional; // Importe o Transactional
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class UpdateProductService {

    @Autowired
    ProductRepository productRepository;

    @Autowired
    ImageService imageService;

    @Autowired
    CategoryRepository categoryRepository;

    @Transactional
    public void updateProduct(UpdateProductDTO updateProductDTO, UUID organizationId, MultipartFile imageFile) throws IOException {

        ProductEntity product = productRepository.findByProductId(updateProductDTO.productId());

        if (!product.getOrganization().getOrganizationId().equals(organizationId)) {
            throw new RuntimeException("Você não tem autorização para editar esse produto");
        }

        product.setNameProduct(updateProductDTO.nameProduct());
        product.setWeightGrams(updateProductDTO.weightGrams());
        product.setPrice(updateProductDTO.price());
        product.setDescription(updateProductDTO.description());
        product.setStockQty(updateProductDTO.stockQty());
        product.setImageUrl(updateProductDTO.imageUrl());

        if (imageFile != null && !imageFile.isEmpty()) {
            String oldNameImage = product.getImageName();
            if (oldNameImage != null && !oldNameImage.isEmpty()) {
                imageService.deleteImage(oldNameImage);
            }
            product.setImageName(imageService.saveImage(imageFile));
        }


        List<Long> currentCategoryIds = product.getCategories().stream()
                .map(CategoryEntity::getCategoryId)
                .toList();

        List<Long> newCategoryIds = updateProductDTO.categoryIds() != null ? updateProductDTO.categoryIds() : List.of();

        List<CategoryEntity> categoriesToRemove = product.getCategories().stream()
                .filter(category -> !newCategoryIds.contains(category.getCategoryId()))
                .toList();

        new ArrayList<>(categoriesToRemove).forEach(product::removeCategory);

        for (Long newId : newCategoryIds) {
            if (!currentCategoryIds.contains(newId)) {
                CategoryEntity categoryToAdd = categoryRepository.findById(newId)
                        .orElseThrow(() -> new RuntimeException("Categoria com ID " + newId + " não encontrada."));
                product.addCategory(categoryToAdd);
            }
        }

        productRepository.save(product);

    }
}