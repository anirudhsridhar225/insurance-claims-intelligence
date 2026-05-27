package com.example.claimsbackend.service;

import com.example.claimsbackend.dto.UserRequestDTO;
import com.example.claimsbackend.dto.UserResponseDTO;
import com.example.claimsbackend.dto.UserUpdateDTO;
import com.example.claimsbackend.exception.InvalidPasswordException;
import com.example.claimsbackend.exception.InvalidPhoneNumberException;
import com.example.claimsbackend.mapper.UserMapper;
import com.example.claimsbackend.model.User;
import com.example.claimsbackend.repository.UserRepository;
import com.example.claimsbackend.validation.PasswordValidator;
import com.example.claimsbackend.validation.PhoneNumberValidator;
import org.hibernate.service.UnknownServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private UserMapper userMapper;

    public List<UserResponseDTO> getUsers() {
        return userRepository.findAll().stream().map(user -> userMapper.mapToResponse(user)).toList();
    }

    public UserResponseDTO getCurrentUser(String name) {
        User user = userRepository.findByName(name).orElseThrow(() -> new UsernameNotFoundException("User with username " + name + " not found"));

        return userMapper.mapToResponse(user);
    }

    public UserResponseDTO updateCurrentUser(String name, UserUpdateDTO request) {
        User user = userRepository.findByName(name).orElseThrow(() -> new UsernameNotFoundException("User with username " + name + " not found"));

        user.setEmail(request.getEmail());
        user.setPhoneNumber(request.getPhoneNumber());

        User savedUser = userRepository.save(user);

        return userMapper.mapToResponse(savedUser);
    }

    public void deleteCurrentUser(String name) {
        User user = userRepository.findByName(name).orElseThrow(() -> new UsernameNotFoundException("User with username " + name + " not found"));

        userRepository.delete(user);
    }
}