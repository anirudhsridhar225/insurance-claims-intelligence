package com.example.claimsbackend.exception;

public class FinancialsNotFoundException extends RuntimeException {
    public FinancialsNotFoundException(String message) {
        super(message);
    }
}
