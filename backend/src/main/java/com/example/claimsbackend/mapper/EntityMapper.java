package com.example.claimsbackend.mapper;

public interface EntityMapper<ENTITY, REQUESTDTO, RESPONSEDTO> {
    public ENTITY mapToEntity(REQUESTDTO requestdto);
    public RESPONSEDTO mapToResponse(ENTITY entity);
}
