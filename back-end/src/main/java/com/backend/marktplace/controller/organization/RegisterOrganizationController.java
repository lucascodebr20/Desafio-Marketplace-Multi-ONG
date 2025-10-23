package com.backend.marktplace.controller.organization;

import com.backend.marktplace.dto.request.company.RegisterOrganizationDTO;
import com.backend.marktplace.entity.UserEntity;
import com.backend.marktplace.service.organization.RegisterOrganizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/organization")
public class RegisterOrganizationController {

    @Autowired
    RegisterOrganizationService registerOrganizationService;

    /*

    @PostMapping("/register")
    public ResponseEntity<HttpStatus> registerOrganization (
            @RequestBody RegisterOrganizationDTO registerOrganizationDTO){
        try {
            var authentication = SecurityContextHolder.getContext().getAuthentication();
            UserEntity user = (UserEntity) authentication.getPrincipal();
            registerOrganizationService.registerOrganization(registerOrganizationDTO, user);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    */

}
