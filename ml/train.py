"""
train_and_save.py
-----------------
Trains the Random Forest on the generated CSVs and serialises
everything needed at inference time to  model/fraud_model.pkl

Run once:  python train_and_save.py
The FastAPI server then loads the .pkl at startup — no retraining needed.
"""

import os, json, warnings
import numpy as np
import pandas as pd
import joblib
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import roc_auc_score, classification_report, accuracy_score, f1_score

warnings.filterwarnings("ignore")
np.random.seed(42)

os.makedirs("model", exist_ok=True)

# ── 1. Load CSVs ──────────────────────────────────────────────────────────────
print("Loading CSVs …")
claims   = pd.read_csv("input/claims_history.csv")
policy   = pd.read_csv("input/policy_data.csv")
customer = pd.read_csv("input/customer_profiles.csv")

# ── 2. Merge (same logic as notebook) ────────────────────────────────────────
df = (claims
      .merge(policy.drop(columns=["IS_FRAUD"]),
             on=["POLICY_NUMBER", "CUSTOMER_ID", "PREMIUM_AMOUNT"], how="left")
      .merge(customer.drop(columns=["IS_FRAUD", "STATE"]),
             on="CUSTOMER_ID", how="left"))

DROP_COLS = ["TRANSACTION_ID", "POLICY_NUMBER", "CUSTOMER_ID", "CUSTOMER_NAME",
             "LOSS_DT", "REPORT_DT", "SSN", "AGENT_ID", "VENDOR_ID"]
df.drop(columns=[c for c in DROP_COLS if c in df.columns], inplace=True)

# ── 3. Fill nulls ─────────────────────────────────────────────────────────────
for col in df.columns:
    if col == "IS_FRAUD":
        continue
    if df[col].dtype in ["float64", "int64"]:
        df[col].fillna(df[col].median(), inplace=True)
    else:
        df[col].fillna(df[col].mode()[0], inplace=True)

# ── 4. Derived features ───────────────────────────────────────────────────────
df["CLAIM_TO_PREMIUM_RATIO"] = (df["CLAIM_AMOUNT"] / df["PREMIUM_AMOUNT"].replace(0, 1)).round(4)
df["IS_NIGHT_INCIDENT"]      = (df["INCIDENT_HOUR_OF_THE_DAY"].between(20, 23) |
                                 df["INCIDENT_HOUR_OF_THE_DAY"].between(0,  5)).astype(int)

# ── 5. Encode categoricals + save encoders ────────────────────────────────────
encoders   = {}
cat_cols   = df.select_dtypes("object").columns.tolist()
cat_modes  = {}   # default fill for unseen categories at inference

for col in cat_cols:
    le = LabelEncoder()
    df[col] = le.fit_transform(df[col].astype(str))
    encoders[col]  = le
    cat_modes[col] = int(df[col].mode()[0])   # fallback for unknowns

# ── 6. Train ──────────────────────────────────────────────────────────────────
X = df.drop(columns=["IS_FRAUD"])
y = df["IS_FRAUD"]

# Save column order — inference must match exactly
feature_columns = X.columns.tolist()

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y)

print("Training Random Forest …")
rf = RandomForestClassifier(
    n_estimators=200,
    max_depth=12,
    min_samples_leaf=5,
    class_weight="balanced",
    random_state=42,
    n_jobs=-1,
)
rf.fit(X_train, y_train)

y_pred  = rf.predict(X_test)
y_proba = rf.predict_proba(X_test)[:, 1]

auc      = roc_auc_score(y_test, y_proba)
acc      = accuracy_score(y_test, y_pred)
f1       = f1_score(y_test, y_pred)

print(f"\n{'='*50}")
print(f"  ROC-AUC  : {auc:.4f}")
print(f"  Accuracy : {acc:.4f}")
print(f"  F1 Score : {f1:.4f}")
print(f"{'='*50}")
print(classification_report(y_test, y_pred, target_names=["Legit", "Fraud"]))

# ── 7. Compute numeric medians for inference defaults ─────────────────────────
num_medians = {}
for col in feature_columns:
    if col not in cat_cols:
        num_medians[col] = float(X[col].median())

# ── 8. Save everything to model/ ─────────────────────────────────────────────
bundle = {
    "model":           rf,
    "encoders":        encoders,
    "cat_cols":        cat_cols,
    "cat_modes":       cat_modes,
    "num_medians":     num_medians,
    "feature_columns": feature_columns,
    "metrics": {
        "roc_auc":  round(auc, 4),
        "accuracy": round(acc, 4),
        "f1_fraud": round(f1, 4),
    }
}
joblib.dump(bundle, "model/fraud_model.pkl", compress=3)

# Also dump a human-readable meta JSON
meta = {
    "feature_columns": feature_columns,
    "cat_cols":        cat_cols,
    "cat_modes":       cat_modes,
    "num_medians":     num_medians,
    "metrics":         bundle["metrics"],
}
with open("model/model_meta.json", "w") as f:
    json.dump(meta, f, indent=2)

print("\nSaved  →  model/fraud_model.pkl")
print("Saved  →  model/model_meta.json")
print("\nModel bundle contents:")
print(f"  - Random Forest          ({rf.n_estimators} trees, depth {rf.max_depth})")
print(f"  - Label encoders         ({len(encoders)} categorical columns)")
print(f"  - Feature column order   ({len(feature_columns)} features)")
print(f"  - Numeric medians        (inference defaults)")
