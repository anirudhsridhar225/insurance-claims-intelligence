import { Users, IndianRupee, Clock, ArrowRight, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AgentDashboard() {
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in space-y-6">
      
      {/* Page Header */}
      <div>
        <p className="font-mono text-[10px] tracking-widest text-gray-500 uppercase mb-2">Module 2 · Agent View</p>
        <h1 className="font-serif text-3xl text-gray-100 mb-1">Agent Dashboard</h1>
        <p className="text-sm text-gray-400">Personal sales pipeline, customer portfolio and renewal calendar · <span className="text-brand-gold">Rajan Arora</span></p>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-brand-surface border border-gray-800 rounded-xl p-5 relative overflow-hidden group shadow-lg">
          <div className="absolute top-0 left-0 w-full h-0.5 bg-[#5BAD80]"></div>
          <div className="flex items-start justify-between mb-2 text-gray-400"><Users size={20} /></div>
          <div className="font-serif text-3xl text-gray-100 mb-1">84</div>
          <div className="font-mono text-[10px] text-gray-400 uppercase tracking-wide mb-2">Policies Issued</div>
          <div className="text-[11px] text-[#5BAD80]">↑ 12 this month</div>
        </div>

        <div className="bg-brand-surface border border-gray-800 rounded-xl p-5 relative overflow-hidden group shadow-lg">
          <div className="absolute top-0 left-0 w-full h-0.5 bg-brand-gold"></div>
          <div className="flex items-start justify-between mb-2 text-gray-400"><IndianRupee size={20} /></div>
          <div className="font-serif text-3xl text-gray-100 mb-1">₹ 18.4L</div>
          <div className="font-mono text-[10px] text-gray-400 uppercase tracking-wide mb-2">Premium Collected</div>
          <div className="text-[11px] text-brand-gold">Target: ₹ 25L</div>
        </div>

        <div className="bg-brand-surface border border-gray-800 rounded-xl p-5 relative overflow-hidden group shadow-lg">
          <div className="absolute top-0 left-0 w-full h-0.5 bg-[#E05C6E]"></div>
          <div className="flex items-start justify-between mb-2 text-gray-400"><Clock size={20} /></div>
          <div className="font-serif text-3xl text-gray-100 mb-1">9</div>
          <div className="font-mono text-[10px] text-gray-400 uppercase tracking-wide mb-2">Renewals Due</div>
          <div className="text-[11px] text-[#E05C6E]">in next 7 days</div>
        </div>
      </div>

      {/* Main Split Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: My Customers (Takes up 2/3) */}
        <div className="lg:col-span-2 bg-brand-surface border border-gray-800 rounded-xl p-6 shadow-lg flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-serif text-lg text-gray-100">My Customers</h3>
            <button 
              onClick={() => navigate('/kyc')}
              className="bg-brand-gold hover:bg-yellow-500 text-brand-ink text-xs font-semibold py-1.5 px-4 rounded-md transition-colors"
            >
              + Onboard New
            </button>
          </div>
          
          <div className="overflow-x-auto no-scrollbar flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="font-mono text-[10px] text-gray-500 uppercase py-3 font-normal">Customer</th>
                  <th className="font-mono text-[10px] text-gray-500 uppercase py-3 font-normal">Policy Type</th>
                  <th className="font-mono text-[10px] text-gray-500 uppercase py-3 font-normal">Premium</th>
                  <th className="font-mono text-[10px] text-gray-500 uppercase py-3 font-normal">Renewal</th>
                  <th className="font-mono text-[10px] text-gray-500 uppercase py-3 font-normal text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-800/50 hover:bg-gray-800/20 transition-colors">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-brand-gold/20 text-brand-gold flex items-center justify-center text-xs font-bold">AM</div>
                      <span className="text-sm text-gray-200">Anita Mehta</span>
                    </div>
                  </td>
                  <td className="py-4"><span className="bg-[#4A90D9]/10 text-[#4A90D9] text-[10px] font-mono px-2.5 py-1 rounded-full border border-[#4A90D9]/20">Health</span></td>
                  <td className="py-4 font-mono text-sm text-gray-200">₹ 22,400</td>
                  <td className="py-4 text-sm text-gray-400">12 Jun 2026</td>
                  <td className="py-4 text-right"><button className="text-xs text-gray-400 hover:text-brand-gold transition-colors border border-gray-700 hover:border-brand-gold px-3 py-1 rounded">View</button></td>
                </tr>
                <tr className="border-b border-gray-800/50 hover:bg-gray-800/20 transition-colors">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#5BAD80]/20 text-[#5BAD80] flex items-center justify-center text-xs font-bold">SK</div>
                      <span className="text-sm text-gray-200">Suresh Kumar</span>
                    </div>
                  </td>
                  <td className="py-4"><span className="bg-[#5BAD80]/10 text-[#5BAD80] text-[10px] font-mono px-2.5 py-1 rounded-full border border-[#5BAD80]/20">Motor</span></td>
                  <td className="py-4 font-mono text-sm text-gray-200">₹ 8,900</td>
                  <td className="py-4 text-sm text-gray-400">04 Jun 2026</td>
                  <td className="py-4 text-right"><button className="text-xs text-gray-400 hover:text-brand-gold transition-colors border border-gray-700 hover:border-brand-gold px-3 py-1 rounded">View</button></td>
                </tr>
                <tr className="hover:bg-gray-800/20 transition-colors">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#E05C6E]/20 text-[#E05C6E] flex items-center justify-center text-xs font-bold">DP</div>
                      <span className="text-sm text-gray-200">Divya Pillai</span>
                    </div>
                  </td>
                  <td className="py-4"><span className="bg-[#C9A84C]/10 text-[#C9A84C] text-[10px] font-mono px-2.5 py-1 rounded-full border border-[#C9A84C]/20">Life</span></td>
                  <td className="py-4 font-mono text-sm text-gray-200">₹ 48,000</td>
                  <td className="py-4 text-sm text-gray-400">28 Jul 2026</td>
                  <td className="py-4 text-right"><button className="text-xs text-gray-400 hover:text-brand-gold transition-colors border border-gray-700 hover:border-brand-gold px-3 py-1 rounded">View</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Side: Commission Statement (Takes up 1/3) */}
        <div className="bg-brand-surface border border-gray-800 rounded-xl p-6 shadow-lg flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-serif text-lg text-gray-100">Commission</h3>
            <TrendingUp size={18} className="text-brand-gold" />
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center p-4 bg-brand-ink border border-gray-800 rounded-lg">
              <span className="text-xs text-gray-400">Total Earned (May)</span>
              <span className="font-mono text-sm text-brand-gold">₹ 36,800</span>
            </div>
            
            <div className="flex justify-between items-center p-4 bg-brand-ink border border-gray-800 rounded-lg">
              <span className="text-xs text-gray-400">Disbursed</span>
              <span className="font-mono text-sm text-[#5BAD80]">₹ 28,500</span>
            </div>
            
            <div className="flex justify-between items-center p-4 bg-brand-ink border border-gray-800 rounded-lg">
              <span className="text-xs text-gray-400">Pending</span>
              <span className="font-mono text-sm text-[#E05C6E]">₹ 8,300</span>
            </div>
            
            <div className="flex justify-between items-center p-4 bg-brand-gold/10 border border-brand-gold/20 rounded-lg mt-4">
              <span className="text-xs text-brand-gold font-medium">Target Achievement</span>
              <span className="font-mono text-sm text-brand-gold font-bold">73.6%</span>
            </div>
          </div>
          
          <div className="mt-auto pt-6 text-center">
             <button className="text-xs text-gray-400 hover:text-gray-200 font-mono tracking-widest uppercase transition-colors">
               Download Full Statement
             </button>
          </div>
        </div>

      </div>
    </div>
  );
}