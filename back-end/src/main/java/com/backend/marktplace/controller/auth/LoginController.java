package com.backend.marktplace.controller.auth;

import com.backend.marktplace.dto.request.auth.LoginDTO;
import com.backend.marktplace.entity.UserEntity;
import com.backend.marktplace.infra.security.TokenService;
import com.backend.marktplace.service.auth.LoginUserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class LoginController {

    @Autowired
    LoginUserService loginUserService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Validated LoginDTO loginDTO,
                                   HttpServletResponse response) {
        try {
            String token = loginUserService.loginUser(loginDTO);
            Cookie cookie = new Cookie("JWT_TOKEN", token);
            cookie.setHttpOnly(true);
            cookie.setSecure(true);
            cookie.setMaxAge(30 * 24 * 60 * 60);
            cookie.setPath("/");
            response.addCookie(cookie);
            return ResponseEntity.status(HttpStatus.ACCEPTED).build();
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        } catch (RuntimeException e) {
            e.printStackTrace();
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro interno no servidor.");
        }
    }

}
