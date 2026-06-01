package com.example.claimsbackend.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "fraud.api")
public record FraudApiProperties(String baseUrl) {}