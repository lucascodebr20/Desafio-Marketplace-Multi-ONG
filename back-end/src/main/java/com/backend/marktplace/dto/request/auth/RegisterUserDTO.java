package com.backend.marktplace.dto.request.auth;

public record RegisterUserDTO(
        String email,
        String password,
        String userRole,
        String name) { }
