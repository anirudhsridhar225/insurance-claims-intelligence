package com.example.claimsbackend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "financials")
public class ClaimFinancials {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal billedAmount;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal negotiatedAmount;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal approvedAmount;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal deductible;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal copay;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal outOfPocketAmount;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal reserveEstimate;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal settlementAmount;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PaymentStatus status;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "claim_id", nullable = false, unique = true)
    private Claim claim;
}