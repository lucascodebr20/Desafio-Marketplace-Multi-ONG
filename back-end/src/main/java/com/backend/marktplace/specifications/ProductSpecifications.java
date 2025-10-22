package com.backend.marktplace.specifications;

import jakarta.persistence.criteria.JoinType;
import com.backend.marktplace.entity.CategoryEntity;
import com.backend.marktplace.entity.ProductEntity;
import com.backend.marktplace.util.gemini.GeminiFilterDTO;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class ProductSpecifications {

    public static Specification<ProductEntity> withName(String name) {
        return (root, query, builder) -> {
            if (name == null || name.trim().isEmpty()) {
                return builder.conjunction();}
            return builder.like(builder.lower(root.get("name")), "%" + name.toLowerCase() + "%");
        };
    }

    public static Specification<ProductEntity> withCategories(List<String> categoryNames) {
        return (root, query, builder) -> {
            if (categoryNames == null || categoryNames.isEmpty()) {
                return builder.conjunction(); }
            assert query != null;
            query.distinct(true);
            Join<ProductEntity, CategoryEntity> categoriesJoin = root.join("categories");
            return categoriesJoin.get("nameCategory").in(categoryNames);
        };
    }

    public static Specification<ProductEntity> byPriceRange(BigDecimal min, BigDecimal max) {
        return (root, query, builder) -> {
            Predicate minPredicate = builder.conjunction(); // WHERE TRUE
            Predicate maxPredicate = builder.conjunction(); // WHERE TRUE
            if (min != null) {
                minPredicate = builder.greaterThanOrEqualTo(root.get("price"), min);}
            if (max != null) {
                maxPredicate = builder.lessThanOrEqualTo(root.get("price"), max);}
            return builder.and(minPredicate, maxPredicate);
        };
    }

    public static Specification<ProductEntity> byCategoryIds(List<Long> categoryIds) {
        return (root, query, builder) -> {
            if (categoryIds == null || categoryIds.isEmpty()) {
                return builder.conjunction();}
            assert query != null;
            query.distinct(true);
            Join<ProductEntity, CategoryEntity> categoriesJoin = root.join("categories");
            return categoriesJoin.get("categoryId").in(categoryIds);
        };
    }

    public static Specification<ProductEntity> build(GeminiFilterDTO filters) {
        return (root, query, criteriaBuilder) -> {

            List<Predicate> orConditions = new ArrayList<>();
            
            if (filters.keywords() != null && !filters.keywords().isEmpty()) {
                List<Predicate> keywordOrGroup = new ArrayList<>();
                for (String keyword : filters.keywords()) {
                    keywordOrGroup.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("nameProduct")), "%" + keyword.toLowerCase() + "%"));
                    keywordOrGroup.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("description")), "%" + keyword.toLowerCase() + "%"));
                }
                orConditions.add(criteriaBuilder.or(keywordOrGroup.toArray(new Predicate[0])));
            }

            if (filters.categories() != null && !filters.categories().isEmpty()) {
                jakarta.persistence.criteria.Path<String> categoryNamePath = root.join("categories", JoinType.LEFT).get("nameCategory");
                List<String> lowerCaseCategories = filters.categories().stream().map(String::toLowerCase).toList();
                orConditions.add(criteriaBuilder.lower(categoryNamePath).in(lowerCaseCategories));
            }

            List<Predicate> priceAndGroup = new ArrayList<>();

            if (filters.priceMax() != null) {
                priceAndGroup.add(criteriaBuilder.lessThanOrEqualTo(root.get("price"), filters.priceMax()));
            }
            if (filters.priceMin() != null) {
                priceAndGroup.add(criteriaBuilder.greaterThanOrEqualTo(root.get("price"), filters.priceMin()));
            }

            if (!priceAndGroup.isEmpty()) {
                orConditions.add(criteriaBuilder.and(priceAndGroup.toArray(new Predicate[0])));
            }

            if (orConditions.isEmpty()) {
                return criteriaBuilder.conjunction();
            }

            return criteriaBuilder.or(orConditions.toArray(new Predicate[0]));
        };
    }


}
