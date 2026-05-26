import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip, AreaChart, Area } from 'recharts';

export default function Analytics() {
  const lossRatioData = [
    { name: 'Motor', value: 68, fill: '#E05C6E' },
    { name: 'Health', value: 54, fill: '#C9A84C' },
    { name: 'Property', value: 45, fill: '#4A90D9' },
    { name: 'Life', value: 28, fill: '#5BAD80' },
  ];

  const trendData = [
    { name: 'Jan', policies: 120 }, { name: 'Feb', policies: 145 },
    { name: 'Mar', policies: 130 }, { name: 'Apr', policies: 170 },
    { name: 'May', policies: 190 },
  ];

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <p className="font-mono text-[10px] tracking-widest text-gray-500 uppercase mb-2">Module 5 · Data Analytics</p>
        <h1 className="font-serif text-3xl text-gray-100 mb-1">Performance Analytics</h1>
        <p className="text-sm text-gray-400">Claims trends, fraud patterns, agent performance, and loss ratio</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Loss Ratio Chart */}
        <div className="bg-brand-surface border border-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="font-serif text-lg text-gray-100 mb-1">Loss Ratio by Product</h3>
          <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-6">Target: &lt; 60%</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={lossRatioData} layout="vertical" margin={{ top: 0, right: 30, left: 0, bottom: 0 }}>
                <XAxis type="number" hide />
                <Tooltip cursor={{ fill: 'rgba(255,255,255,0.02)' }} contentStyle={{ backgroundColor: '#0D1117', borderColor: '#2A3A52', fontSize: '12px' }} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex flex-col gap-3 font-mono text-xs">
            {lossRatioData.map(d => (
              <div key={d.name} className="flex justify-between items-center">
                <span className="text-gray-400 w-24">{d.name}</span>
                <span style={{ color: d.fill }}>{d.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Policy Trend Chart */}
        <div className="bg-brand-surface border border-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="font-serif text-lg text-gray-100 mb-1">Policy Issuance Trend</h3>
          <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-6">YTD 2026</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPol" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C9A84C" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#C9A84C" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#4A5A72" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#0D1117', borderColor: '#2A3A52', fontSize: '12px' }} />
                <Area type="monotone" dataKey="policies" stroke="#C9A84C" strokeWidth={3} fillOpacity={1} fill="url(#colorPol)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}