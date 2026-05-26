package com.example.claimsbackend.dto;

import com.example.claimsbackend.model.UserType;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserRequestDTO {
    private @NotNull String name;
    private @NotNull String password;
    private @NotNull @Email String email;
    private @NotNull String phoneNumber;
    private @NotNull UserType userType;
}
