package com.example.claimsbackend.client;

import com.example.claimsbackend.dto.*;
import com.example.claimsbackend.dto.AnalyticsDtos.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;
import org.springframework.web.util.UriComponentsBuilder;

/**
 * Low-level RestClient wrapper for the Insurance Fraud Detection Python API on EC2.
 * One method per endpoint — no business logic here.
 */
@Component
public class FraudDetectionClient {

    private final RestClient restClient;

    public FraudDetectionClient(RestClient fraudRestClient) {
        this.restClient = fraudRestClient;
    }

    // ── Health ────────────────────────────────────────────────────────────

    public FraudHealthResponse health() {
        return restClient.get()
                .uri("/")
                .retrieve()
                .body(FraudHealthResponse.class);
    }

    // ── Prediction ────────────────────────────────────────────────────────

    public FraudPredictionResponse predict(FraudClaimRequest request) {
        return restClient.post()
                .uri("/predict")
                .body(request)
                .retrieve()
                .body(FraudPredictionResponse.class);
    }

    public FraudPredictionResponse predictByClaimId(String claimId) {
        return restClient.post()
                .uri("/predict/fraud/{claimId}", claimId)
                .retrieve()
                .body(FraudPredictionResponse.class);
    }

    // ── Analytics ─────────────────────────────────────────────────────────

    public TopAgentsResponse topAgents(int limit, String sortBy) {
        String uri = UriComponentsBuilder.fromPath("/analytics/top-agents")
                .queryParam("limit", limit)
                .queryParam("sort_by", sortBy)
                .toUriString();
        return restClient.get().uri(uri).retrieve().body(TopAgentsResponse.class);
    }

    public FraudFlaggedClaimsResponse fraudFlaggedClaims(int limit, double minScore, String label) {
        UriComponentsBuilder builder = UriComponentsBuilder.fromPath("/analytics/fraud-flagged-claims")
                .queryParam("limit", limit)
                .queryParam("min_score", minScore);
        if (label != null) builder.queryParam("label", label);
        return restClient.get().uri(builder.toUriString()).retrieve().body(FraudFlaggedClaimsResponse.class);
    }

    public ClaimsTrendResponse claimsTrend(String groupBy) {
        return restClient.get()
                .uri("/analytics/claims-trend?group_by={g}", groupBy)
                .retrieve()
                .body(ClaimsTrendResponse.class);
    }

    public LossRatioResponse lossRatio(String groupBy) {
        return restClient.get()
                .uri("/analytics/loss-ratio?group_by={g}", groupBy)
                .retrieve()
                .body(LossRatioResponse.class);
    }

    public RenewalRateResponse renewalRate() {
        return restClient.get()
                .uri("/analytics/renewal-rate")
                .retrieve()
                .body(RenewalRateResponse.class);
    }
}