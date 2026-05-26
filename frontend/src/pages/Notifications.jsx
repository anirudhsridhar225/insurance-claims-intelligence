import { Bell, Zap, ShieldAlert, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Notifications() {
  return (
    <div className="animate-fade-in space-y-6 max-w-4xl">
      <div>
        <p className="font-mono text-[10px] tracking-widest text-[#4A90D9] uppercase mb-2">Module 6 · NodeJS + Socket.IO</p>
        <h1 className="font-serif text-3xl text-gray-100 mb-1">Notifications Centre</h1>
        <p className="text-sm text-gray-400">Real-time event alerts via Socket.IO WebSocket connections</p>
      </div>

      <div className="bg-brand-surface border border-gray-800 rounded-xl p-6 shadow-lg relative overflow-hidden">
        <div className="absolute top-6 right-6 flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5BAD80] opacity-75"></span><span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#5BAD80]"></span></span>
          <span className="font-mono text-[10px] text-[#5BAD80] uppercase tracking-widest">Live Connection</span>
        </div>

        <h3 className="font-serif text-lg text-gray-100 mb-6 flex items-center gap-2"><Bell size={18}/> Event Feed</h3>

        <div className="space-y-4">
          <NotificationRow icon={<ShieldAlert size={16}/>} color="text-[#E05C6E]" bg="bg-[#E05C6E]/10" title="⚠ Fraud score generated — CLM-2026-00847" desc="Just now · Suresh Kumar · Motor · Risk: 78%" badge="Fraud Alert" badgeColor="text-[#E05C6E] border-[#E05C6E]/30" />
          <NotificationRow icon={<AlertCircle size={16}/>} color="text-brand-gold" bg="bg-brand-gold/10" title="🔔 New claim filed — CLM-2026-00847" desc="3 min ago · Assigned to Claims Manager: Roopa V." badge="New Claim" badgeColor="text-brand-gold border-brand-gold/30" />
          <NotificationRow icon={<CheckCircle2 size={16}/>} color="text-[#5BAD80]" bg="bg-[#5BAD80]/10" title="✓ Claim settled — CLM-2026-00421" desc="18 min ago · ₹ 38,400 disbursed · Health claim" badge="Settlement" badgeColor="text-[#5BAD80] border-[#5BAD80]/30" />
          <NotificationRow icon={<Zap size={16}/>} color="text-[#4A90D9]" bg="bg-[#4A90D9]/10" title="💳 Premium payment received — Divya Pillai" desc="2 hrs ago · ₹ 48,000 · Life Insurance · Annual" badge="Payment" badgeColor="text-[#4A90D9] border-[#4A90D9]/30" />
        </div>
      </div>
    </div>
  );
}

function NotificationRow({ icon, color, bg, title, desc, badge, badgeColor }) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-lg bg-brand-ink border border-gray-800 hover:border-gray-700 transition-colors">
      <div className={`mt-1 w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${bg} ${color}`}>
        {icon}
      </div>
      <div className="flex-1">
        <div className="text-sm text-gray-200 font-medium mb-1">{title}</div>
        <div className="font-mono text-[10px] text-gray-500">{desc}</div>
      </div>
      <div className={`text-[9px] font-mono px-2.5 py-1 rounded-full border ${badgeColor}`}>
        {badge}
      </div>
    </div>
  );
}