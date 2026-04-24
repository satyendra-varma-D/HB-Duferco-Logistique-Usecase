import { FileText, Download, Eye, ExternalLink, Calendar, User, Clock, CheckCircle2, QrCode, Link2, Copy, AlertCircle, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router';

export function OrderDocumentsTab({ order, isVerified }: { order: any, isVerified?: boolean }) {
  const documents = [
    { id: 'DOC-5001', name: 'Delivery Note', type: 'PDF', date: '2026-04-23 10:30', status: 'GENERATED' },
    { id: 'DOC-5002', name: 'Loading Certificate', type: 'PDF', date: '2026-04-23 09:45', status: 'SIGNED' },
    { id: 'DOC-5003', name: 'Gate Pass', type: 'PDF', date: '2026-04-23 08:15', status: 'GENERATED' },
  ];

  const orderId = order?.id || 'ORD-UNKNOWN';
  const isExpired = order?.status === 'COMPLETED' || order?.status === 'EXITED';
  const passUrl = `${window.location.origin}/terminal-pass/${orderId}`;

  const handleCopy = () => {
    if (isExpired) return;
    navigator.clipboard.writeText(passUrl);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Digital Links Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-2">
           <Link2 className="w-5 h-5 text-primary" />
           <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">Digital Access Links</h3>
        </div>
        
        {isExpired ? (
          <div className="bg-slate-100 border-2 border-slate-200 p-8 rounded-[32px] relative overflow-hidden group shadow-inner">
            <div className="absolute top-0 right-0 p-6 opacity-5">
               <AlertCircle className="w-24 h-24" />
            </div>
            
            <div className="relative z-10 flex flex-col items-center text-center">
               <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center mb-4 text-red-500 shadow-sm border border-red-50">
                  <Clock className="w-6 h-6" />
               </div>
               <h4 className="text-base font-black text-slate-900 tracking-tight">Security Protocol: Link Expired</h4>
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed mt-2">
                  This trip has been completed. Access to the digital terminal pass <br />
                  and tracking URLs has been <span className="text-red-500">permanently revoked</span>.
               </p>
               
               <div className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-[9px] font-black text-slate-500 uppercase tracking-widest shadow-sm">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Operational Archive
               </div>
            </div>
          </div>
        ) : isVerified ? (
          <div className="bg-[#0047AB] p-6 rounded-[32px] text-white relative overflow-hidden group border border-blue-400/20 shadow-xl shadow-blue-900/10">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform duration-500">
               <QrCode className="w-24 h-24" />
            </div>
            
            <div className="relative z-10 space-y-4">
               <div>
                  <div className="flex items-center gap-2 mb-1">
                     <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                     <span className="text-[10px] font-black uppercase tracking-widest text-blue-200">Live Access Pass</span>
                  </div>
                  <h4 className="text-base font-black tracking-tight">Driver Digital Terminal Pass</h4>
               </div>

               <div className="flex flex-col sm:flex-row gap-3">
                  <Link 
                    to={`/terminal-pass/${orderId}`}
                    target="_blank"
                    className="flex-1 px-5 py-3 bg-white text-[#0047AB] text-[10px] font-black rounded-xl uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-slate-50 transition-all shadow-lg shadow-blue-900/20"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Open Pass
                  </Link>
                  <button 
                    onClick={handleCopy}
                    className="px-5 py-3 bg-white/10 border border-white/20 text-white text-[10px] font-black rounded-xl uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white/20 transition-all"
                  >
                    <Copy className="w-4 h-4" />
                    Copy Link
                  </button>
               </div>
            </div>
          </div>
        ) : (
          <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[32px] p-8 text-center">
             <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center mx-auto mb-4 text-slate-300">
                <QrCode className="w-6 h-6" />
             </div>
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-relaxed">
                Digital Pass will be generated after <br />
                <span className="text-primary">Admin verification</span> of pickup schedule.
             </p>
          </div>
        )}
      </div>

      {/* Documents Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-2">
           <FileText className="w-5 h-5 text-primary" />
           <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">Trip Documentation</h3>
        </div>

        <div className="space-y-3">
          {documents.map((doc) => (
            <div key={doc.id} className="group bg-white border border-slate-100 p-5 rounded-[24px] hover:border-primary/20 hover:shadow-lg hover:shadow-slate-200/20 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-all border border-slate-100">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900 tracking-tight">{doc.name}</h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{doc.id} • {doc.type}</p>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider ${
                  doc.status === 'SIGNED' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'
                }`}>
                  {doc.status}
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-slate-50 pt-4">
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <Calendar className="w-3.5 h-3.5" />
                  {doc.date}
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-slate-300 hover:text-primary transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-slate-300 hover:text-primary transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-2">
        <button className="w-full py-4 border-2 border-dashed border-slate-100 rounded-2xl text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] hover:border-primary/20 hover:text-primary transition-all flex items-center justify-center gap-2">
           <ExternalLink className="w-4 h-4" />
           Open Document Center
        </button>
      </div>
    </div>
  );
}
