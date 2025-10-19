package com.backend.marktplace.service.product;

import com.backend.marktplace.entity.ProductEntity;
import com.backend.marktplace.mapper.ProductMapper;
import com.backend.marktplace.repository.ProductRepository;
import com.backend.marktplace.service.image.ImageService;
import org.apache.tomcat.websocket.AuthenticationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class DeleteProductService {

    @Autowired
    ProductRepository productRepository;

    @Autowired
    ImageService imageService;


    public void deleteProduct(Long idProduct, UUID userId) throws AuthenticationException {

        ProductEntity product = productRepository.findByProductId(idProduct);

        if (product == null) {
            throw new RuntimeException("Produto não encontrado.");
        }

        if (!product.getOrganization().getUser().getUserId().equals(userId)) {
            throw new AuthenticationException("Você não tem permissão para excluir este produto.");
        }

        if (product.getImageName() != null && !product.getImageName().isEmpty()) {
            imageService.deleteImage(product.getImageName());
        }

        productRepository.delete(product);
    }


}
