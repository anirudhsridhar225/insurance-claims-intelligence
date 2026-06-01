package com.example.claimsbackend.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Map;

/**
 * Response from POST /predict and POST /predict/fraud/{claimId}.
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public record FraudPredictionResponse(

        @JsonProperty("is_fraud")
        Boolean isFraud,

        @JsonProperty("fraud_probability")
        Double fraudProbability,

        @JsonProperty("risk_score")
        Double riskScore,

        @JsonProperty("risk_status")
        String riskStatus,

        @JsonProperty("risk_label")
        String riskLabel,

        @JsonProperty("recommendation")
        String recommendation,

        @JsonProperty("model_version")
        String modelVersion,

        @JsonProperty("model_metrics")
        Map<String, Object> modelMetrics,

        // Extra fields only present in /predict/fraud/{claimId}
        @JsonProperty("claim_id")
        String claimId,

        @JsonProperty("policy_number")
        String policyNumber,

        @JsonProperty("customer_id")
        String customerId,

        @JsonProperty("claim_amount")
        Double claimAmount,

        @JsonProperty("insurance_type")
        String insuranceType,

        @JsonProperty("incident_severity")
        String incidentSeverity,

        @JsonProperty("actual_fraud_label")
        Integer actualFraudLabel,

        @JsonProperty("model_prediction")
        Integer modelPrediction
) {}