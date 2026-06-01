import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, Users, ShieldCheck, LogIn, FileText, 
  UserCircle, UploadCloud, ClipboardCheck, BrainCircuit, 
  BarChart3, Bell, Sun, Moon 
} from 'lucide-react';

export default function SideBar() {
  // Set default state to true so it loads in dark mode initially
  const [isDark, setIsDark] = useState(true);

  // This effect watches the isDark state and toggles the class on the <html> tag
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const navClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 font-mono text-xs tracking-wide rounded-lg transition-all duration-200 ${
      isActive 
        ? 'bg-brand-gold/10 text-brand-gold border border-brand-gold/20' 
        : 'text-gray-500 border border-transparent hover:text-gray-300 hover:bg-gray-800/30'
    }`;

  return (
    <aside className="w-64 h-screen sticky top-0 bg-brand-surface border-r border-gray-800 flex flex-col shrink-0 shadow-2xl z-50 transition-colors duration-300">
      
      {/* Brand Header */}
      <div className="p-6 border-b border-gray-800 mb-6 flex items-baseline gap-2 transition-colors duration-300">
        <ShieldCheck className="text-brand-gold shrink-0" size={24} />
        <h2 className="font-serif text-xl text-gray-100 tracking-wide">
          Insurance<span className="text-brand-gold">IQ</span>
        </h2>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 flex flex-col gap-1 px-4 overflow-y-auto no-scrollbar pb-6">
        <NavLink to="/" className={navClass}><LogIn size={16} /> · Login</NavLink>
        
        <div className="my-2 border-t border-gray-800 transition-colors duration-300"></div>
        
        <NavLink to="/admin" className={navClass}><LayoutDashboard size={16} /> · Admin</NavLink>
        <NavLink to="/agent" className={navClass}><Users size={16} /> · Agent</NavLink>
        <NavLink to="/customer" className={navClass}><UserCircle size={16} /> · Customer</NavLink>
        
        <div className="my-2 border-t border-gray-800 transition-colors duration-300"></div>
        
        <NavLink to="/kyc" className={navClass}><FileText size={16} /> · KYC Onboarding</NavLink>
        <NavLink to="/claims" className={navClass}><UploadCloud size={16} /> · Claims Intake</NavLink>
        <NavLink to="/assessment" className={navClass}><ClipboardCheck size={16} /> · Claims Review</NavLink>
        
        <div className="my-2 border-t border-gray-800 transition-colors duration-300"></div>
        
        <NavLink to="/fraud" className={navClass}><BrainCircuit size={16} /> · AI Fraud Score</NavLink>
        <NavLink to="/analytics" className={navClass}><BarChart3 size={16} /> · Analytics</NavLink>
        <NavLink to="/notifications" className={navClass}><Bell size={16} /> · Live Events</NavLink>
      </nav>

      {/* Footer & Theme Toggle */}
      <div className="p-4 border-t border-gray-800 flex items-center justify-between transition-colors duration-300">
        <div className="font-mono text-[9px] text-gray-500 uppercase tracking-widest">
          Capstone v1.0
        </div>
        
        {/* Theme Toggle Button */}
        <button 
          onClick={() => setIsDark(!isDark)}
          className="p-2 rounded-md bg-gray-800/30 text-gray-400 hover:text-brand-gold hover:bg-brand-gold/10 transition-all duration-200"
          aria-label="Toggle Theme"
        >
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>
    </aside>
  );
}