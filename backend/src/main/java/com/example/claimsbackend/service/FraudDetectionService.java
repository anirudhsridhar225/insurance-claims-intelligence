package com.example.claimsbackend.service;

import com.example.claimsbackend.client.FraudDetectionClient;
import com.example.claimsbackend.dto.*;
import com.example.claimsbackend.dto.AnalyticsDtos.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestClientException;

/**
 * Service layer for the Fraud Detection API integration.
 * Handles logging, error translation, and is the seam for future
 * caching / retry / circuit-breaker logic.
 */
@Service
public class FraudDetectionService {

    private static final Logger log = LoggerFactory.getLogger(FraudDetectionService.class);

    private final FraudDetectionClient client;

    public FraudDetectionService(FraudDetectionClient client) {
        this.client = client;
    }

    // ── Health ────────────────────────────────────────────────────────────

    public FraudHealthResponse getHealth() {
        log.debug("Fetching fraud API health");
        return client.health();
    }

    // ── Prediction ────────────────────────────────────────────────────────

    public FraudPredictionResponse scoreClaim(FraudClaimRequest request) {
        log.info("Scoring ad-hoc claim: type={}, amount={}", request.claimType(), request.claimAmount());
        try {
            FraudPredictionResponse response = client.predict(request);
            log.info("Score result: label={}, probability={}", response.riskLabel(), response.fraudProbability());
            return response;
        } catch (HttpClientErrorException e) {
            log.error("Fraud API client error {}: {}", e.getStatusCode(), e.getMessage());
            throw e;
        } catch (RestClientException e) {
            log.error("Failed to reach fraud API on EC2", e);
            throw e;
        }
    }

    public FraudPredictionResponse scoreExistingClaim(String claimId) {
        log.info("Scoring existing claim by ID: {}", claimId);
        try {
            return client.predictByClaimId(claimId);
        } catch (HttpClientErrorException.NotFound e) {
            log.warn("Claim not found in fraud API dataset: {}", claimId);
            throw e;
        }
    }

    // ── Analytics ─────────────────────────────────────────────────────────

    public TopAgentsResponse getTopAgents(int limit, String sortBy) {
        log.debug("Fetching top {} agents sorted by {}", limit, sortBy);
        return client.topAgents(limit, sortBy);
    }

    public FraudFlaggedClaimsResponse getFraudFlaggedClaims(int limit, double minScore, String label) {
        log.debug("Fetching fraud-flagged claims: limit={}, minScore={}, label={}", limit, minScore, label);
        return client.fraudFlaggedClaims(limit, minScore, label);
    }

    public ClaimsTrendResponse getClaimsTrend(String groupBy) {
        log.debug("Fetching claims trend grouped by {}", groupBy);
        return client.claimsTrend(groupBy);
    }

    public LossRatioResponse getLossRatio(String groupBy) {
        log.debug("Fetching loss ratio grouped by {}", groupBy);
        return client.lossRatio(groupBy);
    }

    public RenewalRateResponse getRenewalRate() {
        log.debug("Fetching renewal rate");
        return client.renewalRate();
    }
}