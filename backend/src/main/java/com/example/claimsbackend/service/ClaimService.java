package com.example.claimsbackend.service;

import com.example.claimsbackend.dto.ClaimFinancialResponseDTO;
import com.example.claimsbackend.dto.ClaimRequestDTO;
import com.example.claimsbackend.dto.ClaimResponseDTO;
import com.example.claimsbackend.mapper.ClaimMapper;
import com.example.claimsbackend.mapper.UserMapper;
import com.example.claimsbackend.model.Claim;
import com.example.claimsbackend.model.User;
import com.example.claimsbackend.repository.ClaimFinancialRepository;
import com.example.claimsbackend.repository.ClaimRepository;
import com.example.claimsbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClaimService {

    @Autowired
    private ClaimRepository claimRepository;

    @Autowired
    private ClaimFinancialRepository financialRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private ClaimMapper claimMapper;

    private ClaimResponseDTO addNewClaim(ClaimRequestDTO request) {
        Claim claim = claimMapper.mapToEntity(request);

        Claim savedClaim = claimRepository.save(claim);

        return claimMapper.mapToResponse(savedClaim);
    }

    private List<ClaimResponseDTO> getAllClaims() {
        return claimRepository.findAll().stream().map((claim) -> claimMapper.mapToResponse(claim)).toList();
    }

}
