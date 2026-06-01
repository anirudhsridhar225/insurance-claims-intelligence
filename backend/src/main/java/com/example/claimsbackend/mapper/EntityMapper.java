package com.example.claimsbackend.mapper;
import org.springframework.stereotype.Component;

@Component
public interface EntityMapper<ENTITY, REQUESTDTO, RESPONSEDTO> {
    public ENTITY mapToEntity(REQUESTDTO requestdto);
    public RESPONSEDTO mapToResponse(ENTITY entity);
}
