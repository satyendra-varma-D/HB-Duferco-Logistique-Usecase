import { FileText, Download, Eye, ExternalLink, Calendar, User, Clock, CheckCircle2 } from 'lucide-react';

export function OrderDocumentsTab({ orderId }: { orderId: string }) {
  const documents = [
    { id: 'DOC-5001', name: 'Delivery Note', type: 'PDF', date: '2026-04-23 10:30', status: 'GENERATED' },
    { id: 'DOC-5002', name: 'Loading Certificate', type: 'PDF', date: '2026-04-23 09:45', status: 'SIGNED' },
    { id: 'DOC-5003', name: 'Gate Pass', type: 'PDF', date: '2026-04-23 08:15', status: 'GENERATED' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex gap-3">
        <Clock className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
        <p className="text-[10px] font-bold text-slate-500 leading-relaxed uppercase tracking-widest">
          All documents for <span className="text-slate-900">{orderId}</span> are automatically synchronized from the terminal operations hub.
        </p>
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

      <div className="pt-6">
        <button className="w-full py-4 border-2 border-dashed border-slate-100 rounded-2xl text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] hover:border-primary/20 hover:text-primary transition-all flex items-center justify-center gap-2">
           <ExternalLink className="w-4 h-4" />
           Open Document Center
        </button>
      </div>
    </div>
  );
}
