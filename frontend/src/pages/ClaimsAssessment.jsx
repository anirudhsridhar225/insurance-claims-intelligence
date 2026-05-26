import { CheckCircle, XCircle, AlertTriangle, ShieldAlert, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ClaimsAssessment() {
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <p className="font-mono text-[10px] tracking-widest text-gray-500 uppercase mb-2">Module 3 · Claims Manager View</p>
        <h1 className="font-serif text-3xl text-gray-100 mb-1">Claims Assessment</h1>
        <p className="text-sm text-gray-400">Review, approve, or reject claims based on survey data and AI fraud scores</p>
      </div>

      <div className="bg-brand-surface border border-gray-800 rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-serif text-lg text-gray-100">Assessment Queue</h3>
          <div className="flex gap-4">
            <select className="px-3 py-1.5 bg-brand-ink border border-gray-700 rounded-lg text-xs text-gray-300 focus:border-brand-gold outline-none">
              <option>All Risk Levels</option>
              <option>High Risk</option>
            </select>
            <input type="text" placeholder="Search ID..." className="px-3 py-1.5 bg-brand-ink border border-gray-700 rounded-lg text-xs text-gray-300 focus:border-brand-gold outline-none w-48" />
          </div>
        </div>

        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="font-mono text-[10px] text-gray-500 uppercase py-3">Claim ID</th>
                <th className="font-mono text-[10px] text-gray-500 uppercase py-3">Customer</th>
                <th className="font-mono text-[10px] text-gray-500 uppercase py-3">Amount</th>
                <th className="font-mono text-[10px] text-gray-500 uppercase py-3 w-48">AI Fraud Score</th>
                <th className="font-mono text-[10px] text-gray-500 uppercase py-3">Status</th>
                <th className="font-mono text-[10px] text-gray-500 uppercase py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Row 1 - High Risk */}
              <tr className="border-b border-gray-800/50 hover:bg-gray-800/20">
                <td className="py-4 font-mono text-xs text-brand-gold">CLM-2026-00847</td>
                <td className="py-4 text-sm text-gray-200">Suresh Kumar</td>
                <td className="py-4 font-mono text-sm text-gray-200">₹ 95,000</td>
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden"><div className="h-full bg-[#E05C6E] w-[78%]"></div></div>
                    <span className="font-mono text-xs text-[#E05C6E]">78%</span>
                  </div>
                </td>
                <td className="py-4"><span className="bg-[#E05C6E]/10 text-[#E05C6E] border border-[#E05C6E]/20 text-[10px] font-mono px-2 py-0.5 rounded-full flex items-center gap-1 w-max"><AlertTriangle size={10} /> High Risk</span></td>
                <td className="py-4 text-right">
                  <button onClick={() => navigate('/fraud')} className="bg-brand-ink border border-gray-700 hover:border-brand-gold text-brand-gold text-xs px-3 py-1.5 rounded transition-colors mr-2">View AI Report</button>
                  <button className="bg-[#E05C6E]/10 hover:bg-[#E05C6E]/20 text-[#E05C6E] border border-[#E05C6E]/20 text-xs px-3 py-1.5 rounded transition-colors">Reject</button>
                </td>
              </tr>
              {/* Row 2 - Low Risk */}
              <tr className="hover:bg-gray-800/20">
                <td className="py-4 font-mono text-xs text-brand-gold">CLM-2026-00421</td>
                <td className="py-4 text-sm text-gray-200">Anita Mehta</td>
                <td className="py-4 font-mono text-sm text-gray-200">₹ 38,400</td>
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden"><div className="h-full bg-[#5BAD80] w-[22%]"></div></div>
                    <span className="font-mono text-xs text-[#5BAD80]">22%</span>
                  </div>
                </td>
                <td className="py-4"><span className="bg-[#5BAD80]/10 text-[#5BAD80] border border-[#5BAD80]/20 text-[10px] font-mono px-2 py-0.5 rounded-full flex items-center gap-1 w-max"><CheckCircle size={10} /> Low Risk</span></td>
                <td className="py-4 text-right">
                  <button className="bg-[#5BAD80] hover:bg-[#4a936a] text-brand-ink font-semibold text-xs px-4 py-1.5 rounded transition-colors mr-2">Approve</button>
                  <button className="bg-brand-ink border border-gray-700 hover:border-gray-500 text-gray-300 text-xs px-3 py-1.5 rounded transition-colors">Hold</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}