package com.example.claimsbackend.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;
import java.util.Map;

public final class AnalyticsDtos {

    private AnalyticsDtos() {}

    // ── GET /analytics/top-agents ─────────────────────────────────────────

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record TopAgentsResponse(
            @JsonProperty("sort_by") String sortBy,
            @JsonProperty("total")   Integer total,
            @JsonProperty("agents")  List<AgentRecord> agents
    ) {}

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record AgentRecord(
            @JsonProperty("AGENT_ID")           String agentId,
            @JsonProperty("total_policies")     Integer totalPolicies,
            @JsonProperty("fraud_cases")        Integer fraudCases,
            @JsonProperty("avg_claim_amount")   Double avgClaimAmount,
            @JsonProperty("approval_rate")      Double approvalRate,
            @JsonProperty("complaints")         Integer complaints,
            @JsonProperty("years_experience")   Double yearsExperience,
            @JsonProperty("performance_score")  Double performanceScore,
            @JsonProperty("model_fraud_flags")  Integer modelFraudFlags
    ) {}

    // ── GET /analytics/fraud-flagged-claims ───────────────────────────────

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record FraudFlaggedClaimsResponse(
            @JsonProperty("total_flagged")    Integer totalFlagged,
            @JsonProperty("min_score_filter") Double minScoreFilter,
            @JsonProperty("label_filter")     String labelFilter,
            @JsonProperty("claims")           List<FlaggedClaimRecord> claims
    ) {}

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record FlaggedClaimRecord(
            @JsonProperty("TRANSACTION_ID")    String transactionId,
            @JsonProperty("POLICY_NUMBER")     String policyNumber,
            @JsonProperty("CUSTOMER_ID")       String customerId,
            @JsonProperty("CLAIM_AMOUNT")      Double claimAmount,
            @JsonProperty("INSURANCE_TYPE")    String insuranceType,
            @JsonProperty("INCIDENT_SEVERITY") String incidentSeverity,
            @JsonProperty("fraud_probability") Double fraudProbability,
            @JsonProperty("risk_score")        Double riskScore,
            @JsonProperty("risk_label")        String riskLabel,
            @JsonProperty("IS_FRAUD")          Integer isFraud,
            @JsonProperty("model_prediction")  Integer modelPrediction
    ) {}

    // ── GET /analytics/claims-trend ───────────────────────────────────────

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record ClaimsTrendResponse(
            @JsonProperty("group_by") String groupBy,
            @JsonProperty("periods")  Integer periods,
            @JsonProperty("trend")    List<TrendRecord> trend
    ) {}

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record TrendRecord(
            @JsonProperty("period")         String period,
            @JsonProperty("claim_count")    Integer claimCount,
            @JsonProperty("total_claims")   Double totalClaims,
            @JsonProperty("avg_claim")      Double avgClaim,
            @JsonProperty("total_premium")  Double totalPremium,
            @JsonProperty("fraud_count")    Integer fraudCount,
            @JsonProperty("fraud_rate_pct") Double fraudRatePct
    ) {}

    // ── GET /analytics/loss-ratio ─────────────────────────────────────────

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record LossRatioResponse(
            @JsonProperty("group_by")           String groupBy,
            @JsonProperty("overall_loss_ratio") Double overallLossRatio,
            @JsonProperty("breakdown")          List<LossRatioRecord> breakdown
    ) {}

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record LossRatioRecord(
            @JsonProperty("group")             String group,
            @JsonProperty("total_claims_paid") Double totalClaimsPaid,
            @JsonProperty("total_premiums")    Double totalPremiums,
            @JsonProperty("claim_count")       Integer claimCount,
            @JsonProperty("fraud_claims")      Integer fraudClaims,
            @JsonProperty("loss_ratio")        Double lossRatio,
            @JsonProperty("fraud_rate_pct")    Double fraudRatePct,
            @JsonProperty("avg_claim")         Double avgClaim
    ) {}

    // ── GET /analytics/renewal-rate ───────────────────────────────────────

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record RenewalRateResponse(
            @JsonProperty("overall_renewal_rate_pct") Double overallRenewalRatePct,
            @JsonProperty("note")                     String note,
            @JsonProperty("by_tenure_bucket")         List<Map<String, Object>> byTenureBucket,
            @JsonProperty("by_insurance_type")        List<Map<String, Object>> byInsuranceType
    ) {}
}