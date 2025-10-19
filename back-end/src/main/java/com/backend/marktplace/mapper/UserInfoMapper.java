package com.backend.marktplace.mapper;

import com.backend.marktplace.dto.response.user.UserInfoDTO;
import com.backend.marktplace.entity.UserEntity;
import com.backend.marktplace.enums.UserRole;

public class UserInfoMapper {

    public static UserInfoDTO toUserInfoDTO (UserEntity userEntity) {
        if (userEntity.getUserRole() == UserRole.ONG && userEntity.getOrganization() != null) {
            return new UserInfoDTO(
                    userEntity.getEmail(),
                    userEntity.getUserRole().toString(),
                    userEntity.getName(),
                    userEntity.getOrganization().getOrganizationName(),
                    userEntity.getOrganization().getCNPJ()
            );
        } else {
            return new UserInfoDTO(
                    userEntity.getEmail(),
                    userEntity.getUserRole().toString(),
                    userEntity.getName(),
                    null,
                    null
            );
        }
    }


}
