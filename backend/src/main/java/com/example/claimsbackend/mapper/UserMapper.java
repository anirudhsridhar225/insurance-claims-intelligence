package com.example.claimsbackend.mapper;

import com.example.claimsbackend.dto.UserRequestDTO;
import com.example.claimsbackend.dto.UserResponseDTO;
import com.example.claimsbackend.model.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper implements EntityMapper<User, UserRequestDTO, UserResponseDTO> {
    @Override
    public User mapToEntity(UserRequestDTO request) {
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setUserType(request.getUserType());

        return user;
    }

    @Override
    public UserResponseDTO mapToResponse(User user) {
        return new UserResponseDTO(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getPhoneNumber(),
                user.getUserType());
    }
}
