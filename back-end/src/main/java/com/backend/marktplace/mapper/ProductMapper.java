package com.backend.marktplace.mapper;

import com.backend.marktplace.dto.response.product.ProductDTO;
import com.backend.marktplace.entity.ProductEntity;

public class ProductMapper {

   public static ProductDTO toProductDTO(ProductEntity productEntity) {
       return new ProductDTO(
               productEntity.getProductId(),
               productEntity.getNameProduct(),
               productEntity.getDescription(),
               productEntity.getPrice(),
               productEntity.getImageUrl(),
               productEntity.getImageName(),
               productEntity.getStockQty(),
               productEntity.getWeightGrams()
       );
   }

}
