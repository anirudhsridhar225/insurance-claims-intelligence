package com.example.claimsbackend.mapper;

import com.example.claimsbackend.exception.FinancialsNotFoundException;
import com.example.claimsbackend.exception.UserNotFoundException;
import com.example.claimsbackend.model.Claim;
import com.example.claimsbackend.dto.ClaimRequestDTO;
import com.example.claimsbackend.dto.ClaimResponseDTO;
import com.example.claimsbackend.model.ClaimFinancials;
import com.example.claimsbackend.model.User;
import com.example.claimsbackend.repository.ClaimFinancialRepository;
import com.example.claimsbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class ClaimMapper implements EntityMapper<Claim, ClaimRequestDTO, ClaimResponseDTO> {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ClaimFinancialRepository financialRepository;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private ClaimFinancialsMapper financialsMapper;

    @Override
    public Claim mapToEntity(ClaimRequestDTO request) throws UserNotFoundException, FinancialsNotFoundException {
        User user = userRepository.findById(request.getCustomerId()).orElseThrow(() -> new UserNotFoundException("User with id '" + request.getCustomerId() + "' not found"));

        Claim claim = new Claim();
        claim.setTitle(request.getTitle());
        claim.setDescription(request.getDescription());
        claim.setCustomer(user);

        ClaimFinancials financials = financialsMapper.mapToEntity(request.getFinancialRequestDTO());

        financials.setClaim(claim);
        claim.setFinancials(financials);

        return claim;
    }

    @Override
    public ClaimResponseDTO mapToResponse(Claim entity) {
        return new ClaimResponseDTO(
                entity.getId(),
                entity.getTitle(),
                entity.getDescription(),
                userMapper.mapToResponse(entity.getCustomer()),
                financialsMapper.mapToResponse(entity.getFinancials())
        );
    }
}
