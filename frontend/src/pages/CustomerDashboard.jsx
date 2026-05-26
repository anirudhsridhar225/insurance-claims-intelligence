import { Shield, FileText, Activity, Download, PlusCircle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CustomerDashboard() {
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in space-y-6">
      
      {/* Page Header */}
      <div>
        <p className="font-mono text-[10px] tracking-widest text-gray-500 uppercase mb-2">Module 2 · Customer View</p>
        <h1 className="font-serif text-3xl text-gray-100 mb-1">Customer Dashboard</h1>
        <p className="text-sm text-gray-400">Personal insurance portfolio, active policies, and claim history</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Column: Profile Card (Takes 1/4 space) */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-brand-surface border border-gray-800 rounded-xl p-6 shadow-lg text-center">
            <div className="w-16 h-16 mx-auto bg-brand-gold/20 text-brand-gold rounded-full flex items-center justify-center text-xl font-serif mb-4 border border-brand-gold/30">
              AM
            </div>
            <h2 className="font-serif text-xl text-gray-100 mb-1">Anita Mehta</h2>
            <p className="font-mono text-[10px] text-gray-500 mb-4">CUST-00841</p>
            <span className="bg-[#5BAD80]/10 text-[#5BAD80] border border-[#5BAD80]/20 text-[10px] font-mono px-3 py-1 rounded-full inline-block mb-6">
              KYC Verified
            </span>
            
            <div className="border-t border-gray-800 my-4"></div>
            
            <div className="text-left font-mono text-[11px] text-gray-400 space-y-3">
              <div className="flex justify-between">
                <span>Agent</span>
                <strong className="text-gray-200">Rajan Arora</strong>
              </div>
              <div className="flex justify-between">
                <span>Region</span>
                <strong className="text-gray-200">Mumbai North</strong>
              </div>
              <div className="flex justify-between">
                <span>Member Since</span>
                <strong className="text-gray-200">Jan 2023</strong>
              </div>
            </div>
            
            <div className="border-t border-gray-800 my-4"></div>
            
            <button className="w-full bg-brand-gold hover:bg-yellow-500 text-brand-ink font-semibold py-2.5 rounded-lg text-sm flex items-center justify-center gap-2 transition-colors">
              <PlusCircle size={16} /> File New Claim
            </button>
          </div>
        </div>

        {/* Right Column: Portfolio & Claims (Takes 3/4 space) */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Active Policies Section */}
          <div>
            <h3 className="font-serif text-lg text-brand-gold mb-4 flex items-center gap-2">
              <Shield size={18} /> My Policies
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Policy Card 1 */}
              <div className="bg-brand-ink border border-gray-800 hover:border-brand-gold/50 rounded-xl p-5 transition-colors group">
                <p className="font-mono text-[9px] tracking-widest text-[#4A90D9] uppercase mb-2">Health Insurance</p>
                <h4 className="font-serif text-lg text-gray-100 mb-1 group-hover:text-brand-gold transition-colors">IndividualShield Pro</h4>
                <p className="font-mono text-[10px] text-gray-500 mb-4">POL-2023-HLT-00482</p>
                <div className="border-t border-gray-800 my-3"></div>
                <div className="flex justify-between items-center text-xs font-mono text-gray-400">
                  <span>Sum Assured: <strong className="text-gray-200">₹ 5,00,000</strong></span>
                  <span className="bg-[#5BAD80]/10 text-[#5BAD80] px-2 py-0.5 rounded">Active</span>
                </div>
                <p className="font-mono text-[10px] text-gray-500 mt-3">Renewal: <span className="text-[#E05C6E]">12 Jun 2026</span></p>
              </div>

              {/* Policy Card 2 */}
              <div className="bg-brand-ink border border-gray-800 hover:border-brand-gold/50 rounded-xl p-5 transition-colors group">
                <p className="font-mono text-[9px] tracking-widest text-[#5BAD80] uppercase mb-2">Motor Insurance</p>
                <h4 className="font-serif text-lg text-gray-100 mb-1 group-hover:text-brand-gold transition-colors">Comprehensive Auto</h4>
                <p className="font-mono text-[10px] text-gray-500 mb-4">POL-2024-MTR-01192</p>
                <div className="border-t border-gray-800 my-3"></div>
                <div className="flex justify-between items-center text-xs font-mono text-gray-400">
                  <span>IDV: <strong className="text-gray-200">₹ 6,80,000</strong></span>
                  <span className="bg-[#5BAD80]/10 text-[#5BAD80] px-2 py-0.5 rounded">Active</span>
                </div>
                <p className="font-mono text-[10px] text-gray-500 mt-3">Renewal: 20 Sep 2026</p>
              </div>

            </div>
          </div>

          {/* Claim History Section */}
          <div className="bg-brand-surface border border-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="font-serif text-lg text-gray-100 mb-6 flex items-center gap-2">
              <Activity size={18} className="text-gray-400" /> Claim History
            </h3>
            
            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="font-mono text-[10px] text-gray-500 uppercase py-3 font-normal">Claim ID</th>
                    <th className="font-mono text-[10px] text-gray-500 uppercase py-3 font-normal">Type</th>
                    <th className="font-mono text-[10px] text-gray-500 uppercase py-3 font-normal">Amount</th>
                    <th className="font-mono text-[10px] text-gray-500 uppercase py-3 font-normal">Filed Date</th>
                    <th className="font-mono text-[10px] text-gray-500 uppercase py-3 font-normal">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-800/50 hover:bg-gray-800/20 transition-colors">
                    <td className="py-4 font-mono text-xs text-brand-gold">CLM-2026-00421</td>
                    <td className="py-4 text-sm text-gray-300">Health</td>
                    <td className="py-4 font-mono text-sm text-gray-200">₹ 38,400</td>
                    <td className="py-4 text-sm text-gray-400">12 Apr 2026</td>
                    <td className="py-4"><span className="bg-[#5BAD80]/10 text-[#5BAD80] border border-[#5BAD80]/20 text-[10px] font-mono px-2.5 py-1 rounded-full">Settled</span></td>
                  </tr>
                  <tr className="border-b border-gray-800/50 hover:bg-gray-800/20 transition-colors">
                    <td className="py-4 font-mono text-xs text-brand-gold">CLM-2025-01184</td>
                    <td className="py-4 text-sm text-gray-300">Motor</td>
                    <td className="py-4 font-mono text-sm text-gray-200">₹ 72,000</td>
                    <td className="py-4 text-sm text-gray-400">08 Nov 2025</td>
                    <td className="py-4"><span className="bg-[#C9A84C]/10 text-[#C9A84C] border border-[#C9A84C]/20 text-[10px] font-mono px-2.5 py-1 rounded-full">In Review</span></td>
                  </tr>
                  <tr className="hover:bg-gray-800/20 transition-colors">
                    <td className="py-4 font-mono text-xs text-brand-gold">CLM-2025-00392</td>
                    <td className="py-4 text-sm text-gray-300">Health</td>
                    <td className="py-4 font-mono text-sm text-gray-200">₹ 15,200</td>
                    <td className="py-4 text-sm text-gray-400">03 May 2025</td>
                    <td className="py-4"><span className="bg-[#5BAD80]/10 text-[#5BAD80] border border-[#5BAD80]/20 text-[10px] font-mono px-2.5 py-1 rounded-full">Settled</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}