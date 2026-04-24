import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth, UserRole } from '../../contexts/AuthContext';
import { Lock, Mail, ChevronRight, Loader2, Shield, Truck, Terminal, Container, RotateCw } from 'lucide-react';
import loginHero from '../../../login-hero.png';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('ADMIN');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const roles = [
    { id: 'ADMIN' as UserRole, label: 'Admin', icon: Shield, desc: 'Full System Control', email: 'admin@company.com' },
    { id: 'TRANSPORTER' as UserRole, label: 'Transporter', icon: Truck, desc: 'Manage Deliveries', email: 'transporter@company.com' },
    { id: 'TERMINAL_MANAGER' as UserRole, label: 'Checkpost Manager', icon: Terminal, desc: 'Terminal Operations', email: 'terminal@company.com' },
    { id: 'LOADING_MANAGER' as UserRole, label: 'Loading Manager', icon: Container, desc: 'Loading Supervision', email: 'loading@company.com' },
  ];

  const handleRoleSelect = (selectedRole: UserRole, roleEmail: string) => {
    setRole(selectedRole);
    setEmail(roleEmail);
    setPassword(selectedRole.toLowerCase() + '123');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await login(email, role);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white font-sans overflow-hidden">
      {/* Left Side: Illustration & Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 relative items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={loginHero} 
            alt="Duferco Logistique Terminal" 
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0047AB]/60 to-slate-900/90 mix-blend-multiply" />
        </div>
        
        <div className="relative z-10 p-12 text-center">
          <div className="w-32 h-32 bg-[#0047AB] backdrop-blur-xl rounded-tr-[50px] rounded-bl-[50px] flex flex-col items-center justify-center mx-auto mb-8 border border-white/20 shadow-2xl relative overflow-hidden group">
             <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-50" />
             <div className="relative z-10 flex flex-col items-center">
                <span className="text-[16px] font-black text-white tracking-tighter leading-none uppercase">DUFERCO</span>
                <div className="h-0.5 w-full bg-orange-500 my-1 rounded-full shadow-[0_0_8px_rgba(249,115,22,0.5)]" />
                <span className="text-[10px] font-bold text-white tracking-[0.3em] leading-none uppercase">LOGISTIQUE</span>
             </div>
          </div>
          <h1 className="text-5xl font-black text-white tracking-tighter mb-4 leading-none uppercase">
            Execution<br/><span className="text-orange-500">System</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-md mx-auto leading-relaxed">
            Streamlining global supply chains with real-time tracking, automated dispatching, and intelligent fleet management.
          </p>
        </div>
        
        {/* Animated Orbs */}
        <div className="absolute top-1/4 -left-20 w-64 h-64 bg-[#0047AB]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Right Side: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-20 bg-[#F9FBFC]">
        <div className="w-full max-w-xl">
          <div className="mb-10 text-center lg:text-left">
            <div className="flex flex-col items-center lg:items-start mb-8">
              <div className="w-20 h-20 bg-[#0047AB] rounded-tr-[30px] rounded-bl-[30px] flex flex-col items-center justify-center mb-3 shadow-xl border border-blue-100/20">
                <span className="text-[11px] font-black text-white tracking-tighter leading-none uppercase">DUFERCO</span>
                <div className="h-0.5 w-1/2 bg-orange-500 my-0.5 rounded-full" />
                <span className="text-[6px] font-bold text-white tracking-[0.2em] leading-none uppercase">LOGISTIQUE</span>
              </div>
              <h1 className="text-xl font-black text-slate-900 tracking-tighter uppercase">Execution <span className="text-orange-500">System</span></h1>
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Welcome Back</h2>
            <p className="text-slate-500 mt-2 font-medium">Please select your role and sign in to your account.</p>
          </div>

          {/* Role Selection */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            {roles.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => handleRoleSelect(r.id, r.email)}
                className={`p-4 rounded-2xl border-2 transition-all duration-300 text-left group ${
                  role === r.id 
                    ? 'border-primary bg-white shadow-xl shadow-primary/10 ring-4 ring-primary/5' 
                    : 'border-slate-100 bg-slate-50/50 hover:border-slate-200 hover:bg-white'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-colors ${
                  role === r.id ? 'bg-primary text-white' : 'bg-slate-100 text-slate-400 group-hover:text-slate-600'
                }`}>
                  <r.icon className="w-5 h-5" />
                </div>
                <div className={`text-xs font-bold uppercase tracking-wider mb-0.5 ${role === r.id ? 'text-primary' : 'text-slate-400'}`}>
                  {r.label}
                </div>
                <div className="text-[10px] text-slate-400 font-medium truncate">{r.desc}</div>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-primary transition-colors" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-100 rounded-2xl outline-none focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all text-sm font-medium shadow-sm"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between px-1">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Password</label>
                <button type="button" className="text-[11px] font-bold text-primary hover:underline">Forgot?</button>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-primary transition-colors" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-100 rounded-2xl outline-none focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all text-sm font-medium shadow-sm"
                  required
                />
              </div>
            </div>

            <div className="flex items-center gap-2 px-1">
              <input type="checkbox" id="remember" className="w-4 h-4 rounded border-slate-200 text-primary focus:ring-primary/20" />
              <label htmlFor="remember" className="text-xs text-slate-500 font-medium">Keep me signed in for 30 days</label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:hover:translate-y-0 mt-4 group"
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Sign In to Dashboard
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Compact System Info Cards */}
          <div className="mt-8 grid grid-cols-2 gap-4">
             <div className="p-4 bg-white border border-slate-100 rounded-2xl flex items-center gap-3 shadow-sm hover:shadow-md transition-all group">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-500 flex items-center justify-center">
                   <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <div>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">System Status</p>
                   <p className="text-xs font-black text-slate-900">Operational</p>
                </div>
             </div>
             <div className="p-4 bg-white border border-slate-100 rounded-2xl flex items-center gap-3 shadow-sm hover:shadow-md transition-all">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center">
                   <RotateCw className="w-4 h-4" />
                </div>
                <div>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Last Sync</p>
                   <p className="text-xs font-black text-slate-900">2m ago</p>
                </div>
             </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-slate-400 text-xs font-medium">
              Don't have an account? <button className="text-primary font-bold hover:underline">Contact Administrator</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
