import { useState } from 'react';
import { Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Login() {
  const [role, setRole] = useState('Admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const roles = ['Admin', 'Agent', 'Customer'];

  const handleLogin = (e) => {
    e.preventDefault();
    console.log({ role, email, password });
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-5rem)] animate-fade-in">
      <div className="bg-brand-surface border border-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden">
        
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-gold to-transparent opacity-50"></div>

        <div className="text-center mb-8">
          <div className="flex justify-center mb-3">
            <div className="bg-brand-gold/10 p-3 rounded-full border border-brand-gold/20 text-brand-gold">
              <ShieldCheck size={28} strokeWidth={1.5} />
            </div>
          </div>
          <h2 className="font-serif text-3xl text-gray-100 tracking-wide mb-1">
            Insurance<span className="text-brand-gold">IQ</span>
          </h2>
          <p className="text-gray-400 font-mono text-[10px] tracking-[0.2em] uppercase">
            Policy & Claims Intelligence Platform
          </p>
        </div>

        <div className="flex p-1 bg-brand-ink rounded-lg mb-6 border border-gray-800">
          {roles.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              className={`flex-1 py-2 text-xs font-mono rounded-md transition-all duration-200 ${
                role === r
                  ? 'bg-brand-gold text-brand-ink font-semibold shadow-sm'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block font-mono text-[10px] tracking-widest text-gray-400 uppercase mb-2">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                <Mail size={16} />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={`${role.toLowerCase()}@insuranceiq.in`}
                className="w-full pl-10 pr-4 py-2.5 bg-brand-ink border border-gray-700 rounded-lg text-sm text-gray-100 placeholder-gray-600 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-mono text-[10px] tracking-widest text-gray-400 uppercase mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                <Lock size={16} />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-brand-ink border border-gray-700 rounded-lg text-sm text-gray-100 placeholder-gray-600 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between mt-2">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input 
                type="checkbox" 
                className="w-3.5 h-3.5 accent-brand-gold bg-brand-ink border-gray-700 rounded cursor-pointer"
              />
              <span className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                Remember me
              </span>
            </label>
            <button type="button" className="text-xs text-brand-gold hover:text-yellow-400 transition-colors">
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full mt-2 bg-brand-gold hover:bg-yellow-500 text-brand-ink font-semibold py-2.5 rounded-lg text-sm flex items-center justify-center gap-2 transition-all duration-200"
          >
            Sign In <ArrowRight size={16} strokeWidth={2.5} />
          </button>
        </form>

        <div className="mt-8 pt-5 border-t border-gray-800 text-center">
          <p className="text-[10px] text-gray-500 font-mono">
            API: POST /api/auth/login · JWT + RBAC
          </p>
        </div>

      </div>
    </div>
  );
}