package com.example.claimsbackend.mapper;

import com.example.claimsbackend.dto.ClaimFinancialRequestDTO;
import com.example.claimsbackend.dto.ClaimFinancialResponseDTO;
import com.example.claimsbackend.model.ClaimFinancials;

public class ClaimFinancialsMapper implements EntityMapper<ClaimFinancials, ClaimFinancialRequestDTO, ClaimFinancialResponseDTO> {
    @Override
    public ClaimFinancials mapToEntity(ClaimFinancialRequestDTO requestDTO) {
        ClaimFinancials financials = new ClaimFinancials();
        financials.setBilledAmount(requestDTO.getBilledAmount());
        financials.setNegotiatedAmount(requestDTO.getNegotiatedAmount());
        financials.setApprovedAmount(requestDTO.getApprovedAmount());
        financials.setDeductible(requestDTO.getDeductible());
        financials.setCopay(requestDTO.getCopay());
        financials.setOutOfPocketAmount(requestDTO.getOutOfPocketAmount());
        financials.setReserveEstimate(requestDTO.getReserveEstimate());
        financials.setSettlementAmount(requestDTO.getSettlementAmount());
        financials.setStatus(requestDTO.getStatus());

        return financials;
    }

    @Override
    public ClaimFinancialResponseDTO mapToResponse(ClaimFinancials financials) {
        return new ClaimFinancialResponseDTO(
                financials.getId(),
                financials.getBilledAmount(),
                financials.getNegotiatedAmount(),
                financials.getApprovedAmount(),
                financials.getDeductible(),
                financials.getCopay(),
                financials.getOutOfPocketAmount(),
                financials.getReserveEstimate(),
                financials.getSettlementAmount(),
                financials.getStatus()
        );
    }
}
