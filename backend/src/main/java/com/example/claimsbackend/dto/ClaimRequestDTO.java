package com.example.claimsbackend.dto;

import com.example.claimsbackend.model.ClaimStatus;

import jakarta.validation.constraints.NotNull;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClaimRequestDTO {
    private @NotNull String title;
    private @NotNull String description;
    private @NotNull ClaimStatus status;
    private @NotNull UUID customerId;
    private @NotNull UUID financialsId;
}
