import { 
  Phone, Mail, MessageSquare, ShieldCheck, 
  User, HardHat, Shield, HelpCircle, 
  ExternalLink, ChevronRight, Search
} from 'lucide-react';

const contactRoles = [
  {
    role: 'Admin / System Operations',
    name: 'Sarah Chen',
    email: 'admin.ops@duferco-logistics.com',
    phone: '+32 2 555 0100',
    description: 'System access, role permissions, and corporate reporting.',
    icon: Shield,
    color: 'bg-blue-50 text-blue-600'
  },
  {
    role: 'Terminal Manager',
    name: 'Marc Dubois',
    email: 'terminal.manager@duferco-logistics.com',
    phone: '+32 2 555 0122',
    description: 'Gate access issues, terminal capacity, and safety protocols.',
    icon: ShieldCheck,
    color: 'bg-orange-50 text-orange-600'
  },
  {
    role: 'Loading Manager',
    name: 'Thomas Weber',
    email: 'loading.ops@duferco-logistics.com',
    phone: '+32 2 555 0145',
    description: 'Bay scheduling, product availability, and loading verification.',
    icon: HardHat,
    color: 'bg-indigo-50 text-indigo-600'
  }
];

const faqs = [
  { q: 'How do I reset my terminal access PIN?', a: 'Contact the Terminal Manager directly or use the "Forgot PIN" link on the Gate Control login screen.' },
  { q: 'What should I do if the QR scanner fails?', a: 'Drivers can manually enter the Order ID and PIN at the gate console. Terminal Managers can also verify via the Gate Control dashboard.' },
  { q: 'How can I update my truck fleet size?', a: 'Admins can edit transporter profiles in the Transporters module. Navigate to System > Transporters to make changes.' }
];

export function HelpCenter() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      {/* Hero Section */}
      <div className="bg-[#0047AB] rounded-[40px] p-10 text-white relative overflow-hidden shadow-xl shadow-blue-900/20">
         <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
         <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
               <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-[9px] font-black tracking-[0.2em] uppercase mb-4">
                  Support Portal
               </div>
               <h1 className="text-4xl font-black tracking-tight mb-4 leading-tight">How can we help you today?</h1>
               <p className="text-white/70 text-sm font-medium leading-relaxed mb-8">
                  Get direct access to our terminal operations team or browse our intelligence base for immediate assistance.
               </p>
               <div className="relative group max-w-md">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 group-focus-within:text-white transition-colors" />
                  <input 
                     type="text" 
                     placeholder="Search for answers, contacts, or guides..."
                     className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl outline-none focus:bg-white/20 focus:border-white/40 transition-all text-sm font-bold placeholder:text-white/30"
                  />
               </div>
            </div>
            <div className="hidden lg:block">
               <HelpCircle className="w-48 h-48 opacity-10" />
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Contact Cards */}
         <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between px-2">
               <h2 className="text-lg font-black text-slate-900 tracking-tight uppercase">Operational Contacts</h2>
               <span className="text-[10px] font-black text-primary uppercase tracking-widest px-3 py-1 bg-primary/5 rounded-lg border border-primary/10">All Systems Online</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {contactRoles.map((contact, i) => (
                  <div key={i} className={`bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-all group ${i === 0 ? 'md:col-span-2' : ''}`}>
                     <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                           <div className={`w-14 h-14 rounded-2xl ${contact.color} flex items-center justify-center transition-transform group-hover:scale-110 duration-300`}>
                              <contact.icon className="w-7 h-7" />
                           </div>
                           <div>
                              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{contact.role}</div>
                              <div className="text-lg font-black text-slate-900 leading-none">{contact.name}</div>
                           </div>
                        </div>
                        <button className="p-2 text-slate-300 hover:text-primary transition-colors">
                           <MessageSquare className="w-5 h-5" />
                        </button>
                     </div>

                     <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-3 text-xs font-bold text-slate-600">
                           <Phone className="w-4 h-4 text-slate-300" />
                           {contact.phone}
                        </div>
                        <div className="flex items-center gap-3 text-xs font-bold text-slate-600">
                           <Mail className="w-4 h-4 text-slate-300" />
                           {contact.email}
                        </div>
                     </div>

                     <p className="text-[11px] font-medium text-slate-400 leading-relaxed">
                        {contact.description}
                     </p>
                  </div>
               ))}
            </div>
         </div>

         {/* Knowledge Base Sidebar */}
         <div className="space-y-6">
            <h2 className="text-lg font-black text-slate-900 tracking-tight uppercase px-2">Quick FAQs</h2>
            <div className="space-y-4">
               {faqs.map((faq, i) => (
                  <div key={i} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
                     <h4 className="text-xs font-black text-slate-900 mb-2 leading-relaxed">{faq.q}</h4>
                     <p className="text-[11px] font-medium text-slate-500 leading-relaxed">{faq.a}</p>
                  </div>
               ))}
            </div>

            <div className="bg-slate-900 rounded-[32px] p-6 text-white relative overflow-hidden group">
               <div className="relative z-10">
                  <h4 className="text-sm font-black mb-2 uppercase tracking-widest">Training Guides</h4>
                  <p className="text-white/50 text-[10px] font-medium mb-4 leading-relaxed">Download our latest operational handbooks and terminal safety guides.</p>
                  <button className="w-full flex items-center justify-center gap-2 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                     <ExternalLink className="w-3 h-3" />
                     Resource Center
                  </button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
