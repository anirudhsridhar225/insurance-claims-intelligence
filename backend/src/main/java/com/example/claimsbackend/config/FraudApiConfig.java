package com.example.claimsbackend.config;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;

@Configuration
@EnableConfigurationProperties(FraudApiProperties.class)
public class FraudApiConfig {

    @Bean
    public RestClient fraudRestClient(FraudApiProperties properties) {
        return RestClient.builder()
                .baseUrl(properties.baseUrl())
                .defaultHeader("Content-Type", "application/json")
                .defaultHeader("Accept", "application/json")
                .build();
    }
}