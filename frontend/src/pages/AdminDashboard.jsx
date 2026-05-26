import { TrendingUp, Users, AlertCircle, FileText, ArrowRight } from 'lucide-react';
import { 
  BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from 'recharts';

export default function AdminDashboard() {
  // --- Dummy Data for Recharts ---
  const portfolioData = [
    { name: 'JAN', motor: 65, health: 85 },
    { name: 'FEB', motor: 72, health: 90 },
    { name: 'MAR', motor: 68, health: 95 },
    { name: 'APR', motor: 80, health: 110 },
    { name: 'MAY', motor: 88, health: 120 },
  ];

  const claimsData = [
    { name: 'Settled', value: 46, color: '#5BAD80' }, // Sage
    { name: 'In Review', value: 26, color: '#C9A84C' }, // Gold
    { name: 'Rejected', value: 18, color: '#E05C6E' }, // Rose
    { name: 'Pending', value: 10, color: '#4A90D9' }, // Sky
  ];

  return (
    <div className="animate-fade-in space-y-6">
      
      {/* Page Header */}
      <div>
        <p className="font-mono text-[10px] tracking-widest text-gray-500 uppercase mb-2">Module 1 · Admin View</p>
        <h1 className="font-serif text-3xl text-gray-100 mb-1">Admin Dashboard</h1>
        <p className="text-sm text-gray-400">Company-wide portfolio overview — policies, claims, agents, fraud activity</p>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          icon={<FileText size={20} />} title="Active Policies" value="12,480" 
          trend="↑ 340 this month" trendColor="text-[#5BAD80]" accent="bg-[#5BAD80]"
        />
        <StatCard 
          icon={<FileText size={20} />} title="Claims Pending" value="1,924" 
          trend="438 in review" trendColor="text-[#C9A84C]" accent="bg-[#C9A84C]"
        />
        <StatCard 
          icon={<Users size={20} />} title="Active Agents" value="286" 
          trend="across 12 regions" trendColor="text-gray-400" accent="bg-[#4A90D9]"
        />
        <StatCard 
          icon={<AlertCircle size={20} />} title="Fraud Flagged" value="142" 
          trend="↑ 7.3% fraud rate" trendColor="text-[#E05C6E]" accent="bg-[#E05C6E]"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Bar Chart */}
        <div className="bg-brand-surface border border-gray-800 rounded-xl p-6 shadow-lg">
          <div className="mb-6">
            <h3 className="font-serif text-lg text-gray-100">Claims Received vs. Settled</h3>
            <p className="font-mono text-[10px] text-gray-500 tracking-wider mt-1 uppercase">Jan - May 2026</p>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={portfolioData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#4A5A72" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{ backgroundColor: '#0D1117', borderColor: '#2A3A52', fontSize: '12px' }} 
                />
                <Bar dataKey="health" fill="#4A90D9" radius={[4, 4, 0, 0]} name="Received" opacity={0.8} />
                <Bar dataKey="motor" fill="#5BAD80" radius={[4, 4, 0, 0]} name="Settled" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Donut Chart */}
        <div className="bg-brand-surface border border-gray-800 rounded-xl p-6 shadow-lg flex flex-col">
          <div className="mb-2">
            <h3 className="font-serif text-lg text-gray-100">Claims Status Split</h3>
            <p className="font-mono text-[10px] text-gray-500 tracking-wider mt-1 uppercase">Current Pipeline (1,924 Total)</p>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="h-48 w-48 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={claimsData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {claimsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0D1117', borderColor: '#2A3A52', fontSize: '12px' }} 
                    itemStyle={{ color: '#fff' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              {/* Center Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="font-serif text-2xl text-gray-100">1,924</span>
                <span className="font-mono text-[9px] text-gray-500">TOTAL</span>
              </div>
            </div>
            
            {/* Custom Legend */}
            <div className="ml-8 flex flex-col gap-3">
              {claimsData.map((item) => (
                <div key={item.name} className="flex items-center gap-2 text-xs text-gray-300">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                  {item.name} <span className="text-gray-500 ml-1">({item.value}%)</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Table */}
      <div className="bg-brand-surface border border-gray-800 rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-serif text-lg text-gray-100">Top Agents This Month</h3>
          <button className="text-xs text-gray-400 hover:text-brand-gold font-medium flex items-center gap-1 transition-colors">
            View All <ArrowRight size={14} />
          </button>
        </div>
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="font-mono text-[10px] text-gray-500 uppercase py-3 font-normal">Agent</th>
                <th className="font-mono text-[10px] text-gray-500 uppercase py-3 font-normal">Region</th>
                <th className="font-mono text-[10px] text-gray-500 uppercase py-3 font-normal">Policies Issued</th>
                <th className="font-mono text-[10px] text-gray-500 uppercase py-3 font-normal">Premium</th>
                <th className="font-mono text-[10px] text-gray-500 uppercase py-3 font-normal">Status</th>
              </tr>
            </thead>
            <tbody>
              {/* Row 1 */}
              <tr className="border-b border-gray-800/50 hover:bg-gray-800/20 transition-colors">
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-brand-gold/20 text-brand-gold flex items-center justify-center text-xs font-bold">RA</div>
                    <span className="text-sm text-gray-200">Rajan Arora</span>
                  </div>
                </td>
                <td className="py-4 text-sm text-gray-400">Mumbai North</td>
                <td className="py-4 text-sm text-gray-200">84</td>
                <td className="py-4 font-mono text-sm text-gray-200">₹ 18.4L</td>
                <td className="py-4">
                  <span className="bg-[#5BAD80]/10 text-[#5BAD80] text-[10px] font-mono px-2.5 py-1 rounded-full border border-[#5BAD80]/20">Active</span>
                </td>
              </tr>
              {/* Row 2 */}
              <tr className="border-b border-gray-800/50 hover:bg-gray-800/20 transition-colors">
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#4A90D9]/20 text-[#4A90D9] flex items-center justify-center text-xs font-bold">PS</div>
                    <span className="text-sm text-gray-200">Preethi S.</span>
                  </div>
                </td>
                <td className="py-4 text-sm text-gray-400">Bengaluru</td>
                <td className="py-4 text-sm text-gray-200">76</td>
                <td className="py-4 font-mono text-sm text-gray-200">₹ 15.9L</td>
                <td className="py-4">
                  <span className="bg-[#5BAD80]/10 text-[#5BAD80] text-[10px] font-mono px-2.5 py-1 rounded-full border border-[#5BAD80]/20">Active</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Internal reusable component for the top stat cards
function StatCard({ icon, title, value, trend, trendColor, accent }) {
  return (
    <div className="bg-brand-surface border border-gray-800 rounded-xl p-5 relative overflow-hidden group shadow-lg">
      <div className={`absolute top-0 left-0 w-full h-0.5 ${accent}`}></div>
      <div className="flex items-start justify-between mb-2">
        <div className="text-gray-400 group-hover:text-gray-300 transition-colors">{icon}</div>
      </div>
      <div className="font-serif text-3xl text-gray-100 mb-1">{value}</div>
      <div className="font-mono text-[10px] text-gray-400 uppercase tracking-wide mb-2">{title}</div>
      <div className={`text-[11px] ${trendColor}`}>{trend}</div>
    </div>
  );
}