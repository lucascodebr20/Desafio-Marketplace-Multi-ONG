package com.backend.marktplace.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "tb_category")
public class CategoryEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long categoryId;

    private String nameCategory;

    @ManyToMany(mappedBy = "categories")
    private List<ProductEntity> products;

    public Long getCategoryId() {
        return categoryId;
    }

    public String getNameCategory() {
        return nameCategory;
    }

    public void setNameCategory(String nameCategory) {
        this.nameCategory = nameCategory;
    }

    public List<ProductEntity> getProducts() {
        return products;
    }

    public void setProducts(List<ProductEntity> products) {
        this.products = products;
    }

}
