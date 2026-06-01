package com.example.claimsbackend.controller;

import com.example.claimsbackend.dto.*;
import com.example.claimsbackend.dto.AnalyticsDtos.*;
import com.example.claimsbackend.service.FraudDetectionService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Exposes the Fraud Detection API endpoints under /api/fraud/**
 * Sits alongside your existing AuthController and UserController.
 */
@RestController
@RequestMapping("/api/fraud")
public class FraudDetectionController {

    private final FraudDetectionService service;

    public FraudDetectionController(FraudDetectionService service) {
        this.service = service;
    }

    // ── Health ────────────────────────────────────────────────────────────

    /** GET /api/fraud/health */
    // @GetMapping("/health")
    // public ResponseEntity<FraudHealthResponse> health() {
    //     return ResponseEntity.ok(service.getHealth());
    // }

    // ── Prediction ────────────────────────────────────────────────────────

    /**
     * POST /api/fraud/predict
     * Score an ad-hoc claim payload.
     *
     * Required body fields: claim_amount, days_since_policy, claim_type, customer_age
     */
    @PostMapping("/predict")
    public ResponseEntity<FraudPredictionResponse> predict(@Valid @RequestBody FraudClaimRequest request) {
        return ResponseEntity.ok(service.scoreClaim(request));
    }

    /**
     * POST /api/fraud/predict/{claimId}
     * Score a claim that already exists in the EC2 dataset.
     * Example: POST /api/fraud/predict/TXN0000042
     */
    @PostMapping("/predict/{claimId}")
    public ResponseEntity<FraudPredictionResponse> predictByClaimId(@PathVariable String claimId) {
        return ResponseEntity.ok(service.scoreExistingClaim(claimId));
    }

    // ── Analytics ─────────────────────────────────────────────────────────

    /**
     * GET /api/fraud/analytics/top-agents
     * @param limit  agents to return (default 10, max 100)
     * @param sortBy performance_score | approval_rate | total_policies
     */
    @GetMapping("/analytics/top-agents")
    public ResponseEntity<TopAgentsResponse> topAgents(
            @RequestParam(defaultValue = "10") int limit,
            @RequestParam(name = "sort_by", defaultValue = "performance_score") String sortBy
    ) {
        return ResponseEntity.ok(service.getTopAgents(limit, sortBy));
    }

    /**
     * GET /api/fraud/analytics/fraud-flagged-claims
     * @param limit    max results (default 20)
     * @param minScore minimum risk score 0–100 (default 60.0)
     * @param label    optional filter: Low | Medium | High | Critical
     */
    @GetMapping("/analytics/fraud-flagged-claims")
    public ResponseEntity<FraudFlaggedClaimsResponse> fraudFlaggedClaims(
            @RequestParam(defaultValue = "20") int limit,
            @RequestParam(name = "min_score", defaultValue = "60.0") double minScore,
            @RequestParam(required = false) String label
    ) {
        return ResponseEntity.ok(service.getFraudFlaggedClaims(limit, minScore, label));
    }

    /**
     * GET /api/fraud/analytics/claims-trend
     * @param groupBy month | quarter | year (default month)
     */
    @GetMapping("/analytics/claims-trend")
    public ResponseEntity<ClaimsTrendResponse> claimsTrend(
            @RequestParam(name = "group_by", defaultValue = "month") String groupBy
    ) {
        return ResponseEntity.ok(service.getClaimsTrend(groupBy));
    }

    /**
     * GET /api/fraud/analytics/loss-ratio
     * @param groupBy insurance_type | state | risk_segmentation (default insurance_type)
     */
    @GetMapping("/analytics/loss-ratio")
    public ResponseEntity<LossRatioResponse> lossRatio(
            @RequestParam(name = "group_by", defaultValue = "insurance_type") String groupBy
    ) {
        return ResponseEntity.ok(service.getLossRatio(groupBy));
    }

    /**
     * GET /api/fraud/analytics/renewal-rate
     * Renewal rate by customer tenure bucket.
     */
    @GetMapping("/analytics/renewal-rate")
    public ResponseEntity<RenewalRateResponse> renewalRate() {
        return ResponseEntity.ok(service.getRenewalRate());
    }
}