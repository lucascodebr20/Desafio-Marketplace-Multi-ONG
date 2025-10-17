package com.backend.marktplace.service.auth;

import com.backend.marktplace.dto.request.auth.LoginDTO;
import com.backend.marktplace.entity.UserEntity;
import com.backend.marktplace.infra.security.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;

@Service
public class LoginUserService {

    @Autowired
    TokenService tokenService;

    @Autowired
    private AuthenticationManager authenticationManager;

    public String loginUser(LoginDTO loginDTO) throws AuthenticationException {
        try {
            var usernamePassword = new UsernamePasswordAuthenticationToken(loginDTO.email(), loginDTO.password());
            var auth = this.authenticationManager.authenticate(usernamePassword);
            return tokenService.generateToken((UserEntity) auth.getPrincipal());
        } catch (AuthenticationException e) {
            throw e;
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Unexpected error during login process.", e);
        }
    }

}
