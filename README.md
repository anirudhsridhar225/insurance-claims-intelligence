# Insurance Fraud Detection — Spring Boot Integration

## Structure

```
com.insurance.fraud
├── config
│   ├── FraudApiConfig.java        # Defines the RestClient bean
│   └── FraudApiProperties.java    # Binds fraud.api.base-url from application.yml
├── client
│   └── FraudDetectionClient.java  # Thin HTTP layer — one method per endpoint
├── service
│   └── FraudDetectionService.java # Business logic, logging, error translation
├── controller
│   └── FraudDetectionController.java  # Exposes /api/fraud/** to your consumers
└── dto
    ├── ClaimRequest.java           # POST /predict body
    ├── FraudPredictionResponse.java # /predict + /predict/fraud/{id} response
    ├── HealthResponse.java          # GET / response
    └── AnalyticsDtos.java           # All five analytics response records
```

## Setup

### 1. Add the property to your application.yml

```yaml
fraud:
  api:
    base-url: http://<EC2_IP>:8000
```

### 2. Enable config properties scan (if not already)

Make sure your `@SpringBootApplication` class (or a `@Configuration`) scans
`com.insurance.fraud.config`, or add:

```java
@EnableConfigurationProperties(FraudApiProperties.class)
```

Spring Boot auto-detects `@ConfigurationProperties` records since 2.7 as long as
`spring-boot-configuration-processor` is on the classpath.

### 3. Required dependencies (pom.xml / build.gradle)

```xml
<!-- Spring Web (includes RestClient, available since Spring 6.1 / Boot 3.2) -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>

<!-- Bean validation for @Valid on ClaimRequest -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>
```

### 4. Call from your own code

```java
@Autowired
FraudDetectionService fraudService;

// Score a new claim
ClaimRequest req = ClaimRequest.of(15000.0, 45, "Auto", 34);
FraudPredictionResponse result = fraudService.scoreClaim(req);
System.out.println(result.riskLabel());  // "High", "Critical", etc.

// Look up an existing CSV claim
FraudPredictionResponse existing = fraudService.scoreExistingClaim("TXN0000042");

// Analytics
TopAgentsResponse agents = fraudService.getTopAgents(10, "performance_score");
LossRatioResponse lr      = fraudService.getLossRatio("insurance_type");
```

## Exposed Endpoints (via FraudDetectionController)

| Method | Path | Description |
|--------|------|-------------|
| GET  | /api/fraud/health | Proxy health check |
| POST | /api/fraud/predict | Score ad-hoc claim |
| POST | /api/fraud/predict/{claimId} | Score existing CSV claim |
| GET  | /api/fraud/analytics/top-agents | Top agents |
| GET  | /api/fraud/analytics/fraud-flagged-claims | Flagged claims |
| GET  | /api/fraud/analytics/claims-trend | Monthly/quarterly trend |
| GET  | /api/fraud/analytics/loss-ratio | Loss ratio breakdown |
| GET  | /api/fraud/analytics/renewal-rate | Renewal rate by tenure |

## Error Handling

`RestClient` throws `HttpClientErrorException` (4xx) and `HttpServerErrorException` (5xx).
Add a `@RestControllerAdvice` to map these to your API's error format, for example:

```java
@ExceptionHandler(HttpClientErrorException.NotFound.class)
public ResponseEntity<ErrorResponse> handleNotFound(HttpClientErrorException.NotFound ex) {
    return ResponseEntity.status(404).body(new ErrorResponse("Claim not found"));
}
```