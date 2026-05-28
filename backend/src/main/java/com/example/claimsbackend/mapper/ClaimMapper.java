package com.example.claimsbackend.mapper;

import com.example.claimsbackend.model.Claim;
import com.example.claimsbackend.dto.ClaimRequestDTO;
import com.example.claimsbackend.dto.ClaimResponseDTO;

public class ClaimMapper implements EntityMapper<Claim, ClaimRequestDTO, ClaimResponseDTO> {
    public Claim mapToEntity(ClaimRequestDTO request) {
        Claim claim = new Claim();
        claim.setTitle(request.getTitle());

        return claim;
    }

    public ClaimResponseDTO mapToResponse(Claim entity) {
        return new ClaimResponseDTO();
    }
}
