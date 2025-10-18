package com.backend.marktplace.dto.request.company;

public record RegisterOrganizationDTO(
    String nameOrganization,
    String CNPJ) { }
