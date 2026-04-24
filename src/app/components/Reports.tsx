import { useState } from 'react';
import { 
  BarChart3, Download, Calendar, 
  FileText, Truck, Package, 
  ExternalLink, ListFilter, XCircle
} from 'lucide-react';

const reportTypes = [
  { name: 'Daily Operations Summary', desc: 'Overview of all trips, loading, and gate activities', icon: FileText, color: 'text-blue-500 bg-blue-50' },
  { name: 'Monthly Performance Report', desc: 'KPIs, delays, and efficiency metrics', icon: BarChart3, color: 'text-indigo-500 bg-indigo-50' },
  { name: 'Transporter Performance', desc: 'Analysis by transporter company', icon: Truck, color: 'text-orange-500 bg-orange-50' },
  { name: 'Product Volume Report', desc: 'Breakdown by product type and quantity', icon: Package, color: 'text-green-500 bg-green-50' },
  { name: 'Variance Analysis', desc: 'Loading planned vs actual quantities', icon: BarChart3, color: 'text-slate-500 bg-slate-50' },
  { name: 'Gate Activity Log', desc: 'Check-in and check-out records', icon: FileText, color: 'text-slate-500 bg-slate-50' },
];

const mockReportData = [
  { id: 'TRP-1045', transporter: 'Global Logistics', product: 'Diesel', quantity: '15,000 L', status: 'COMPLETED', time: '09:15 AM', variance: '0%' },
  { id: 'TRP-1046', transporter: 'Express Freight', product: 'Petrol', quantity: '12,000 L', status: 'IN_PROGRESS', time: '10:30 AM', variance: '-0.5%' },
  { id: 'TRP-1047', transporter: 'Swift Roadways', product: 'Diesel', quantity: '18,000 L', status: 'COMPLETED', time: '11:45 AM', variance: '+0.2%' },
  { id: 'TRP-1048', transporter: 'Prime Carriers', product: 'Kerosene', quantity: '8,500 L', status: 'AT_GATE', time: '12:20 PM', variance: '0%' },
  { id: 'TRP-1049', transporter: 'Global Logistics', product: 'Petrol', quantity: '22,000 L', status: 'LOADED', time: '01:10 PM', variance: '+0.1%' },
];

export function Reports() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedType, setSelectedType] = useState('Daily Operations Summary');

  const handleGenerate = () => {
    setIsGenerating(true);
    setShowResults(false);
    
    // Simulate generation delay
    setTimeout(() => {
      setIsGenerating(false);
      setShowResults(true);
    }, 800);
  };

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-500">
      <div>
         <h2 className="text-3xl font-black text-slate-900 tracking-tight">Reports & Analytics</h2>
         <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Manage delivery operations and partner coordination</p>
      </div>

      {/* Report Generator Card (Old UI Style) */}
      <div className="bg-white rounded-[12px] border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">Generate Report</h3>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Report Type</label>
              <select 
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 ring-primary/20 text-sm font-bold"
              >
                {reportTypes.map((type) => (
                  <option key={type.name} value={type.name}>{type.name}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Start Date</label>
              <div className="relative group">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                <input type="date" defaultValue="2026-04-01" className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none text-sm font-bold" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">End Date</label>
              <div className="relative group">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                <input type="date" defaultValue="2026-04-23" className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none text-sm font-bold" />
              </div>
            </div>
          </div>
          
          <button 
            onClick={handleGenerate}
            disabled={isGenerating}
            className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white text-[10px] font-black rounded-lg shadow-sm hover:shadow-md transition-all uppercase tracking-widest disabled:opacity-50"
          >
            {isGenerating ? (
              <><div className="w-3 h-3 border-2 border-white/20 border-t-white rounded-full animate-spin" /> Generating...</>
            ) : (
              <><BarChart3 className="w-4 h-4" /> Generate Report</>
            )}
          </button>
        </div>
      </div>

      {/* Generated Results Listing (Appears when generated) */}
      {showResults && (
        <div className="bg-white rounded-[12px] border border-slate-200 shadow-sm overflow-hidden animate-in slide-in-from-top-4 duration-500">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-primary" />
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">Report Results: {selectedType}</h3>
            </div>
            <div className="flex items-center gap-2">
               <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all">
                  <Download className="w-3.5 h-3.5" /> Export Data
               </button>
               <button onClick={() => setShowResults(false)} className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                  <XCircle className="w-5 h-5" />
               </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Trip ID</th>
                  <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Transporter</th>
                  <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Product</th>
                  <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Quantity</th>
                  <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Variance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mockReportData.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/30 transition-colors group">
                    <td className="px-6 py-4 text-xs font-black text-primary">{row.id}</td>
                    <td className="px-6 py-4">
                      <div className="text-xs font-bold text-slate-900">{row.transporter}</div>
                      <div className="text-[9px] font-medium text-slate-400">{row.time}</div>
                    </td>
                    <td className="px-6 py-4 text-xs font-bold text-slate-600">{row.product}</td>
                    <td className="px-6 py-4 text-xs font-black text-slate-900">{row.quantity}</td>
                    <td className="px-6 py-4 text-right">
                      <span className={`text-[9px] font-black px-2 py-0.5 rounded ${
                        row.variance === '0%' ? 'bg-slate-100 text-slate-400' : 
                        row.variance.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'
                      }`}>
                        {row.variance}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Available Report Types (Old UI Style) */}
      <div className="bg-white rounded-[12px] border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">Available Report Types</h3>
        </div>
        <div className="divide-y divide-slate-100">
          {reportTypes.map((report) => (
            <div key={report.name} className="p-6 hover:bg-slate-50/30 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${report.color}`}>
                    <report.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-black text-slate-900 mb-1">{report.name}</div>
                    <div className="text-xs font-medium text-slate-400">{report.desc}</div>
                  </div>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all">
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
