package com.backend.marktplace.controller.search;

import com.backend.marktplace.dto.request.search.SearchDTO;
import com.backend.marktplace.dto.response.product.ProductDTO;
import com.backend.marktplace.service.search.ProductSearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/search")
public class SearchController {

    @Autowired
    ProductSearchService productSearchService;

    @PostMapping()
    public ResponseEntity<Page<ProductDTO>> searchProduct(@RequestBody SearchDTO searchDTO) {
        Page<ProductDTO> productDTOPage = productSearchService.searchProducts(searchDTO);
        return ResponseEntity.ok(productDTOPage);
    }




}
