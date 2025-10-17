package com.backend.marktplace.dto.request.auth;

public record LoginDTO (
        String email,
        String password ) { }
