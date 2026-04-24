import { 
  Settings as SettingsIcon, Bell, Shield, 
  User, Globe, Cpu, Save, RefreshCw,
  Mail, MessageSquare, Lock, Terminal,
  Database, Zap
} from 'lucide-react';

export function Settings() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="flex items-center justify-between">
        <div>
           <h2 className="text-3xl font-black text-slate-900 tracking-tight">System Settings</h2>
           <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Platform Configuration & Preferences</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white text-sm font-black rounded-2xl shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-0.5 transition-all uppercase tracking-wider">
           <Save className="w-5 h-5" />
           Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         {/* Navigation Sidebar */}
         <div className="lg:col-span-3 space-y-2">
            {[
               { label: 'General', icon: Globe, active: true },
               { label: 'Security', icon: Lock, active: false },
               { label: 'Notifications', icon: Bell, active: false },
               { label: 'Terminal API', icon: Zap, active: false },
               { label: 'User Roles', icon: Shield, active: false },
               { label: 'Integrations', icon: Cpu, active: false },
            ].map((item) => (
               <button 
                  key={item.label}
                  className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${
                     item.active 
                     ? 'bg-white text-primary shadow-sm border border-slate-100' 
                     : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                  }`}
               >
                  <item.icon className="w-5 h-5" />
                  {item.label}
               </button>
            ))}
         </div>

         {/* Content Area */}
         <div className="lg:col-span-9 space-y-8">
            {/* General Section */}
            <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm space-y-10">
               <div className="flex items-center gap-4 border-b border-slate-50 pb-8">
                  <div className="w-14 h-14 rounded-[24px] bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100">
                     <Globe className="w-7 h-7" />
                  </div>
                  <div>
                     <h3 className="text-xl font-black text-slate-900 tracking-tight">General Configuration</h3>
                     <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Global platform settings</p>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Organization Name</label>
                     <input 
                        type="text"
                        defaultValue="Duferco Logistique - EU"
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 ring-primary/5 focus:bg-white focus:border-primary/20 transition-all text-sm font-black"
                     />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">System Timezone</label>
                     <select className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 ring-primary/5 focus:bg-white focus:border-primary/20 transition-all text-sm font-black">
                        <option>Central European Time (GMT+1)</option>
                        <option>UTC</option>
                        <option>Eastern Standard Time (GMT-5)</option>
                     </select>
                  </div>
               </div>

               <div className="space-y-6">
                  <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] pt-4">Terminal Operations</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="p-6 rounded-3xl border border-slate-100 bg-slate-50/50 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm text-primary">
                              <Terminal className="w-5 h-5" />
                           </div>
                           <div>
                              <p className="text-xs font-black text-slate-900">Auto-Bay Assignment</p>
                              <p className="text-[10px] font-bold text-slate-400 italic">Optimize bay usage automatically</p>
                           </div>
                        </div>
                        <div className="w-12 h-6 bg-primary rounded-full relative p-1 cursor-pointer">
                           <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                        </div>
                     </div>
                     <div className="p-6 rounded-3xl border border-slate-100 bg-slate-50/50 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm text-indigo-500">
                              <Shield className="w-5 h-5" />
                           </div>
                           <div>
                              <p className="text-xs font-black text-slate-900">Mandatory PPE Check</p>
                              <p className="text-[10px] font-bold text-slate-400 italic">Require photo proof at bay</p>
                           </div>
                        </div>
                        <div className="w-12 h-6 bg-primary rounded-full relative p-1 cursor-pointer">
                           <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Performance Panel */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {[
                  { label: 'Database Health', value: 'OPTIMAL', icon: Database, color: 'text-green-500' },
                  { label: 'API Latency', value: '12ms', icon: Zap, color: 'text-amber-500' },
                  { label: 'Last Sync', value: '2m ago', icon: RefreshCw, color: 'text-blue-500' },
               ].map((stat) => (
                  <div key={stat.label} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
                     <div className="flex items-center gap-3 mb-4">
                        <stat.icon className={`w-4 h-4 ${stat.color}`} />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</span>
                     </div>
                     <div className="text-xl font-black text-slate-900 tracking-tight">{stat.value}</div>
                  </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
}
