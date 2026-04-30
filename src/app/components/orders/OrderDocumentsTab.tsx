import { useState } from 'react';
import { 
  FileText, Download, Eye, ExternalLink, Calendar, User, 
  Clock, CheckCircle2, QrCode, Link2, Copy, AlertCircle, 
  ShieldCheck, Search, Info, Trash2, X, FileSearch
} from 'lucide-react';
import { Link } from 'react-router';

export function OrderDocumentsTab({ order, isVerified }: { order: any, isVerified?: boolean }) {
  const [previewDoc, setPreviewDoc] = useState<any>(null);
  
  const documents = [
    { id: 'DOC-5001', name: 'Delivery Note', type: 'PDF', date: '2026-04-23 10:30', status: 'GENERATED', size: '1.2 MB', author: 'System' },
    { id: 'DOC-5002', name: 'Loading Certificate', type: 'PDF', date: '2026-04-23 09:45', status: 'SIGNED', size: '2.4 MB', author: 'Terminal Mgr' },
    { id: 'DOC-5003', name: 'Gate Pass', type: 'PDF', date: '2026-04-23 08:15', status: 'GENERATED', size: '0.8 MB', author: 'Gate Op' },
    { id: 'DOC-5004', name: 'Invoice', type: 'PDF', date: '2026-04-23 08:00', status: 'GENERATED', size: '1.5 MB', author: 'Finance' },
  ];

  const orderId = order?.id || 'ORD-UNKNOWN';
  const isExpired = order?.status === 'COMPLETED' || order?.status === 'EXITED';
  const passUrl = `${window.location.origin}/terminal-pass/${orderId}`;

  const handleCopy = () => {
    if (isExpired) return;
    navigator.clipboard.writeText(passUrl);
    alert('Link copied to clipboard!');
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      
      {/* 1. DIGITAL ACCESS SECTION (Blue Theme) */}
      {isVerified && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className={`lg:col-span-2 p-8 rounded-[32px] relative overflow-hidden group border shadow-xl ${
            isExpired 
            ? 'bg-slate-50 border-slate-200 text-slate-400' 
            : 'bg-[#0047AB] border-blue-400/20 text-white shadow-blue-900/10'
          }`}>
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
               <QrCode className="w-24 h-24" />
            </div>
            
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                   <div className={`w-2 h-2 rounded-full ${isExpired ? 'bg-slate-300' : 'bg-blue-300 animate-pulse'}`} />
                   <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Digital Terminal Pass</span>
                </div>
                <h4 className="text-xl font-black tracking-tight leading-tight">
                  {isExpired ? 'Access Link Expired' : 'Active Driver Access Link'}
                </h4>
                <p className="text-xs font-medium opacity-50 max-w-[400px]">
                  {isExpired 
                    ? 'Security protocol: This link has been permanently deactivated following trip completion.' 
                    : 'Secure encrypted link for terminal entry and loading verification. Valid until trip completion.'}
                </p>
              </div>

              {!isExpired && (
                <div className="flex gap-3">
                  <Link 
                    to={`/terminal-pass/${orderId}`}
                    target="_blank"
                    className="px-6 py-4 bg-white text-[#0047AB] text-xs font-black rounded-2xl uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-blue-50 transition-all shadow-lg shadow-white/5"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Open
                  </Link>
                  <button 
                    onClick={handleCopy}
                    className="px-6 py-4 bg-white/10 text-white text-xs font-black rounded-2xl uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-white/20 transition-all border border-white/10"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-[32px] p-8 flex flex-col items-center justify-center text-center group">
             <div className="w-12 h-12 rounded-2xl bg-white border border-blue-50 shadow-sm flex items-center justify-center text-[#0047AB] mb-4 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
             </div>
             <span className="text-[10px] font-black text-[#0047AB] uppercase tracking-widest mb-1">Security Status</span>
             <span className="text-xs font-bold text-blue-300 uppercase tracking-widest">TLS 1.3 Encrypted</span>
          </div>
        </div>
      )}

      {/* 2. DOCUMENT LISTING SECTION (Blue Accents) */}
      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
        {/* Table Header */}
        <div className="px-10 py-8 border-b border-slate-50 flex items-center justify-between bg-blue-50/20">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-2xl bg-[#0047AB] flex items-center justify-center text-white shadow-xl shadow-blue-900/10">
                <FileText className="w-6 h-6" />
             </div>
             <div>
                <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">Trip Documentation</h3>
                <p className="text-[10px] font-bold text-[#0047AB] uppercase tracking-widest mt-0.5">Secure PDF Archive • {documents.length} Files</p>
             </div>
          </div>
          <div className="flex items-center gap-3 px-5 py-2.5 bg-white rounded-2xl border border-blue-100 text-[10px] font-black text-[#0047AB] uppercase tracking-widest shadow-sm hover:shadow-md transition-all cursor-pointer">
             <Search className="w-4 h-4" />
             Search Archive
          </div>
        </div>

        {/* List Content */}
        <div className="divide-y divide-slate-50">
          {documents.map((doc) => (
            <div key={doc.id} className="group px-10 py-7 hover:bg-blue-50/30 transition-all flex items-center gap-10">
              <div className="w-14 h-14 rounded-2xl bg-slate-50 text-slate-400 group-hover:bg-[#0047AB] group-hover:text-white flex items-center justify-center transition-all duration-500 shrink-0 border border-slate-100 group-hover:border-[#0047AB]/20">
                <FileText className="w-7 h-7" />
              </div>
              
              <div className="flex-1 grid grid-cols-4 lg:grid-cols-6 gap-10 items-center">
                {/* Column 1: Name & Status */}
                <div className="col-span-2 space-y-1">
                  <div className="flex items-center gap-3">
                    <h4 className="text-sm font-black text-slate-900 tracking-tight uppercase group-hover:text-[#0047AB] transition-colors">{doc.name}</h4>
                    <span className={`px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest border transition-colors ${
                      doc.status === 'SIGNED' 
                      ? 'bg-green-50 text-green-600 border-green-100' 
                      : 'bg-blue-50 text-[#0047AB] border-blue-100'
                    }`}>
                      {doc.status}
                    </span>
                  </div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Enterprise PDF Asset</p>
                </div>

                {/* Column 2: ID */}
                <div className="hidden lg:block">
                  <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em] mb-1">Document ID</p>
                  <p className="text-xs font-black text-slate-900">{doc.id}</p>
                </div>

                {/* Column 3: Size */}
                <div className="hidden lg:block">
                  <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em] mb-1">File Size</p>
                  <p className="text-xs font-black text-slate-900">{doc.size}</p>
                </div>

                {/* Column 4: Author */}
                <div className="hidden lg:block">
                  <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em] mb-1">Verified By</p>
                  <p className="text-xs font-black text-slate-900">{doc.author}</p>
                </div>

                {/* Column 5: Actions */}
                <div className="col-span-2 lg:col-span-1 flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                  <button 
                    onClick={() => setPreviewDoc(doc)}
                    className="p-3 bg-white border border-slate-200 text-slate-400 hover:text-[#0047AB] hover:border-[#0047AB] rounded-xl transition-all shadow-sm"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="px-5 py-3 bg-[#0047AB] text-white text-[10px] font-black rounded-xl uppercase tracking-widest hover:bg-[#003580] transition-all flex items-center gap-2 shadow-lg shadow-blue-900/10">
                    <Download className="w-3.5 h-3.5" />
                    Get PDF
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Table Footer */}
        <div className="px-10 py-6 bg-slate-50/30 border-t border-slate-50 flex justify-center">
           <button className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] hover:text-[#0047AB] transition-colors flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              Global Document Repository
           </button>
        </div>
      </div>

      {/* 3. PREVIEW MODAL */}
      {previewDoc && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
           {/* Backdrop */}
           <div 
             className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" 
             onClick={() => setPreviewDoc(null)}
           />
           
           {/* Modal Content */}
           <div className="relative w-full max-w-5xl bg-white rounded-[48px] shadow-2xl overflow-hidden flex flex-col h-[90vh] animate-in zoom-in-95 duration-300">
              {/* Modal Header */}
              <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-white/80 backdrop-blur-xl sticky top-0 z-10">
                <div className="flex items-center gap-5">
                   <div className="w-14 h-14 rounded-2xl bg-[#0047AB] text-white flex items-center justify-center shadow-xl shadow-blue-900/20">
                      <FileSearch className="w-7 h-7" />
                   </div>
                   <div>
                      <div className="flex items-center gap-3 mb-1">
                         <h4 className="text-xl font-black text-slate-900 tracking-tight">{previewDoc.name}</h4>
                         <span className="px-2 py-0.5 bg-blue-50 text-[#0047AB] text-[9px] font-black uppercase tracking-widest rounded-md border border-blue-100">SECURE PREVIEW</span>
                      </div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{previewDoc.id} • {previewDoc.size} • Verified Asset</p>
                   </div>
                </div>
                <button 
                  onClick={() => setPreviewDoc(null)}
                  className="w-12 h-12 flex items-center justify-center bg-slate-50 hover:bg-slate-100 rounded-full transition-all text-slate-400 hover:text-[#0047AB] group"
                >
                  <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                </button>
              </div>

              {/* Modal Body (Document Mockup) */}
              <div className="flex-1 p-12 bg-slate-50 overflow-y-auto flex justify-center">
                 <div className="w-full max-w-[850px] bg-white rounded-[32px] shadow-2xl border border-slate-100 p-16 space-y-12 relative overflow-hidden">
                    {/* Watermark */}
                    <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.03] rotate-[-35deg]">
                       <span className="text-[120px] font-black uppercase tracking-[0.2em] whitespace-nowrap text-[#0047AB]">DUFERCO</span>
                    </div>

                    <div className="relative z-10 space-y-12">
                       {/* Mock Header */}
                       <div className="flex justify-between items-start border-b border-slate-100 pb-10">
                          <div className="space-y-4">
                             <div className="w-64 h-4 bg-[#0047AB]/10 rounded-full" />
                             <div className="w-40 h-3 bg-slate-100 rounded-full" />
                             <div className="w-32 h-3 bg-slate-50 rounded-full" />
                          </div>
                          <div className="w-24 h-24 bg-blue-50 rounded-3xl flex items-center justify-center border border-blue-100 shadow-inner">
                             <ShieldCheck className="w-10 h-10 text-[#0047AB]/20" />
                          </div>
                       </div>

                       {/* Mock Columns */}
                       <div className="grid grid-cols-2 gap-12 pt-4">
                          {[1, 2].map(col => (
                            <div key={col} className="space-y-8">
                               {[1, 2].map(i => (
                                 <div key={i} className="space-y-3">
                                    <div className="w-32 h-2 bg-slate-200 rounded-full" />
                                    <div className="w-full h-4 bg-slate-50 rounded-lg" />
                                 </div>
                               ))}
                            </div>
                          ))}
                       </div>

                       {/* Mock Table */}
                       <div className="bg-slate-50/50 rounded-3xl p-10 space-y-6 border border-slate-100">
                          <div className="flex items-center gap-3 mb-4">
                             <Info className="w-5 h-5 text-blue-200" />
                             <div className="w-48 h-3 bg-slate-200 rounded-full" />
                          </div>
                          <div className="space-y-4">
                             {[1, 2, 3].map(i => (
                               <div key={i} className="flex justify-between items-center py-3 border-b border-white/50 last:border-0">
                                  <div className="w-32 h-3 bg-white rounded-full shadow-sm" />
                                  <div className="w-16 h-3 bg-slate-200 rounded-full" />
                               </div>
                             ))}
                          </div>
                       </div>

                       {/* Mock Footer */}
                       <div className="pt-12 flex justify-between items-end">
                          <div className="space-y-4">
                             <div className="flex -space-x-4 mb-2">
                                <div className="w-12 h-12 rounded-full bg-[#0047AB] border-4 border-white shadow-lg flex items-center justify-center text-[10px] font-bold text-white">SYS</div>
                                <div className="w-12 h-12 rounded-full bg-blue-400 border-4 border-white shadow-lg flex items-center justify-center text-[10px] font-bold text-white">AUT</div>
                             </div>
                             <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Digitally Signed Asset</p>
                          </div>
                          <div className="w-48 h-12 bg-slate-50 rounded-2xl border border-slate-100 shadow-inner" />
                       </div>
                    </div>
                 </div>
              </div>

              {/* Modal Footer */}
              <div className="p-8 bg-white border-t border-slate-100 flex justify-center gap-5">
                 <button className="flex-1 max-w-[320px] py-5 bg-[#0047AB] text-white text-xs font-black rounded-2xl uppercase tracking-[0.2em] hover:bg-[#003580] transition-all shadow-2xl shadow-blue-900/20 flex items-center justify-center gap-4">
                    <Download className="w-5 h-5" />
                    Download PDF
                 </button>
                 <button className="px-10 py-5 border-2 border-slate-100 text-[#0047AB] text-xs font-black rounded-2xl uppercase tracking-[0.2em] hover:bg-blue-50 hover:border-blue-200 transition-all">
                    Share
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
