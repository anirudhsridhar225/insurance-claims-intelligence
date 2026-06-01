import { useState } from 'react';
import { ShieldAlert, Cpu, Database, Server, Play } from 'lucide-react';
import { api } from '../services/api';

export default function FraudDetection() {
  const [loading, setLoading] = useState(false);
  
  // Default payload matching your FastAPI ClaimRequest schema
  const [payload, setPayload] = useState({
    claim_amount: 95000,
    days_since_policy: 12,
    previous_claims: 3,
    claim_type: "Auto",
    customer_age: 29
  });

  // State to hold the FastAPI response
  const [result, setResult] = useState({
    fraud_probability: 0,
    risk_status: "Awaiting Assessment",
    recommendation: "Click 'Run AI Inference' to score this claim."
  });

  const I_runInference = async () => {
    setLoading(true);
    try {
      const response = await api.post('/predict', payload);
      setResult(response.data);
    } catch (error) {
      console.error("Error calling /predict on EC2:", error);
      alert("Failed to connect to ML Model. Check EC2 IP and CORS.");
    } finally {
      setLoading(false);
    }
  };

  // Determine styling based on the risk score returned
  const isHighRisk = result.fraud_probability >= 60;
  const colorHex = isHighRisk ? "#E05C6E" : "#5BAD80";
  const bgHex = isHighRisk ? "from-[#E05C6E]/10" : "from-[#5BAD80]/10";

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <p className="font-mono text-[10px] tracking-widest text-[#E05C6E] uppercase mb-2">Module 4 · AI/ML · Python FastAPI</p>
        <h1 className="font-serif text-3xl text-gray-100 mb-1">Fraud Detection Report</h1>
        <p className="text-sm text-gray-400">ML-powered fraud risk scoring per claim · API: POST /predict</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left: Inputs & Payload */}
        <div className="bg-brand-surface border border-gray-800 rounded-xl p-6 shadow-lg flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-serif text-lg text-gray-100">Model Feature Inputs</h3>
            <button 
              onClick={I_runInference}
              disabled={loading}
              className="bg-brand-gold hover:bg-yellow-500 text-brand-ink text-xs font-semibold py-1.5 px-4 rounded-md transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              {loading ? "Scoring..." : <><Play size={14} /> Run AI Inference</>}
            </button>
          </div>
          
          <div className="space-y-4 mb-8">
            <FeatureRow label="Claim Amount" value={`₹ ${payload.claim_amount}`} barWidth="88%" color="bg-[#E05C6E]" />
            <FeatureRow label="Days Since Policy Start" value={`${payload.days_since_policy} days`} barWidth="15%" color="bg-[#E05C6E]" />
            <FeatureRow label="Prior Claims Count" value={`${payload.previous_claims} claims`} barWidth="75%" color="bg-[#C9A84C]" />
            <FeatureRow label="Customer Age" value={`${payload.customer_age} yrs`} barWidth="35%" color="bg-[#4A90D9]" />
          </div>

          <div className="bg-brand-ink rounded-lg p-4 border border-gray-800 mt-auto">
            <p className="font-mono text-[9px] text-gray-500 uppercase tracking-widest mb-3">POST /predict</p>
            <pre className="font-mono text-xs text-gray-400 overflow-x-auto">
              {JSON.stringify(payload, null, 2)}
            </pre>
          </div>
        </div>

        {/* Right: Output & Prediction */}
        <div className={`bg-gradient-to-br ${bgHex} to-brand-gold/5 border border-gray-800 rounded-xl p-6 shadow-lg flex flex-col justify-between transition-colors duration-500`}>
          <div className="text-center mb-8 mt-4">
            <p className="font-mono text-[10px] text-gray-400 tracking-[0.2em] mb-2 uppercase">Fraud Probability</p>
            <h2 className="font-serif text-7xl mb-4 transition-colors duration-500" style={{ color: colorHex }}>
              {result.fraud_probability}<span className="text-4xl">%</span>
            </h2>
            <span 
              className="text-xs font-mono px-4 py-1.5 rounded-full border transition-colors duration-500"
              style={{ color: colorHex, backgroundColor: `${colorHex}20`, borderColor: `${colorHex}40` }}
            >
              {result.risk_status}
            </span>
          </div>

          <div className="bg-brand-ink/80 rounded-lg p-4 border border-gray-800 mb-6 backdrop-blur-sm">
            <p className="font-mono text-[9px] text-gray-500 uppercase tracking-widest mb-3">PYTHON ML RESPONSE</p>
            <pre className="font-mono text-[11px] text-gray-300 whitespace-pre-wrap leading-relaxed">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>

          <div className="flex gap-4">
            <MicroserviceBox icon={<Server size={18}/>} title="Spring Boot" desc="API Gateway" color="text-brand-gold" />
            <MicroserviceBox icon={<Cpu size={18}/>} title="FastAPI" desc="ML Engine" color="text-[#4A90D9]" />
            <MicroserviceBox icon={<Database size={18}/>} title="PostgreSQL" desc="Persistence" color="text-[#5BAD80]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureRow({ label, value, barWidth, color }) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-48 text-xs text-gray-400">{label}</div>
      <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: barWidth }}></div>
      </div>
      <div className="w-16 text-right font-mono text-xs text-gray-200">{value}</div>
    </div>
  );
}

function MicroserviceBox({ icon, title, desc, color }) {
  return (
    <div className="flex-1 bg-brand-ink border border-gray-800 rounded-lg p-3 text-center flex flex-col items-center justify-center">
      <div className={`${color} mb-2`}>{icon}</div>
      <div className="font-serif text-sm text-gray-200">{title}</div>
      <div className="font-mono text-[9px] text-gray-500 mt-1">{desc}</div>
    </div>
  );
}