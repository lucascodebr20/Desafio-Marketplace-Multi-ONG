package com.backend.marktplace.specifications;

import jakarta.persistence.criteria.JoinType;
import com.backend.marktplace.entity.CategoryEntity;
import com.backend.marktplace.entity.ProductEntity;
import com.backend.marktplace.util.gemini.GeminiFilterDTO;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Order;
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

            List<Predicate> optionalOrConditions = new ArrayList<>();

            if (filters.keywords() != null && !filters.keywords().isEmpty()) {
                List<Predicate> keywordOrGroup = new ArrayList<>();
                for (String keyword : filters.keywords()) {
                    String lowerKeyword = "%" + keyword.toLowerCase() + "%";
                    keywordOrGroup.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("nameProduct")), lowerKeyword));
                    keywordOrGroup.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("description")), lowerKeyword));
                }
                optionalOrConditions.add(criteriaBuilder.or(keywordOrGroup.toArray(new Predicate[0])));
            }

            jakarta.persistence.criteria.Path<String> categoryNamePath = root.join("categories", JoinType.LEFT).get("nameCategory");

            if (filters.categories() != null && !filters.categories().isEmpty()) {
                List<String> lowerCaseCategories = filters.categories().stream().map(String::toLowerCase).toList();
                optionalOrConditions.add(criteriaBuilder.lower(categoryNamePath).in(lowerCaseCategories));
            }

            if (filters.priceMin() != null) {
                optionalOrConditions.add(criteriaBuilder.greaterThanOrEqualTo(root.get("price"), filters.priceMin()));
            }

            Predicate searchPredicate;

            if (optionalOrConditions.isEmpty()) {
                searchPredicate = criteriaBuilder.conjunction();
            } else {
                searchPredicate = criteriaBuilder.or(optionalOrConditions.toArray(new Predicate[0]));
            }

            List<Order> orderList = new ArrayList<>();
            orderList.add(criteriaBuilder.asc(categoryNamePath));
            orderList.add(criteriaBuilder.asc(root.get("price")));
            orderList.add(criteriaBuilder.asc(criteriaBuilder.lower(root.get("nameProduct"))));
            orderList.add(criteriaBuilder.asc(criteriaBuilder.lower(root.get("description"))));
            assert query != null;
            query.orderBy(orderList);

            if (filters.priceMax() != null) {
                Predicate finalMaxPriceFilter = criteriaBuilder.lessThanOrEqualTo(root.get("price"), filters.priceMax());
                return criteriaBuilder.and(searchPredicate, finalMaxPriceFilter);
            }

            return searchPredicate;

        };
    }


}
