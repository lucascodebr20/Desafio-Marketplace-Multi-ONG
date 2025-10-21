package com.backend.marktplace.dto.request.search;

public record SearchDTO(
        Boolean iaSearch,
        String text,
        Integer page,
        Integer size ) {}