package com.example.claimsbackend.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;
import java.util.Map;

@JsonIgnoreProperties(ignoreUnknown = true)
public record FraudHealthResponse(
        @JsonProperty("status")         String status,
        @JsonProperty("model_loaded")   Boolean modelLoaded,
        @JsonProperty("csvs_loaded")    List<String> csvsLoaded,
        @JsonProperty("model_metrics")  Map<String, Object> modelMetrics
) {}