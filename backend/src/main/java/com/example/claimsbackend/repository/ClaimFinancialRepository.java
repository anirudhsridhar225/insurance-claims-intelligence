package com.example.claimsbackend.repository;

import com.example.claimsbackend.model.ClaimFinancials;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ClaimFinancialRepository extends JpaRepository<ClaimFinancials, UUID> {
}
