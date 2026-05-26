package com.example.claimsbackend.service;

import com.example.claimsbackend.dto.UserRequestDTO;
import com.example.claimsbackend.dto.UserResponseDTO;
import com.example.claimsbackend.exception.InvalidPasswordException;
import com.example.claimsbackend.exception.InvalidPhoneNumberException;
import com.example.claimsbackend.model.User;
import com.example.claimsbackend.repository.UserRepository;
import com.example.claimsbackend.validation.PasswordValidator;
import com.example.claimsbackend.validation.PhoneNumberValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder encoder;

    private static User mapToEntity(UserRequestDTO request, String hashedPassword) {
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setUserType(request.getUserType());
        user.setPasswordHash(hashedPassword);

        return user;
    }

    private static UserResponseDTO mapToDTO(User user) {
        return new UserResponseDTO(user.getId(), user.getName(), user.getEmail(), user.getPhoneNumber(), user.getUserType());
    }

    public List<UserResponseDTO> getUsers() {
        return userRepository.findAll().stream().map(UserService::mapToDTO).toList();
    }

    public UserResponseDTO addUser(UserRequestDTO request) {
        if (!PhoneNumberValidator.isValidPhoneNumber(request.getPhoneNumber())) {
            throw new InvalidPhoneNumberException("malformed phone number");
        }

        if (!PasswordValidator.isValidPassword(request.getPassword())) {
            throw new InvalidPasswordException("entered password not safe enough, please try again");
        }

        String hashedPassword = encoder.encode(request.getPassword());
        User user = mapToEntity(request, hashedPassword);

        User savedUser = userRepository.save(user);

        return mapToDTO(savedUser);
    }
}