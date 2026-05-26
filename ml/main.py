"""
main.py  —  Insurance Fraud Detection API  v2.0
-------------------------------------------------
Start:  uvicorn main:app --reload

Routes
------
GET  /                              health check
GET  /model/info                    model metadata

Analytics
GET  /analytics/top-agents          top agents by performance score
GET  /analytics/fraud-flagged-claims claims the model flagged as fraud
GET  /analytics/claims-trend        monthly claim volume + avg amount
GET  /analytics/loss-ratio          loss ratio (claims/premiums) by insurance type
GET  /analytics/renewal-rate        proxy renewal rate by tenure bucket

Prediction
POST /predict                       score any ad-hoc JSON payload
POST /predict/fraud/{claimId}       score a claim that already exists in CSV
"""

from contextlib import asynccontextmanager
from functools import lru_cache
from typing import Optional
import os

import joblib
import numpy as np
import pandas as pd
from fastapi import FastAPI, HTTPException, Query
from pydantic import BaseModel, Field

# ─────────────────────────────────────────────────────────────────────────────
# Paths
# ─────────────────────────────────────────────────────────────────────────────
MODEL_PATH   = "model/fraud_model.pkl"
DATA_DIR     = "data"

CSV = {
    "claims":   os.path.join(DATA_DIR, "claims_history.csv"),
    "policy":   os.path.join(DATA_DIR, "policy_data.csv"),
    "customer": os.path.join(DATA_DIR, "customer_profiles.csv"),
    "agent":    os.path.join(DATA_DIR, "agent_performance.csv"),
}

_bundle: dict = {}   # model bundle loaded at startup
_dfs:    dict = {}   # CSV dataframes cached at startup


# ─────────────────────────────────────────────────────────────────────────────
# Lifespan  — load model + CSVs once
# ─────────────────────────────────────────────────────────────────────────────
@asynccontextmanager
async def lifespan(app: FastAPI):
    # model
    if not os.path.exists(MODEL_PATH):
        raise RuntimeError(f"Model not found at {MODEL_PATH}. Run train_and_save.py first.")
    bundle = joblib.load(MODEL_PATH)
    _bundle.update(bundle)
    print(f"✅  Model loaded  |  AUC: {bundle['metrics']['roc_auc']}")

    # CSVs
    for key, path in CSV.items():
        if os.path.exists(path):
            _dfs[key] = pd.read_csv(path)
            print(f"✅  {key:10s} CSV loaded  |  {len(_dfs[key])} rows")
        else:
            print(f"⚠️   {key} CSV not found at {path}")

    # pre-score all claims so /analytics endpoints are instant
    if "claims" in _dfs and "policy" in _dfs and "customer" in _dfs:
        _dfs["scored"] = _build_scored_master()
        print(f"✅  Scored master built  |  {len(_dfs['scored'])} rows")

    yield
    _bundle.clear()
    _dfs.clear()


app = FastAPI(
    title="Insurance Fraud Detection API",
    description="Random Forest fraud risk scoring + analytics over insurance CSVs.",
    version="2.0.0",
    lifespan=lifespan,
)


# ─────────────────────────────────────────────────────────────────────────────
# Internal helpers
# ─────────────────────────────────────────────────────────────────────────────
def _risk_label(p: float) -> str:
    if p < 0.30: return "Low"
    if p < 0.60: return "Medium"
    if p < 0.80: return "High"
    return "Critical"


def _recommendation(p: float) -> str:
    if p >= 0.80:
        return "Request additional documents and surveyor re-inspection"
    if p >= 0.60:
        return "Escalate to senior adjuster and verify incident report"
    if p >= 0.30:
        return "Cross-check policy history and contact customer for clarification"
    return "Standard processing — no additional action required"


def _risk_status(p: float) -> str:
    if p >= 0.80: return "High Risk — Flag for Investigation"
    if p >= 0.60: return "Medium-High Risk — Manual Review Required"
    if p >= 0.30: return "Medium Risk — Monitor Closely"
    return "Low Risk — Proceed Normally"


def _encode_row(raw: dict) -> pd.DataFrame:
    """Encode a raw feature dict into a model-ready DataFrame row."""
    enc      = _bundle["encoders"]
    modes    = _bundle["cat_modes"]
    med      = _bundle["num_medians"]
    cols     = _bundle["feature_columns"]
    cat_cols = _bundle["cat_cols"]

    row = pd.DataFrame([raw])
    for col in cat_cols:
        if col not in row.columns:
            row[col] = modes.get(col, 0)
            continue
        le  = enc[col]
        val = str(row[col].iloc[0])
        row[col] = le.transform([val])[0] if val in le.classes_ else modes.get(col, 0)

    for col in cols:
        if col not in row.columns:
            row[col] = med.get(col, modes.get(col, 0))

    return row[cols].astype(float)


def _score_row(raw: dict) -> tuple[float, int]:
    """Returns (probability, prediction) for a raw feature dict."""
    row   = _encode_row(raw)
    model = _bundle["model"]
    proba = float(model.predict_proba(row)[0, 1])
    pred  = int(model.predict(row)[0])
    return proba, pred


def _build_scored_master() -> pd.DataFrame:
    """Merge CSVs, derive features, score every row. Called once at startup."""
    claims   = _dfs["claims"].copy()
    policy   = _dfs["policy"].drop(columns=["IS_FRAUD"], errors="ignore")
    customer = _dfs["customer"].drop(columns=["IS_FRAUD", "STATE"], errors="ignore")

    df = (claims
          .merge(policy,   on=["POLICY_NUMBER", "CUSTOMER_ID", "PREMIUM_AMOUNT"], how="left")
          .merge(customer, on="CUSTOMER_ID", how="left"))

    DROP = ["POLICY_NUMBER", "CUSTOMER_ID", "CUSTOMER_NAME",
            "LOSS_DT", "REPORT_DT", "SSN", "AGENT_ID", "VENDOR_ID"]
    keep_ids = df[["TRANSACTION_ID"]].copy()

    df_work = df.drop(columns=[c for c in DROP if c in df.columns])

    for col in df_work.columns:
        if col in ("IS_FRAUD", "TRANSACTION_ID"):
            continue
        if df_work[col].dtype in ["float64", "int64"]:
            df_work[col] = df_work[col].fillna(df_work[col].median())
        else:
            df_work[col] = df_work[col].fillna(df_work[col].mode()[0])

    df_work["CLAIM_TO_PREMIUM_RATIO"] = (
        df_work["CLAIM_AMOUNT"] / df_work["PREMIUM_AMOUNT"].replace(0, 1)
    ).round(4)
    df_work["IS_NIGHT_INCIDENT"] = (
        df_work["INCIDENT_HOUR_OF_THE_DAY"].between(20, 23) |
        df_work["INCIDENT_HOUR_OF_THE_DAY"].between(0, 5)
    ).astype(int)

    enc      = _bundle["encoders"]
    modes    = _bundle["cat_modes"]
    cat_cols = _bundle["cat_cols"]
    feat_cols = _bundle["feature_columns"]

    for col in cat_cols:
        if col not in df_work.columns:
            df_work[col] = modes.get(col, 0)
            continue
        le = enc[col]
        def safe_enc(v, le=le, modes=modes, col=col):
            v = str(v)
            return le.transform([v])[0] if v in le.classes_ else modes.get(col, 0)
        df_work[col] = df_work[col].apply(safe_enc)

    for col in feat_cols:
        if col not in df_work.columns:
            df_work[col] = _bundle["num_medians"].get(col, 0)

    X = df_work[feat_cols].astype(float)
    model  = _bundle["model"]
    probas = model.predict_proba(X)[:, 1]
    preds  = model.predict(X)

    result = df[["TRANSACTION_ID", "POLICY_NUMBER", "CUSTOMER_ID",
                  "CLAIM_AMOUNT", "PREMIUM_AMOUNT", "VENDOR_ID",
                  "LOSS_DT", "REPORT_DT", "INCIDENT_SEVERITY",
                  "IS_FRAUD"]].copy()
    result["fraud_probability"] = (probas * 100).round(2)
    result["risk_score"]        = (probas * 100).round(2)
    result["risk_label"]        = [_risk_label(p) for p in probas]
    result["model_prediction"]  = preds

    # pull INSURANCE_TYPE from policy
    if "INSURANCE_TYPE" in df.columns:
        result["INSURANCE_TYPE"] = df["INSURANCE_TYPE"].values
    if "AGENT_ID" in df.columns:
        result["AGENT_ID"] = df["AGENT_ID"].values

    return result


# ─────────────────────────────────────────────────────────────────────────────
# Request / Response schemas
# ─────────────────────────────────────────────────────────────────────────────
class ClaimRequest(BaseModel):
    claim_amount:             float        = Field(..., gt=0)
    days_since_policy:        int          = Field(..., ge=0)
    previous_claims:          int          = Field(0,   ge=0)
    claim_type:               str          = Field(..., description="Auto|Health|Home|Life|Travel")
    customer_age:             int          = Field(..., ge=18, le=100)
    premium_amount:           Optional[float] = None
    incident_severity:        Optional[str]   = None
    incident_hour:            Optional[int]   = Field(None, ge=0, le=23)
    authority_contacted:      Optional[str]   = None
    any_injury:               Optional[int]   = Field(None, ge=0, le=1)
    police_report_available:  Optional[int]   = Field(None, ge=0, le=1)
    incident_state:           Optional[str]   = None
    state:                    Optional[str]   = None
    marital_status:           Optional[str]   = None
    employment_status:        Optional[str]   = None
    no_of_family_members:     Optional[int]   = Field(None, ge=1)
    house_type:               Optional[str]   = None
    social_class:             Optional[str]   = None
    education_level:          Optional[str]   = None
    tenure:                   Optional[int]   = None
    risk_segmentation:        Optional[str]   = None
    claim_status:             Optional[str]   = None

    class Config:
        json_schema_extra = {"example": {
            "claim_amount": 15000, "days_since_policy": 45,
            "previous_claims": 2, "claim_type": "Auto", "customer_age": 34,
            "premium_amount": 1200, "incident_severity": "Major",
            "incident_hour": 2, "police_report_available": 0, "any_injury": 1,
        }}


def _req_to_raw(req: ClaimRequest) -> dict:
    med = _bundle["num_medians"]
    premium   = req.premium_amount or med.get("PREMIUM_AMOUNT", 1500)
    hour      = req.incident_hour if req.incident_hour is not None else 12
    is_night  = int((20 <= hour <= 23) or (0 <= hour <= 5))
    return {
        "CLAIM_AMOUNT":               req.claim_amount,
        "PREMIUM_AMOUNT":             premium,
        "INCIDENT_SEVERITY":          req.incident_severity or "Moderate",
        "INCIDENT_HOUR_OF_THE_DAY":   hour,
        "AUTHORITY_CONTACTED":        req.authority_contacted or "Police",
        "ANY_INJURY":                 req.any_injury if req.any_injury is not None else 0,
        "POLICE_REPORT_AVAILABLE":    req.police_report_available if req.police_report_available is not None else 1,
        "INCIDENT_STATE":             req.incident_state or "CA",
        "INSURANCE_TYPE":             req.claim_type,
        "POLICY_EFF_DT":              "2021-01-01",
        "RISK_SEGMENTATION":          req.risk_segmentation or "Medium",
        "CLAIM_STATUS":               req.claim_status or "Under Investigation",
        "STATE":                      req.state or "CA",
        "AGE":                        req.customer_age,
        "MARITAL_STATUS":             req.marital_status or "Single",
        "EMPLOYMENT_STATUS":          req.employment_status or "Employed",
        "NO_OF_FAMILY_MEMBERS":       req.no_of_family_members or 3,
        "HOUSE_TYPE":                 req.house_type or "Rented",
        "SOCIAL_CLASS":               req.social_class or "Middle",
        "CUSTOMER_EDUCATION_LEVEL":   req.education_level or "Bachelor",
        "TENURE":                     req.tenure if req.tenure is not None else 5,
        "CLAIM_TO_PREMIUM_RATIO":     round(req.claim_amount / max(premium, 1), 4),
        "IS_NIGHT_INCIDENT":          is_night,
    }


# ─────────────────────────────────────────────────────────────────────────────
# ── Routes ────────────────────────────────────────────────────────────────────
# ─────────────────────────────────────────────────────────────────────────────

@app.get("/", tags=["Health"])
async def health():
    return {
        "status":        "ok",
        "model_loaded":  bool(_bundle),
        "csvs_loaded":   list(_dfs.keys()),
        "model_metrics": _bundle.get("metrics", {}),
    }


@app.get("/model/info", tags=["Health"])
async def model_info():
    if not _bundle:
        raise HTTPException(503, "Model not loaded.")
    return {
        "algorithm":       "RandomForestClassifier",
        "n_estimators":    _bundle["model"].n_estimators,
        "max_depth":       _bundle["model"].max_depth,
        "n_features":      len(_bundle["feature_columns"]),
        "feature_columns": _bundle["feature_columns"],
        "metrics":         _bundle["metrics"],
    }


# ─────────────────────────────────────────────────────────────────────────────
# Analytics
# ─────────────────────────────────────────────────────────────────────────────

@app.get("/analytics/top-agents", tags=["Analytics"])
async def top_agents(
    limit: int = Query(10, ge=1, le=100, description="Number of agents to return"),
    sort_by: str = Query("performance_score", description="performance_score | approval_rate | total_policies"),
):
    """
    Top agents ranked by performance score, approval rate, or total policies.
    Joined with fraud counts from claims_history.
    """
    if "agent" not in _dfs:
        raise HTTPException(404, "agent_performance.csv not loaded.")

    SORT_MAP = {
        "performance_score": "PERFORMANCE_SCORE",
        "approval_rate":     "APPROVAL_RATE",
        "total_policies":    "TOTAL_POLICIES",
    }
    sort_col = SORT_MAP.get(sort_by, "PERFORMANCE_SCORE")

    agents = _dfs["agent"].copy()

    # Aggregate per agent (same agent appears multiple rows in our generated data)
    agg = agents.groupby("AGENT_ID").agg(
        total_policies     = ("TOTAL_POLICIES",    "sum"),
        fraud_cases        = ("FRAUD_CASES_HANDLED","sum"),
        avg_claim_amount   = ("AVG_CLAIM_AMOUNT",  "mean"),
        approval_rate      = ("APPROVAL_RATE",     "mean"),
        complaints         = ("CUSTOMER_COMPLAINTS","sum"),
        years_experience   = ("YEARS_EXPERIENCE",  "mean"),
        performance_score  = ("PERFORMANCE_SCORE", "mean"),
    ).reset_index()

    # Enrich with live fraud count from scored master if available
    if "scored" in _dfs:
        fraud_per_agent = (
            _dfs["scored"]
            .groupby("AGENT_ID")["model_prediction"]
            .sum()
            .reset_index()
            .rename(columns={"model_prediction": "model_fraud_flags"})
        )
        agg = agg.merge(fraud_per_agent, on="AGENT_ID", how="left")
        agg["model_fraud_flags"] = agg["model_fraud_flags"].fillna(0).astype(int)

    agg = agg.sort_values(sort_col.lower().replace("performance_score","performance_score"), ascending=False)

    # rename to snake_case for response
    sort_key = sort_col.lower()
    top = agg.sort_values(
        {"PERFORMANCE_SCORE":"performance_score",
         "APPROVAL_RATE":"approval_rate",
         "TOTAL_POLICIES":"total_policies"}[sort_col],
        ascending=False
    ).head(limit)

    return {
        "sort_by":    sort_by,
        "total":      len(top),
        "agents":     top.round(2).to_dict(orient="records"),
    }


@app.get("/analytics/fraud-flagged-claims", tags=["Analytics"])
async def fraud_flagged_claims(
    limit:      int   = Query(20, ge=1, le=500),
    min_score:  float = Query(60.0, ge=0, le=100, description="Minimum risk score to include"),
    label:      Optional[str] = Query(None, description="Filter by risk label: Low|Medium|High|Critical"),
):
    """
    Claims the RF model has flagged as likely fraud, with risk scores.
    """
    if "scored" not in _dfs:
        raise HTTPException(503, "Scored master not ready.")

    df = _dfs["scored"].copy()
    df = df[df["risk_score"] >= min_score]
    if label:
        df = df[df["risk_label"] == label]
    df = df.sort_values("risk_score", ascending=False).head(limit)

    cols = ["TRANSACTION_ID", "POLICY_NUMBER", "CUSTOMER_ID",
            "CLAIM_AMOUNT", "INSURANCE_TYPE", "INCIDENT_SEVERITY",
            "fraud_probability", "risk_score", "risk_label",
            "IS_FRAUD", "model_prediction"]
    out = df[[c for c in cols if c in df.columns]]

    return {
        "total_flagged":    len(out),
        "min_score_filter": min_score,
        "label_filter":     label,
        "claims":           out.to_dict(orient="records"),
    }


@app.get("/analytics/claims-trend", tags=["Analytics"])
async def claims_trend(
    group_by: str = Query("month", description="month | quarter | year"),
):
    """
    Monthly/quarterly/yearly claim volume and average claim amount trend.
    """
    if "claims" not in _dfs:
        raise HTTPException(404, "claims_history.csv not loaded.")

    df = _dfs["claims"].copy()
    df["LOSS_DT"] = pd.to_datetime(df["LOSS_DT"], errors="coerce")
    df = df.dropna(subset=["LOSS_DT"])

    if group_by == "month":
        df["period"] = df["LOSS_DT"].dt.to_period("M").astype(str)
    elif group_by == "quarter":
        df["period"] = df["LOSS_DT"].dt.to_period("Q").astype(str)
    else:
        df["period"] = df["LOSS_DT"].dt.year.astype(str)

    trend = (df.groupby("period")
               .agg(
                   claim_count    = ("TRANSACTION_ID", "count"),
                   total_claims   = ("CLAIM_AMOUNT",   "sum"),
                   avg_claim      = ("CLAIM_AMOUNT",   "mean"),
                   total_premium  = ("PREMIUM_AMOUNT", "sum"),
                   fraud_count    = ("IS_FRAUD",       "sum"),
               )
               .reset_index()
               .sort_values("period"))

    trend["fraud_rate_pct"] = (trend["fraud_count"] / trend["claim_count"] * 100).round(2)
    trend["avg_claim"]      = trend["avg_claim"].round(2)

    return {
        "group_by": group_by,
        "periods":  len(trend),
        "trend":    trend.to_dict(orient="records"),
    }


@app.get("/analytics/loss-ratio", tags=["Analytics"])
async def loss_ratio(
    group_by: str = Query("insurance_type", description="insurance_type | state | risk_segmentation"),
):
    """
    Loss ratio = total claims paid / total premiums collected.
    Anything above 1.0 means the insurer is paying out more than it collects.
    """
    if "claims" not in _dfs or "policy" not in _dfs:
        raise HTTPException(404, "Required CSVs not loaded.")

    claims = _dfs["claims"].copy()
    policy = _dfs["policy"].copy()

    merged = claims.merge(
        policy[["POLICY_NUMBER", "INSURANCE_TYPE", "RISK_SEGMENTATION", "STATE"]],
        on="POLICY_NUMBER", how="left"
    )

    GROUP_MAP = {
        "insurance_type":   "INSURANCE_TYPE",
        "state":            "STATE",
        "risk_segmentation":"RISK_SEGMENTATION",
    }
    grp_col = GROUP_MAP.get(group_by, "INSURANCE_TYPE")

    if grp_col not in merged.columns:
        raise HTTPException(400, f"group_by '{group_by}' not available.")

    agg = (merged.groupby(grp_col)
                 .agg(
                     total_claims_paid   = ("CLAIM_AMOUNT",   "sum"),
                     total_premiums      = ("PREMIUM_AMOUNT", "sum"),
                     claim_count         = ("TRANSACTION_ID", "count"),
                     fraud_claims        = ("IS_FRAUD",       "sum"),
                 )
                 .reset_index()
                 .rename(columns={grp_col: "group"}))

    agg["loss_ratio"]       = (agg["total_claims_paid"] / agg["total_premiums"].replace(0,1)).round(4)
    agg["fraud_rate_pct"]   = (agg["fraud_claims"] / agg["claim_count"] * 100).round(2)
    agg["avg_claim"]        = (agg["total_claims_paid"] / agg["claim_count"]).round(2)
    agg                     = agg.sort_values("loss_ratio", ascending=False)

    overall_lr = round(agg["total_claims_paid"].sum() / max(agg["total_premiums"].sum(), 1), 4)

    return {
        "group_by":          group_by,
        "overall_loss_ratio": overall_lr,
        "breakdown":         agg.to_dict(orient="records"),
    }


@app.get("/analytics/renewal-rate", tags=["Analytics"])
async def renewal_rate():
    """
    Proxy renewal rate by customer tenure bucket.
    Customers with tenure > 1 yr are treated as 'renewed'.
    Broken down by insurance type and social class.
    """
    if "customer" not in _dfs or "policy" not in _dfs:
        raise HTTPException(404, "Required CSVs not loaded.")

    cust   = _dfs["customer"].copy()
    policy = _dfs["policy"].copy()

    merged = cust.merge(policy[["CUSTOMER_ID","INSURANCE_TYPE","CLAIM_STATUS"]], on="CUSTOMER_ID", how="left")

    # tenure buckets
    bins   = [0, 1, 3, 5, 10, 100]
    labels = ["<1yr", "1-3yr", "3-5yr", "5-10yr", "10yr+"]
    merged["tenure_bucket"] = pd.cut(merged["TENURE"], bins=bins, labels=labels, right=False)
    merged["renewed"]       = (merged["TENURE"] > 1).astype(int)

    # Overall renewal rate by bucket
    by_bucket = (merged.groupby("tenure_bucket", observed=True)
                       .agg(total=("CUSTOMER_ID","count"), renewed=("renewed","sum"))
                       .reset_index())
    by_bucket["renewal_rate_pct"] = (by_bucket["renewed"] / by_bucket["total"] * 100).round(2)

    # By insurance type
    by_type = (merged.groupby("INSURANCE_TYPE")
                     .agg(total=("CUSTOMER_ID","count"), renewed=("renewed","sum"))
                     .reset_index())
    by_type["renewal_rate_pct"] = (by_type["renewed"] / by_type["total"] * 100).round(2)
    by_type = by_type.sort_values("renewal_rate_pct", ascending=False)

    overall = round(merged["renewed"].mean() * 100, 2)

    return {
        "overall_renewal_rate_pct": overall,
        "note": "Renewal proxied as TENURE > 1 year. Replace with actual renewal flag for production.",
        "by_tenure_bucket":  by_bucket.to_dict(orient="records"),
        "by_insurance_type": by_type.to_dict(orient="records"),
    }


# ─────────────────────────────────────────────────────────────────────────────
# Prediction
# ─────────────────────────────────────────────────────────────────────────────

@app.post("/predict", tags=["Prediction"])
async def predict(req: ClaimRequest):
    """Score an ad-hoc claim payload."""
    if not _bundle:
        raise HTTPException(503, "Model not loaded.")
    try:
        proba, pred = _score_row(_req_to_raw(req))
    except Exception as e:
        raise HTTPException(500, f"Inference error: {e}")

    pct = round(proba * 100, 2)
    return {
        "is_fraud":          bool(pred),
        "fraud_probability": pct,
        "risk_score":        pct,
        "risk_status":       _risk_status(proba),
        "risk_label":        _risk_label(proba),
        "recommendation":    _recommendation(proba),
        "model_version":     "rf-v2.0",
        "model_metrics":     _bundle.get("metrics", {}),
    }


@app.post("/predict/fraud/{claimId}", tags=["Prediction"])
async def predict_by_claim_id(claimId: str):
    """
    Look up an existing claim from claims_history.csv by TRANSACTION_ID,
    merge with policy + customer data, and return a fraud risk score.

    Example:  POST /predict/fraud/TXN0000042
    """
    if not _bundle:
        raise HTTPException(503, "Model not loaded.")
    if "scored" not in _dfs:
        raise HTTPException(503, "Scored master not ready.")

    scored = _dfs["scored"]
    row = scored[scored["TRANSACTION_ID"] == claimId]
    if row.empty:
        raise HTTPException(404, f"Claim '{claimId}' not found in claims_history.csv.")

    r    = row.iloc[0]
    prob = float(r["fraud_probability"])   # already 0–100
    p    = prob / 100.0

    return {
        "claim_id":          claimId,
        "policy_number":     r.get("POLICY_NUMBER", "N/A"),
        "customer_id":       r.get("CUSTOMER_ID",   "N/A"),
        "claim_amount":      float(r.get("CLAIM_AMOUNT", 0)),
        "insurance_type":    r.get("INSURANCE_TYPE", "N/A"),
        "incident_severity": r.get("INCIDENT_SEVERITY", "N/A"),
        "fraud_probability": round(prob, 2),
        "risk_score":        round(prob, 2),
        "risk_status":       _risk_status(p),
        "risk_label":        _risk_label(p),
        "recommendation":    _recommendation(p),
        "actual_fraud_label": int(r.get("IS_FRAUD", -1)),   # ground truth from CSV
        "model_prediction":  int(r.get("model_prediction", -1)),
        "model_version":     "rf-v2.0",
    }