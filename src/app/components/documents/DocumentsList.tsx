import { Link } from 'react-router';
import { Search, Filter, FileText, X, Download, FileSearch, Info, Eye, ShieldCheck, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const documents = [
  { id: 'DOC-5001', tripId: 'TRP-1045', type: 'Delivery Note', status: 'generated', date: '2026-04-23 10:30' },
  { id: 'DOC-5002', tripId: 'TRP-1044', type: 'Loading Certificate', status: 'signed', date: '2026-04-23 09:45' },
  { id: 'DOC-5003', tripId: 'TRP-1043', type: 'Gate Pass', status: 'generated', date: '2026-04-23 08:15' },
  { id: 'DOC-5004', tripId: 'TRP-1042', type: 'Delivery Note', status: 'delivered', date: '2026-04-22 16:30' },
  { id: 'DOC-5005', tripId: 'TRP-1041', type: 'Loading Certificate', status: 'signed', date: '2026-04-22 14:20' },
];

const statusColors = {
  generated: 'bg-[#3B82F6]/10 text-[#3B82F6] border-[#3B82F6]/20',
  signed: 'bg-[#0047AB]/10 text-[#0047AB] border-[#0047AB]/20',
  delivered: 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20',
};

export function DocumentsList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [previewDoc, setPreviewDoc] = useState<any>(null);

  const filteredDocs = documents.filter(doc => {
    const matchesSearch = doc.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         doc.tripId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'All Types' || doc.type === typeFilter;
    const matchesStatus = statusFilter === 'All Status' || doc.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Documentation Hub</h2>
          <p className="text-xs font-medium text-slate-400 mt-1">Access and manage all operational certificates and notes</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-[#0047AB] text-white text-sm font-bold rounded-2xl shadow-lg shadow-blue-900/20 hover:shadow-xl hover:-translate-y-0.5 transition-all">
          <Download className="w-5 h-5" />
          Bulk Export
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search Document or Trip ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-primary/20 transition-all text-xs font-bold"
            />
          </div>
          <div className="relative">
            <select 
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white text-xs font-bold text-slate-600 appearance-none cursor-pointer"
            >
              <option>All Types</option>
              <option>Delivery Note</option>
              <option>Loading Certificate</option>
              <option>Gate Pass</option>
            </select>
            <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none rotate-90" />
          </div>
          <div className="relative">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white text-xs font-bold text-slate-600 appearance-none cursor-pointer"
            >
              <option>All Status</option>
              <option>Generated</option>
              <option>Signed</option>
              <option>Delivered</option>
            </select>
            <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none rotate-90" />
          </div>
          <button className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-slate-50 text-slate-500 font-bold rounded-2xl hover:bg-slate-50 transition-all text-xs">
            <Filter className="w-4 h-4" />
            Advanced
          </button>
        </div>
      </div>

      {/* Listing */}
      <div className="bg-white border border-slate-100 rounded-[32px] overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead>
            <tr className="text-slate-400 text-[10px] font-black uppercase tracking-widest border-b border-slate-50">
              <th className="px-8 py-5">Document ID</th>
              <th className="px-8 py-5">Trip ID</th>
              <th className="px-8 py-5">Type</th>
              <th className="px-8 py-5">Generated</th>
              <th className="px-8 py-5">Status</th>
              <th className="px-8 py-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredDocs.map((doc) => (
              <tr key={doc.id} className="hover:bg-slate-50/50 transition-all group">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0047AB] flex items-center justify-center border border-blue-100 group-hover:scale-110 transition-transform">
                      <FileText className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-black text-slate-900 tracking-tight">{doc.id}</span>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <span className="px-3 py-1 bg-slate-100 text-slate-600 text-[10px] font-black rounded-lg uppercase tracking-widest">
                    {doc.tripId}
                  </span>
                </td>
                <td className="px-8 py-5">
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-slate-700">{doc.type}</span>
                    <span className="text-[10px] font-bold text-slate-400">PDF Document</span>
                  </div>
                </td>
                <td className="px-8 py-5 text-xs font-bold text-slate-500 italic">
                  {doc.date}
                </td>
                <td className="px-8 py-5">
                  <span className={`px-3 py-1 text-[9px] font-black rounded-lg border uppercase tracking-widest ${statusColors[doc.status as keyof typeof statusColors]}`}>
                    {doc.status}
                  </span>
                </td>
                <td className="px-8 py-5 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => setPreviewDoc(doc)}
                      className="p-2.5 bg-slate-50 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-xl transition-all"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2.5 bg-slate-50 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-xl transition-all">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Preview Modal */}
      {previewDoc && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white rounded-[40px] w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-300">
            {/* Modal Header */}
            <div className="px-10 py-8 border-b border-slate-100 flex items-center justify-between bg-white relative z-10">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#0047AB] flex items-center justify-center border border-blue-100 shadow-inner">
                  <FileText className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">{previewDoc.id}</h3>
                    <span className={`px-2 py-0.5 text-[9px] font-black rounded-lg border uppercase tracking-widest ${statusColors[previewDoc.status as keyof typeof statusColors]}`}>
                      {previewDoc.status}
                    </span>
                  </div>
                  <p className="text-sm font-bold text-slate-400 mt-1 uppercase tracking-widest">
                    Trip Reference: {previewDoc.tripId} • {previewDoc.type}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setPreviewDoc(null)}
                className="w-12 h-12 flex items-center justify-center rounded-2xl bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all border border-slate-100"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content - Scrollable Document View */}
            <div className="flex-1 overflow-y-auto p-10 bg-slate-50/30">
              <div className="bg-white rounded-[32px] border border-slate-200 shadow-lg min-h-[600px] p-12 flex flex-col items-center justify-center relative overflow-hidden">
                {/* Document Branding Background */}
                <div className="absolute top-0 right-0 p-20 opacity-[0.02]">
                  <FileSearch className="w-96 h-96" />
                </div>
                
                {/* Placeholder content for the PDF view */}
                <div className="w-20 h-20 rounded-3xl bg-blue-50 flex items-center justify-center text-primary mb-6 animate-pulse">
                  <ShieldCheck className="w-10 h-10" />
                </div>
                <h4 className="text-xl font-black text-slate-900 tracking-tight uppercase mb-2">Secure Document Preview</h4>
                <p className="text-sm font-bold text-slate-400 max-w-sm text-center">
                  This {previewDoc.type} was generated and cryptographically signed on {previewDoc.date}.
                </p>
                
                <div className="mt-12 grid grid-cols-2 gap-10 w-full max-w-lg">
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Signed By</p>
                    <p className="text-sm font-black text-slate-900 truncate">Terminal Authority</p>
                  </div>
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Verify Link</p>
                    <p className="text-sm font-black text-primary truncate cursor-pointer hover:underline">Verify Hash</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-10 py-6 border-t border-slate-100 bg-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Info className="w-5 h-5 text-slate-400" />
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Verified Secure by DUFERCO LOGISTIQUE</p>
              </div>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setPreviewDoc(null)}
                  className="px-8 py-3 bg-white border border-slate-200 text-slate-600 text-[10px] font-black rounded-2xl uppercase tracking-widest hover:bg-slate-50 transition-all"
                >
                  Close
                </button>
                <button className="px-8 py-3 bg-[#0047AB] text-white text-[10px] font-black rounded-2xl uppercase tracking-widest shadow-lg shadow-blue-900/20 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
