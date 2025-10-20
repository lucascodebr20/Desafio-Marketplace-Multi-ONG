package com.backend.marktplace.dto.request.auth;

public record RegisterUserAndOrganizationDTO(
        String email,
        String password,
        String userRole,
        String name,
        String organizationName,
        String CNPJ) { }
