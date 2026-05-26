package com.example.claimsbackend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Entity
@NoArgsConstructor
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private @NotBlank String name;
    private @NotNull String passwordHash;
    private @NotNull String email;
    private @NotNull String phoneNumber;

    @Enumerated
    private @NotNull UserType userType;
}
