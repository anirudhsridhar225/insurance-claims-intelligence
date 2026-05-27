package com.example.claimsbackend.model;

import jakarta.persistence.*;

import java.util.UUID;

@Entity
@Table(name = "claims")
public class Claim {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String title;
    private String description;

    @Enumerated(EnumType.STRING)
    private ClaimStatus status;

    @ManyToOne
    private User customer;

    @OneToOne(cascade = CascadeType.ALL)
    private ClaimFinancials financials;

}
