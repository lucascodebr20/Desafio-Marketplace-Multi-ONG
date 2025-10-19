package com.backend.marktplace.dto.response.user;

public record userInfoDTO(
        String email,
        String password,
        String userRole,
        String name,
        String organizationName,
        String CNPJ) { }
