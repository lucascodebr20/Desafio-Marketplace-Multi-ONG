package com.backend.marktplace.util.gemini;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.math.BigDecimal;
import java.util.List;

public record GeminiFilterDTO(
        @JsonProperty("keywords") List<String> keywords,
        @JsonProperty("category") List<String> categories,
        @JsonProperty("price_max") BigDecimal priceMax,
        @JsonProperty("price_min") BigDecimal priceMin
) {}