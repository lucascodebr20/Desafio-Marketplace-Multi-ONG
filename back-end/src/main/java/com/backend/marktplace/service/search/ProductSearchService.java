package com.backend.marktplace.service.search;

import com.backend.marktplace.dto.request.search.SearchDTO;
import com.backend.marktplace.dto.response.product.ProductDTO;
import com.backend.marktplace.entity.ProductEntity;
import com.backend.marktplace.entity.SearchLogEntity;
import com.backend.marktplace.mapper.ProductMapper;
import com.backend.marktplace.repository.ProductRepository;
import com.backend.marktplace.specifications.ProductSpecifications;
import com.backend.marktplace.util.gemini.GeminiApi;
import com.backend.marktplace.util.gemini.GeminiFilterDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.TimeUnit;

@Service
public class ProductSearchService {

    private static final Logger logger = LoggerFactory.getLogger(ProductSearchService.class);

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private GeminiApi geminiApi;

    @Autowired private
    ObjectMapper objectMapper;

    @Autowired private
    SearchLogService logService;

    public Page<ProductDTO> searchProducts(SearchDTO searchDTO) {
        SearchLogEntity log = new SearchLogEntity();
        log.setSearchInput(searchDTO.text());

        Pageable pageable = PageRequest.of(
                searchDTO.page() != null ? searchDTO.page() : 0,
                searchDTO.size() != null ? searchDTO.size() : 10
        );

        Page<ProductEntity> productPage;

        if (searchDTO.iaSearch()) {
            productPage = performAiSearch(searchDTO, log, pageable);
        } else {
            logger.info("Performing standard text search for: '{}'", searchDTO.text());
            productPage = productRepository.findByNameProductContainingIgnoreCaseOrDescriptionContainingIgnoreCase(
                    searchDTO.text(), searchDTO.text(), pageable);

            log.setSuccess(true);
            log.setWasFallbackApplied(false);
        }

        log.setItemCount(productPage.getNumberOfElements());
        logService.saveSearchLog(log);

        return productPage.map(ProductMapper::toProductDTO);
    }

    private Page<ProductEntity> performAiSearch(SearchDTO searchDTO, SearchLogEntity log,
                                                Pageable pageable) {

        try {
            logger.info("Performing AI search for: '{}'", searchDTO.text());
            CompletableFuture<String> future = CompletableFuture.supplyAsync(() -> {
                try {
                    return geminiApi.generateResponseSearch(searchDTO.text());
                } catch (Exception e) {
                    throw new RuntimeException("Error calling Gemini API", e);
                }
            });

            String filterJson = future.get(15, TimeUnit.SECONDS);
            GeminiFilterDTO filters = objectMapper.readValue(filterJson, GeminiFilterDTO.class);
            Specification<ProductEntity> spec = ProductSpecifications.build(filters);
            log.setGeneratedFilters(filterJson);
            log.setSuccess(true);
            log.setWasFallbackApplied(false);

            return productRepository.findAll(spec, pageable);

        } catch (Exception e) {

            logger.warn("AI search failed for text: '{}'. " +
                    "Applying fallback. Reason: {}", searchDTO.text(), e.getMessage());

            log.setSuccess(false);
            log.setWasFallbackApplied(true);

            return productRepository.findByNameProductContainingIgnoreCaseOrDescriptionContainingIgnoreCase(
                    searchDTO.text(), searchDTO.text(), pageable);
        }
    }
}