package com.example.claimsbackend.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.*;

/**
 * Request body for POST /predict on the Fraud Detection API.
 * Named FraudClaimRequest to avoid collision with your existing ClaimRequestDTO.
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public record FraudClaimRequest(

        @JsonProperty("claim_amount")
        @NotNull @Positive
        Double claimAmount,

        @JsonProperty("days_since_policy")
        @NotNull @PositiveOrZero
        Integer daysSincePolicy,

        @JsonProperty("previous_claims")
        @PositiveOrZero
        Integer previousClaims,

        @JsonProperty("claim_type")
        @NotBlank
        String claimType,           // Auto | Health | Home | Life | Travel

        @JsonProperty("customer_age")
        @NotNull @Min(18) @Max(100)
        Integer customerAge,

        @JsonProperty("premium_amount")
        Double premiumAmount,

        @JsonProperty("incident_severity")
        String incidentSeverity,

        @JsonProperty("incident_hour")
        @Min(0) @Max(23)
        Integer incidentHour,

        @JsonProperty("authority_contacted")
        String authorityContacted,

        @JsonProperty("any_injury")
        @Min(0) @Max(1)
        Integer anyInjury,

        @JsonProperty("police_report_available")
        @Min(0) @Max(1)
        Integer policeReportAvailable,

        @JsonProperty("incident_state")
        String incidentState,

        @JsonProperty("state")
        String state,

        @JsonProperty("marital_status")
        String maritalStatus,

        @JsonProperty("employment_status")
        String employmentStatus,

        @JsonProperty("no_of_family_members")
        @Min(1)
        Integer noOfFamilyMembers,

        @JsonProperty("house_type")
        String houseType,

        @JsonProperty("social_class")
        String socialClass,

        @JsonProperty("education_level")
        String educationLevel,

        @JsonProperty("tenure")
        Integer tenure,

        @JsonProperty("risk_segmentation")
        String riskSegmentation,

        @JsonProperty("claim_status")
        String claimStatus
) {
    /** Convenience factory for required fields only. */
    public static FraudClaimRequest of(Double claimAmount, Integer daysSincePolicy,
                                       String claimType, Integer customerAge) {
        return new FraudClaimRequest(claimAmount, daysSincePolicy, 0, claimType,
                customerAge, null, null, null, null, null, null,
                null, null, null, null, null, null, null, null, null, null, null);
    }
}