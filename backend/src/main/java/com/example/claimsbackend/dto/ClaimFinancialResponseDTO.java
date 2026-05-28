package com.example.claimsbackend.dto;

import java.math.BigDecimal;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import com.example.claimsbackend.model.PaymentStatus;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClaimFinancialResponseDTO {
    private UUID id;
    private BigDecimal billedAmount;
    private BigDecimal negotiatedAmount;
    private BigDecimal approvedAmount;
    private BigDecimal deductible;
    private BigDecimal copay;
    private BigDecimal outOfPocketAmount;
    private BigDecimal reserveEstimate;
    private BigDecimal settlementAmount;
    private PaymentStatus status;
}
