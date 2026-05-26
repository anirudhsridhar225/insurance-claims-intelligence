import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, ShieldCheck, LogIn, FileText, UserCircle, UploadCloud, ClipboardCheck, BrainCircuit, BarChart3, Bell } from 'lucide-react';

export default function SideBar() {
  const navClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 font-mono text-xs tracking-wide rounded-lg transition-all duration-200 ${
      isActive ? 'bg-brand-gold/10 text-brand-gold border border-brand-gold/20' : 'text-gray-500 border border-transparent hover:text-gray-300 hover:bg-gray-800/30'
    }`;

  return (
    <aside className="w-64 h-screen sticky top-0 bg-brand-surface border-r border-gray-800 flex flex-col shrink-0 shadow-2xl z-50">
      <div className="p-6 border-b border-gray-800 mb-6 flex items-baseline gap-2">
        <ShieldCheck className="text-brand-gold shrink-0" size={24} />
        <h2 className="font-serif text-xl text-gray-100 tracking-wide">Insurance<span className="text-brand-gold">IQ</span></h2>
      </div>

      <nav className="flex-1 flex flex-col gap-1 px-4 overflow-y-auto no-scrollbar pb-6">
        <NavLink to="/" className={navClass}><LogIn size={16} /> 01 · Login</NavLink>
        <div className="my-2 border-t border-gray-800"></div>
        <NavLink to="/admin" className={navClass}><LayoutDashboard size={16} /> 02 · Admin</NavLink>
        <NavLink to="/agent" className={navClass}><Users size={16} /> 03 · Agent</NavLink>
        <NavLink to="/customer" className={navClass}><UserCircle size={16} /> 04 · Customer</NavLink>
        <div className="my-2 border-t border-gray-800"></div>
        <NavLink to="/kyc" className={navClass}><FileText size={16} /> 05 · KYC Onboarding</NavLink>
        <NavLink to="/claims" className={navClass}><UploadCloud size={16} /> 07 · Claims Intake</NavLink>
        <NavLink to="/assessment" className={navClass}><ClipboardCheck size={16} /> 08 · Claims Review</NavLink>
        <div className="my-2 border-t border-gray-800"></div>
        <NavLink to="/fraud" className={navClass}><BrainCircuit size={16} /> 09 · AI Fraud Score</NavLink>
        <NavLink to="/analytics" className={navClass}><BarChart3 size={16} /> 10 · Analytics</NavLink>
        <NavLink to="/notifications" className={navClass}><Bell size={16} /> 11 · Live Events</NavLink>
      </nav>
    </aside>
  );
}