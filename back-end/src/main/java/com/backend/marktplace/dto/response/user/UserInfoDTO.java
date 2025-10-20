package com.backend.marktplace.dto.response.user;

public record UserInfoDTO(
        String email,
        String userRole,
        String name,
        String organizationName,
        String CNPJ) { }
