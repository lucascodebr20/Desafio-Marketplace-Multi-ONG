package com.backend.marktplace.controller.user;

import com.backend.marktplace.dto.response.user.UserInfoDTO;
import com.backend.marktplace.entity.UserEntity;
import com.backend.marktplace.mapper.UserInfoMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {

    @GetMapping()
    public ResponseEntity<UserInfoDTO> getUserInfo() {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        UserEntity user = (UserEntity) authentication.getPrincipal();
        UserInfoDTO userDto = UserInfoMapper.toUserInfoDTO(user);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(userDto);
    }

}
