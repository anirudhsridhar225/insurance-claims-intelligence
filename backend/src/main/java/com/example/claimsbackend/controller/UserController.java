package com.example.claimsbackend.controller;

import com.example.claimsbackend.dto.UserRequestDTO;
import com.example.claimsbackend.dto.UserResponseDTO;
import com.example.claimsbackend.dto.UserUpdateDTO;
import com.example.claimsbackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("")
    public ResponseEntity<List<UserResponseDTO>> getAllUsers() {
        return ResponseEntity.ok(userService.getUsers());
    }

    @PreAuthorize("hasRole('CUSTOMER')")
    @GetMapping("/me")
    public ResponseEntity<UserResponseDTO> getCurrentUser(Authentication authentication) {
        String name = authentication.getName();

        return ResponseEntity.ok(userService.getCurrentUser(name));
    }

    @PreAuthorize("hasRole('CUSTOMER')")
    @PutMapping("/me")
    public ResponseEntity<UserResponseDTO> updateCurrentUser(Authentication authentication, @RequestBody UserUpdateDTO updateRequest) {
        String name = authentication.getName();

        return ResponseEntity.ok(userService.updateCurrentUser(name, updateRequest));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/me")
    public ResponseEntity<?> deleteCurrentUser(Authentication authentication) {
        String name = authentication.getName();
        userService.deleteCurrentUser(name);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
    }
}
