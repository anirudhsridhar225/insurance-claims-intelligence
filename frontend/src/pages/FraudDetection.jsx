import { ShieldAlert, Cpu, Database, Server } from 'lucide-react';

export default function FraudDetection() {
  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <p className="font-mono text-[10px] tracking-widest text-[#E05C6E] uppercase mb-2">Module 4 · AI/ML · Python FastAPI</p>
        <h1 className="font-serif text-3xl text-gray-100 mb-1">Fraud Detection Report</h1>
        <p className="text-sm text-gray-400">ML-powered fraud risk scoring per claim · API: POST /predict/fraud</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left: Inputs & Payload */}
        <div className="bg-brand-surface border border-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="font-serif text-lg text-gray-100 mb-6">Model Feature Inputs</h3>
          
          <div className="space-y-4 mb-8">
            <FeatureRow label="Claim Amount" value="₹ 95,000" barWidth="88%" color="bg-[#E05C6E]" />
            <FeatureRow label="Days Since Policy Start" value="12 days" barWidth="15%" color="bg-[#E05C6E]" />
            <FeatureRow label="Prior Claims Count" value="3 claims" barWidth="75%" color="bg-[#C9A84C]" />
            <FeatureRow label="Customer Age" value="29 yrs" barWidth="35%" color="bg-[#4A90D9]" />
          </div>

          <div className="bg-brand-ink rounded-lg p-4 border border-gray-800">
            <p className="font-mono text-[9px] text-gray-500 uppercase tracking-widest mb-3">POST /predict/fraud</p>
            <pre className="font-mono text-xs text-gray-400 overflow-x-auto">
{`{
  "claim_amount": 95000,
  "days_since_policy_start": 12,
  "previous_claims_count": 3,
  "claim_type": "motor_accident",
  "customer_age": 29
}`}
            </pre>
          </div>
        </div>

        {/* Right: Output & Prediction */}
        <div className="bg-gradient-to-br from-[#E05C6E]/10 to-brand-gold/5 border border-[#E05C6E]/20 rounded-xl p-6 shadow-lg flex flex-col justify-between">
          <div className="text-center mb-8 mt-4">
            <p className="font-mono text-[10px] text-[#E05C6E] tracking-[0.2em] mb-2">FRAUD PROBABILITY</p>
            <h2 className="font-serif text-7xl text-[#E05C6E] mb-4">78<span className="text-4xl">%</span></h2>
            <span className="bg-[#E05C6E]/20 text-[#E05C6E] border border-[#E05C6E]/30 text-xs font-mono px-4 py-1.5 rounded-full">
              ⚠ High Risk — Flag for Investigation
            </span>
          </div>

          <div className="bg-brand-ink/80 rounded-lg p-4 border border-gray-800 mb-6 backdrop-blur-sm">
            <p className="font-mono text-[9px] text-gray-500 uppercase tracking-widest mb-3">PYTHON ML RESPONSE</p>
            <pre className="font-mono text-[11px] text-gray-300 whitespace-pre-wrap leading-relaxed">
{`{
  "fraud_probability": 78,
  "risk_status": "High Risk",
  "recommendation": "Request additional documents and surveyor re-inspection."
}`}
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