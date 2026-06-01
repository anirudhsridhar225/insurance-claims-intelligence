package com.example.claimsbackend.dto;

import java.math.BigDecimal;

import com.example.claimsbackend.model.PaymentStatus;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClaimFinancialRequestDTO {
    private @NotNull BigDecimal billedAmount;
    private @NotNull BigDecimal negotiatedAmount;
    private @NotNull BigDecimal approvedAmount;
    private @NotNull BigDecimal deductible;
    private @NotNull BigDecimal copay;
    private @NotNull BigDecimal outOfPocketAmount;
    private @NotNull BigDecimal reserveEstimate;
    private @NotNull BigDecimal settlementAmount;
    private @NotNull PaymentStatus status;
}
