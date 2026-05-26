import { useState } from 'react';
import { UploadCloud, FileText, Camera, CheckCircle2, AlertCircle, Send, Save } from 'lucide-react';

export default function ClaimsSubmission() {
  const [claimAmount, setClaimAmount] = useState('');

  return (
    <div className="animate-fade-in space-y-6">
      
      {/* Page Header */}
      <div>
        <p className="font-mono text-[10px] tracking-widest text-gray-500 uppercase mb-2">Module 3 · UC — Claims Intake</p>
        <h1 className="font-serif text-3xl text-gray-100 mb-1">Claims Submission</h1>
        <p className="text-sm text-gray-400">File a new insurance claim with supporting documents</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Claim Form (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-brand-surface border border-gray-800 rounded-xl p-6 shadow-lg">
            
            <h3 className="font-serif text-lg text-brand-gold mb-6 border-b border-gray-800 pb-2">Claim Details</h3>
            
            <div className="mb-5">
              <label className="block font-mono text-[10px] tracking-widest text-gray-400 uppercase mb-2">Select Policy</label>
              <select className="w-full px-4 py-3 bg-brand-ink border border-gray-700 rounded-lg text-sm text-gray-100 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold appearance-none">
                <option>POL-2024-MTR-01192 — Motor (Anita Mehta)</option>
                <option>POL-2023-HLT-00482 — Health (Anita Mehta)</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              <div>
                <label className="block font-mono text-[10px] tracking-widest text-gray-400 uppercase mb-2">Claim Type</label>
                <select className="w-full px-4 py-3 bg-brand-ink border border-gray-700 rounded-lg text-sm text-gray-100 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold appearance-none">
                  <option>Motor Accident</option>
                  <option>Health / Hospitalisation</option>
                  <option>Property Damage</option>
                </select>
              </div>
              <div>
                <label className="block font-mono text-[10px] tracking-widest text-gray-400 uppercase mb-2">Incident Date</label>
                <input type="date" defaultValue="2026-05-20" className="w-full px-4 py-2.5 bg-brand-ink border border-gray-700 rounded-lg text-sm text-gray-100 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold" />
              </div>
            </div>

            <div className="mb-5">
              <label className="block font-mono text-[10px] tracking-widest text-gray-400 uppercase mb-2">Claimed Amount (₹)</label>
              <input 
                type="text" 
                placeholder="e.g., 95000" 
                value={claimAmount}
                onChange={(e) => setClaimAmount(e.target.value)}
                className="w-full px-4 py-2.5 bg-brand-ink border border-gray-700 rounded-lg text-sm text-gray-100 font-mono focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold" 
              />
            </div>

            <div className="mb-8">
              <label className="block font-mono text-[10px] tracking-widest text-gray-400 uppercase mb-2">Incident Description</label>
              <textarea 
                className="w-full px-4 py-3 bg-brand-ink border border-gray-700 rounded-lg text-sm text-gray-100 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold resize-none"
                rows="3"
                placeholder="Briefly describe the incident, location, and nature of damage or loss..."
              ></textarea>
            </div>

            <h3 className="font-serif text-lg text-brand-gold mb-6 border-b border-gray-800 pb-2">Supporting Documents</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
              <div className="border-2 border-dashed border-gray-700 hover:border-[#4A90D9] hover:bg-[#4A90D9]/5 rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all group">
                <FileText className="text-gray-500 group-hover:text-[#4A90D9] mb-3 transition-colors" size={24} />
                <div className="text-xs text-gray-300 mb-1">FIR / Hospital Bill / Survey</div>
                <div className="font-mono text-[9px] text-gray-500">PDF · JPG · Max 10MB</div>
              </div>
              
              <div className="border-2 border-dashed border-gray-700 hover:border-[#5BAD80] hover:bg-[#5BAD80]/5 rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all group">
                <Camera className="text-gray-500 group-hover:text-[#5BAD80] mb-3 transition-colors" size={24} />
                <div className="text-xs text-gray-300 mb-1">Photos / Videos</div>
                <div className="font-mono text-[9px] text-gray-500">MP4 · JPG · Max 50MB</div>
              </div>
            </div>

            <div className="flex gap-4">
              <button className="bg-brand-gold hover:bg-yellow-500 text-brand-ink font-semibold py-2.5 px-6 rounded-lg text-sm flex items-center gap-2 transition-colors">
                <Send size={16} /> Submit Claim
              </button>
              <button className="bg-transparent hover:bg-gray-800 text-gray-300 border border-gray-700 py-2.5 px-6 rounded-lg text-sm flex items-center gap-2 transition-colors">
                <Save size={16} /> Save Draft
              </button>
            </div>
            <p className="font-mono text-[10px] text-gray-500 mt-4">API: POST /api/claims · Claim ID auto-generated</p>
          </div>
        </div>

        {/* Right Column: Timeline & Preview (1/3 width) */}
        <div className="space-y-6">
          
          {/* Claim Preview Card */}
          <div className="bg-brand-surface border border-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="font-serif text-lg text-gray-100 mb-4">Draft Preview</h3>
            <div className="space-y-3 font-mono text-[11px] text-gray-400">
              <div className="flex justify-between">
                <span>Claim ID</span>
                <strong className="text-brand-gold">Pending</strong>
              </div>
              <div className="flex justify-between">
                <span>Policy</span>
                <strong className="text-gray-200">Motor — POL-2024-MTR-01192</strong>
              </div>
              <div className="flex justify-between">
                <span>Amount</span>
                <strong className="text-gray-200">₹ {claimAmount || '0'}</strong>
              </div>
              <div className="flex justify-between">
                <span>Type</span>
                <strong className="text-gray-200">Motor Accident</strong>
              </div>
            </div>
          </div>

          {/* Lifecycle Timeline */}
          <div className="bg-brand-surface border border-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="font-serif text-lg text-gray-100 mb-6">Claims Lifecycle</h3>
            
            <div className="relative border-l-2 border-gray-800 ml-3 space-y-6">
              
              <TimelineItem 
                status="done" 
                title="1 · Intake" 
                desc="Customer submits claim form + docs" 
              />
              <TimelineItem 
                status="active" 
                title="2 · Registration" 
                desc="Claim ID assigned · Auto-routing" 
              />
              <TimelineItem 
                status="pending" 
                title="3 · Survey" 
                desc="Field inspection & report upload" 
              />
              <TimelineItem 
                status="pending" 
                title="4 · Assessment" 
                desc="Manager review + AI fraud check" 
              />
              <TimelineItem 
                status="pending" 
                title="5 · Settlement" 
                desc="Payment processing by Finance" 
              />
              <TimelineItem 
                status="pending" 
                title="6 · Closure" 
                desc="Records updated · Notifications sent" 
                isLast={true}
              />
              
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// Reusable Timeline Item Component
function TimelineItem({ status, title, desc, isLast }) {
  let dotColor = "bg-gray-800 border-gray-700";
  let titleColor = "text-gray-500";
  
  if (status === 'done') {
    dotColor = "bg-[#5BAD80] border-[#5BAD80] shadow-[0_0_10px_rgba(91,173,128,0.3)]";
    titleColor = "text-gray-200";
  } else if (status === 'active') {
    dotColor = "bg-brand-gold border-brand-gold shadow-[0_0_10px_rgba(201,168,76,0.5)]";
    titleColor = "text-brand-gold font-medium";
  }

  return (
    <div className={`relative pl-6 ${isLast ? '' : ''}`}>
      {/* The Dot */}
      <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 ${dotColor} z-10`}></div>
      
      {/* Content */}
      <div>
        <div className={`text-sm ${titleColor}`}>{title}</div>
        <div className="font-mono text-[10px] text-gray-500 mt-1">{desc}</div>
      </div>
    </div>
  );
}