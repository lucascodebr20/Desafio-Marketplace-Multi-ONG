package com.backend.marktplace.entity;

import jakarta.persistence.*;

import java.time.OffsetDateTime;

@Entity
@Table(name = "reg_search_log")
public class SearchLogEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column(name = "search_input", nullable = false, columnDefinition = "TEXT")
    private String searchInput;

    @Column(name = "generated_filters", columnDefinition = "TEXT")
    private String generatedFilters;

    @Column(name = "is_success", nullable = false)
    private boolean isSuccess;

    @Column(name = "was_fallback_applied", nullable = false)
    private boolean wasFallbackApplied;

    @Column(name = "item_count", nullable = false)
    private int itemCount;

    @Column(name = "created_at", nullable = false)
    private OffsetDateTime createdAt;

    @PrePersist
    public void onPrePersist() {
        createdAt = OffsetDateTime.now();
    }

    public SearchLogEntity() {}

    public String getSearchInput() {
        return searchInput;
    }

    public void setSearchInput(String searchInput) {
        this.searchInput = searchInput;
    }

    public String getGeneratedFilters() {
        return generatedFilters;
    }

    public void setGeneratedFilters(String generatedFilters) {
        this.generatedFilters = generatedFilters;
    }

    public boolean isSuccess() {
        return isSuccess;
    }

    public void setSuccess(boolean success) {
        isSuccess = success;
    }

    public boolean isWasFallbackApplied() {
        return wasFallbackApplied;
    }

    public void setWasFallbackApplied(boolean wasFallbackApplied) {
        this.wasFallbackApplied = wasFallbackApplied;
    }

    public int getItemCount() {
        return itemCount;
    }

    public void setItemCount(int itemCount) {
        this.itemCount = itemCount;
    }

    public OffsetDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(OffsetDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

}
