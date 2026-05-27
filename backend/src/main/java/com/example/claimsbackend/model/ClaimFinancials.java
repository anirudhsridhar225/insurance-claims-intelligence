package com.example.claimsbackend.model;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.util.UUID;

@Entity
public class ClaimFinancials {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private BigDecimal billedAmount;
    private BigDecimal negotiatedAmount;
    private BigDecimal approvedAmount;
    private BigDecimal deductible;
    private BigDecimal copay;
    private BigDecimal outOfPocketAmount;
    private BigDecimal reserveEstimate;
    private BigDecimal settlementAmount;

    @Enumerated(EnumType.STRING)
    private PaymentStatus status;

}
