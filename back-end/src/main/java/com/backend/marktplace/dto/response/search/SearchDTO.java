package com.backend.marktplace.dto.response.search;

import java.time.OffsetDateTime;

public record SearchDTO (
        String searchInput,
        String generatedFilters,
        boolean isSuccess,
        boolean wasFallbackApplied,
        int itemCount,
        OffsetDateTime createdAt ){ }
