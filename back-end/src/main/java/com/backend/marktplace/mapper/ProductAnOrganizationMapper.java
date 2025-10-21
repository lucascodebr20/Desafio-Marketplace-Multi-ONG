package com.backend.marktplace.mapper;

import com.backend.marktplace.dto.response.product.ProductAndOrganizationDTO;
import com.backend.marktplace.entity.ProductEntity;

public class ProductAnOrganizationMapper {

   public static ProductAndOrganizationDTO toProductAndOrganizationDTO
           (ProductEntity productEntity) {
       return new ProductAndOrganizationDTO(
               productEntity.getProductId(),
               productEntity.getNameProduct(),
               productEntity.getDescription(),
               productEntity.getPrice(),
               productEntity.getImageUrl(),
               productEntity.getImageName(),
               productEntity.getStockQty(),
               productEntity.getWeightGrams(),
               productEntity.getOrganization().getOrganizationName(),
               productEntity.getCategories().stream()
                       .map(CategoryMapper::toCategoryDTO).toList()
       );
   }

}
