package com.backend.marktplace.infra.security;

import com.backend.marktplace.repository.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.UUID;

@Component
public class SecurityFilter extends OncePerRequestFilter {

    @Autowired
    UserRepository userRepository;

    @Autowired
    TokenService tokenService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        var token = this.recoverToken(request);

        if (token != null) {
            var loginIdString = tokenService.validateToken(token);
            if (loginIdString != null && !loginIdString.isEmpty()) {
                try {
                    UUID userId = UUID.fromString(loginIdString);
                    UserDetails user = userRepository.findByUserId(userId);
                    var authentication = new UsernamePasswordAuthenticationToken(user,null,user.getAuthorities());
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                } catch (IllegalArgumentException e) {
                    System.err.println("Token contains an invalid user ID:"  + loginIdString);
                }
            }
        }

        filterChain.doFilter(request, response);
    }

    private String recoverToken(HttpServletRequest request) {
        if (request.getCookies() != null) {
            for (var cookie : request.getCookies()) {
                if (cookie.getName().equals("JWT_TOKEN")) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }

}
