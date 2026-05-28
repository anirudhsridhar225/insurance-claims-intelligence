package com.example.claimsbackend.dto;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClaimResponseDTO {
    private UUID id;
    private String title;
    private String description;
    private UserResponseDTO customer;
    private ClaimFinancialResponseDTO financials;
}
