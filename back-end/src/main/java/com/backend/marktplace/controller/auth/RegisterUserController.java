package com.backend.marktplace.controller.auth;

import com.backend.marktplace.dto.request.auth.RegisterUserDTO;
import com.backend.marktplace.service.auth.RegisterUserService;
import io.github.resilience4j.ratelimiter.annotation.RateLimiter;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class RegisterUserController {

    @Autowired
    RegisterUserService registerUserService;

    @RateLimiter(name = "authRateLimiter", fallbackMethod = "registerUserFallback")
    @PostMapping("/register-user")
    public ResponseEntity<String> registerUser (@RequestBody RegisterUserDTO registerUserDTO, HttpServletResponse response) {

        try {
            String token = registerUserService.registerUser(registerUserDTO);
            Cookie cookie = new Cookie("JWT_TOKEN", token);
            cookie.setHttpOnly(true);
            cookie.setSecure(true);
            cookie.setMaxAge(30 * 24 * 60 * 60);
            cookie.setPath("/");
            response.addCookie(cookie);
            return ResponseEntity.status(HttpStatus.CREATED).build();

        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (RuntimeException e) {
            if (e.getMessage().contains("e-mail já cadastrado")) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
            }
            e.printStackTrace();
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro interno no servidor.");
        }
    }

    private ResponseEntity<String> registerUserFallback(RegisterUserDTO registerUserDTO, HttpServletResponse response, Throwable t) {
        return ResponseEntity
                .status(HttpStatus.TOO_MANY_REQUESTS)
                .build();
    }





}
