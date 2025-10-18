package com.backend.marktplace.dto.request.auth;

public record RegisterDTO (
        String email,
        String password,
        String userRole,
        String name) { }
