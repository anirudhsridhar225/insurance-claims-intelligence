package com.example.claimsbackend.service;

import com.example.claimsbackend.dto.UserRequestDTO;
import com.example.claimsbackend.dto.UserResponseDTO;
import com.example.claimsbackend.exception.InvalidPhoneNumberException;
import com.example.claimsbackend.mapper.UserMapper;
import com.example.claimsbackend.model.User;
import com.example.claimsbackend.repository.UserRepository;
import com.example.claimsbackend.validation.PhoneNumberValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private UserMapper mapper;

    public UserResponseDTO register(UserRequestDTO request) {
        if (request.getPhoneNumber() == null || !PhoneNumberValidator.isValidPhoneNumber(request.getPhoneNumber())) {
            throw new InvalidPhoneNumberException("invalid phone number entered, please try again");
        }

        User user = mapper.mapToEntity(request);
        String hashedPassword = encoder.encode(request.getPassword());
        user.setPasswordHash(hashedPassword);

        User savedUser = userRepository.save(user);

        return mapper.mapToResponse(savedUser);
    }

}
