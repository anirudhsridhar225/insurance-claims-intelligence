import { useState } from 'react';
import { UploadCloud, CheckCircle2, Circle, FileText, CreditCard, ArrowRight, ShieldCheck } from 'lucide-react';

export default function CustomerKYC() {
  const [currentStep, setCurrentStep] = useState(2); // Simulating being on step 2

  // Mock submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentStep(3);
  };

  return (
    <div className="animate-fade-in space-y-6">
      
      {/* Page Header */}
      <div>
        <p className="font-mono text-[10px] tracking-widest text-gray-500 uppercase mb-2">Module 2 · UC — Onboarding</p>
        <h1 className="font-serif text-3xl text-gray-100 mb-1">Customer Onboarding & KYC</h1>
        <p className="text-sm text-gray-400">Register a new customer, verify identity documents, assign agent</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: The Form (Takes up 2/3 space) */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleSubmit} className="bg-brand-surface border border-gray-800 rounded-xl p-6 shadow-lg">
            
            <h3 className="font-serif text-lg text-brand-gold mb-6 border-b border-gray-800 pb-2">Customer Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
              <InputField label="Full Name" placeholder="Anita Mehta" />
              <InputField label="Date of Birth" type="date" defaultValue="1988-06-14" />
              <InputField label="Email Address" type="email" placeholder="anita@email.com" />
              <InputField label="Mobile Number" placeholder="+91 98765 43210" />
            </div>

            <div className="mb-6">
              <label className="block font-mono text-[10px] tracking-widest text-gray-400 uppercase mb-2">Residential Address</label>
              <textarea 
                className="w-full px-4 py-3 bg-brand-ink border border-gray-700 rounded-lg text-sm text-gray-100 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors resize-none"
                rows="2"
                placeholder="Flat 4B, Seaview Towers, Andheri West, Mumbai – 400053"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
              <div>
                <label className="block font-mono text-[10px] tracking-widest text-gray-400 uppercase mb-2">Assign Agent</label>
                <select className="w-full px-4 py-3 bg-brand-ink border border-gray-700 rounded-lg text-sm text-gray-100 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold appearance-none">
                  <option>Rajan Arora — Mumbai North</option>
                  <option>Preethi S. — Bengaluru</option>
                </select>
              </div>
              <div>
                <label className="block font-mono text-[10px] tracking-widest text-gray-400 uppercase mb-2">Customer Segment</label>
                <select className="w-full px-4 py-3 bg-brand-ink border border-gray-700 rounded-lg text-sm text-gray-100 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold appearance-none">
                  <option>Individual</option>
                  <option>Corporate</option>
                  <option>Senior Citizen</option>
                </select>
              </div>
            </div>

            <h3 className="font-serif text-lg text-brand-gold mb-6 border-b border-gray-800 pb-2">KYC Documents</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
              <FileUploadZone title="Aadhaar / National ID" icon={<CreditCard size={24} />} subtitle="Upload Aadhaar (PDF/JPG)" />
              <FileUploadZone title="PAN Card" icon={<FileText size={24} />} subtitle="Upload PAN (PDF/JPG)" />
            </div>

            <div className="flex gap-4">
              <button type="submit" className="bg-brand-gold hover:bg-yellow-500 text-brand-ink font-semibold py-2.5 px-6 rounded-lg text-sm flex items-center gap-2 transition-colors">
                <CheckCircle2 size={16} /> Save & Submit KYC
              </button>
              <button type="button" className="bg-transparent hover:bg-gray-800 text-gray-300 border border-gray-700 py-2.5 px-6 rounded-lg text-sm transition-colors">
                Cancel
              </button>
            </div>
            <p className="font-mono text-[10px] text-gray-500 mt-4">API: POST /api/customers · Documents → AWS S3</p>
          </form>
        </div>

        {/* Right Column: Tracking & Info */}
        <div className="space-y-6">
          
          {/* Progress Tracker */}
          <div className="bg-brand-surface border border-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="font-serif text-lg text-gray-100 mb-6">KYC Verification Steps</h3>
            
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[15px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-gray-800 before:to-transparent">
              <StepItem step={1} current={currentStep} title="Identity Verification" desc="Aadhaar + PAN matched" />
              <StepItem step={2} current={currentStep} title="Address Proof" desc="Utility bill / Bank statement" />
              <StepItem step={3} current={currentStep} title="Photo Verification" desc="Selfie + ID match" />
              <StepItem step={4} current={currentStep} title="Admin Approval" desc="Account activation" />
            </div>
          </div>

          {/* Data Flow Diagram */}
          <div className="bg-brand-surface border border-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="font-serif text-lg text-gray-100 mb-4 flex items-center gap-2">
              <ShieldCheck size={18} className="text-brand-teal" /> Data Flow
            </h3>
            <div className="font-mono text-[11px] text-gray-400 leading-relaxed space-y-2">
              <div className="text-[#5BAD80] flex gap-2"><span>①</span> Form Validation (React)</div>
              <div className="flex gap-2"><span>②</span> POST /api/customers</div>
              <div className="flex gap-2"><span>③</span> Spring Boot processes KYC</div>
              <div className="flex gap-2"><span>④</span> Docs uploaded to AWS S3</div>
              <div className="flex gap-2"><span>⑤</span> Record → PostgreSQL</div>
              <div className="text-[#5BAD80] flex gap-2"><span>⑥</span> Agent Notification Fired</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// --- Reusable Sub-components ---

function InputField({ label, type = "text", placeholder, defaultValue }) {
  return (
    <div>
      <label className="block font-mono text-[10px] tracking-widest text-gray-400 uppercase mb-2">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="w-full px-4 py-2.5 bg-brand-ink border border-gray-700 rounded-lg text-sm text-gray-100 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors"
      />
    </div>
  );
}

function FileUploadZone({ title, icon, subtitle }) {
  return (
    <div>
      <label className="block font-mono text-[10px] tracking-widest text-gray-400 uppercase mb-2">{title}</label>
      <div className="border-2 border-dashed border-gray-700 hover:border-brand-gold hover:bg-brand-gold/5 rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all group">
        <div className="text-gray-500 group-hover:text-brand-gold mb-3 transition-colors">
          {icon}
        </div>
        <div className="text-xs text-gray-300 mb-1">{subtitle}</div>
        <div className="font-mono text-[9px] text-gray-500">Max 5 MB</div>
      </div>
    </div>
  );
}

function StepItem({ step, current, title, desc }) {
  const isCompleted = step < current;
  const isActive = step === current;
  
  return (
    <div className="relative flex items-start gap-4">
      <div className={`mt-1 relative z-10 w-8 h-8 rounded-full flex items-center justify-center bg-brand-surface border-2 shrink-0 ${
        isCompleted ? 'border-[#5BAD80] text-[#5BAD80]' : 
        isActive ? 'border-brand-gold text-brand-gold' : 'border-gray-700 text-gray-600'
      }`}>
        {isCompleted ? <CheckCircle2 size={16} /> : <span className="font-mono text-xs">{step}</span>}
      </div>
      <div>
        <div className={`text-sm font-medium ${isActive ? 'text-brand-gold' : isCompleted ? 'text-gray-200' : 'text-gray-500'}`}>
          {title}
        </div>
        <div className="font-mono text-[10px] text-gray-500 mt-0.5">{desc}</div>
      </div>
      {/* Status Badge */}
      <div className="ml-auto mt-1">
        {isCompleted && <span className="bg-[#5BAD80]/10 text-[#5BAD80] border border-[#5BAD80]/20 text-[9px] font-mono px-2 py-0.5 rounded-full">Done</span>}
        {isActive && <span className="bg-brand-gold/10 text-brand-gold border border-brand-gold/20 text-[9px] font-mono px-2 py-0.5 rounded-full">Active</span>}
      </div>
    </div>
  );
}