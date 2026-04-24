import { useState } from 'react';
import { 
  ScanLine, LogIn, LogOut, ShieldCheck, 
  Truck, User, Package, Clock, MapPin, 
  AlertCircle, CheckCircle2, QrCode, Key,
  ExternalLink, UserCheck, ArrowLeft, MoreHorizontal,
  ChevronRight, Search, Filter, Download,
  MoreVertical, ChevronDown, CheckSquare, Plus,
  FileCheck, Shield, ClipboardCheck
} from 'lucide-react';

type Mode = 'checkin' | 'checkout';
type View = 'LISTING' | 'SCANNING';

const mockInsideTrucks = [
  { id: 'ORD-2401', truck: 'TN-45-AX-1234', driver: 'Robert Fox', inTime: '24 Apr, 10:45 AM', bay: 'Bay 3', status: 'IN_TERMINAL', product: 'Diesel', quantity: '15,000 L', transporter: 'Global Logistics' },
  { id: 'ORD-2402', truck: 'BE-12-G-9988', driver: 'Arlene McCoy', inTime: '24 Apr, 11:15 AM', bay: 'Bay 1', status: 'IN_TERMINAL', product: 'Petrol', quantity: '12,000 L', transporter: 'ABC Transport' },
  { id: 'ORD-2403', truck: 'FR-99-PL-5566', driver: 'Cody Fisher', inTime: '24 Apr, 11:30 AM', bay: 'Bay 4', status: 'IN_TERMINAL', product: 'Diesel', quantity: '20,000 L', transporter: 'Nexus Energy' },
  { id: 'ORD-2406', truck: 'UK-22-KJ-7744', driver: 'Jenny Wilson', inTime: '24 Apr, 12:10 PM', bay: 'Bay 2', status: 'LOADED', product: 'Aviation Fuel', quantity: '18,500 L', transporter: 'Global Logistics' },
  { id: 'ORD-2409', truck: 'DE-88-MN-1122', driver: 'Guy Hawkins', inTime: '24 Apr, 12:45 PM', bay: 'Bay 5', status: 'IN_TERMINAL', product: 'Diesel', quantity: '5,000 L', transporter: 'Express Freight' },
  { id: 'ORD-2412', truck: 'NL-44-BB-2233', driver: 'Leslie Alexander', inTime: '24 Apr, 01:05 PM', bay: 'Bay 1', status: 'EXITED', product: 'Petrol', quantity: '15,000 L', transporter: 'Swift Transport' },
];

export function GateControl() {
  const [view, setView] = useState<View>('LISTING');
  const [mode, setMode] = useState<Mode>('checkin');
  const [passId, setPassId] = useState('');
  const [pin, setPin] = useState('');
  const [orderData, setOrderData] = useState<any>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleVerify = () => {
    setIsVerifying(true);
    setError('');
    
    setTimeout(() => {
      if (passId === 'ORD-2401' || pin === '8842') {
        const baseData = {
          id: 'ORD-2401',
          truck: 'TN-45-AX-1234',
          driver: 'Robert Fox',
          product: 'Diesel',
          quantity: '15,000 L',
          transporter: 'Global Logistics Solutions',
          bay: 'Bay 3'
        };

        if (mode === 'checkin') {
          setOrderData({ ...baseData, status: 'ACCEPTED' });
        } else {
          setOrderData({ 
            ...baseData, 
            status: 'LOADED',
            loadedQuantity: '15,000 L',
            loadingManager: 'Mike Johnson',
            loadingTime: '24 Apr, 11:45 AM'
          });
        }
      } else {
        setError('Invalid Pass ID or PIN. Please verify with the driver.');
      }
      setIsVerifying(false);
    }, 1000);
  };

  const handleAction = () => {
    setOrderData(null);
    setPassId('');
    setPin('');
    setView('LISTING');
  };

  if (view === 'SCANNING') {
    return (
      <div className="w-full space-y-8 animate-in fade-in duration-500 pb-12">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => { setView('LISTING'); setOrderData(null); }}
            className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-primary transition-all shadow-sm"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              {mode === 'checkin' ? 'Entry Check-In' : 'Exit Check-Out'}
            </h2>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Verification & Authorization</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                  <QrCode className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-black text-slate-900 tracking-tight">Identity Verification</h3>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Pass ID / Scan Code</label>
                  <div className="relative group">
                    <ScanLine className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-primary transition-colors" />
                    <input 
                      type="text"
                      value={passId}
                      onChange={(e) => setPassId(e.target.value.toUpperCase())}
                      placeholder="SCAN OR ENTER PASS ID"
                      autoComplete="off"
                      spellCheck={false}
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 ring-primary/20 focus:bg-white transition-all text-sm font-black tracking-widest placeholder:text-slate-300"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="h-px flex-1 bg-slate-100" />
                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">OR</span>
                  <div className="h-px flex-1 bg-slate-100" />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Digital Pass PIN</label>
                  <div className="relative group">
                    <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-primary transition-colors" />
                    <input 
                      type="password"
                      maxLength={4}
                      value={pin}
                      onChange={(e) => setPin(e.target.value)}
                      placeholder="4-DIGIT PIN"
                      autoComplete="new-password"
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 ring-primary/20 focus:bg-white transition-all text-sm font-black tracking-[0.5em] placeholder:text-slate-300 placeholder:tracking-normal"
                    />
                  </div>
                </div>

                {error && (
                  <div className="flex gap-3 p-4 bg-red-50 border border-red-100 rounded-2xl">
                    <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                    <p className="text-[11px] font-bold text-red-900 leading-relaxed">{error}</p>
                  </div>
                )}

                <button 
                  onClick={handleVerify}
                  disabled={isVerifying || (!passId && !pin)}
                  className="w-full py-4 bg-primary text-white text-xs font-black rounded-2xl shadow-xl shadow-primary/20 hover:shadow-2xl hover:-translate-y-0.5 disabled:opacity-50 disabled:translate-y-0 transition-all uppercase tracking-[0.2em]"
                >
                  {isVerifying ? 'Verifying Credentials...' : 'Verify Access'}
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            {orderData ? (
              <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm relative overflow-hidden animate-in zoom-in-95 duration-500 h-full">
                <div className="absolute top-0 right-0 p-10 opacity-[0.03]">
                  <ShieldCheck className="w-64 h-64" />
                </div>

                <div className="relative z-10 space-y-10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-16 h-16 rounded-[24px] flex items-center justify-center border shadow-inner ${
                        mode === 'checkin' ? 'bg-green-50 text-green-500 border-green-100' : 'bg-indigo-50 text-indigo-500 border-indigo-100'
                      }`}>
                        {mode === 'checkin' ? <CheckCircle2 className="w-8 h-8" /> : <Package className="w-8 h-8" />}
                      </div>
                      <div>
                        <h3 className="text-2xl font-black text-slate-900 tracking-tight">{mode === 'checkin' ? 'Entry Authorized' : 'Exit Authorized'}</h3>
                        <p className="text-sm font-bold text-slate-400">ID: {orderData.id}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-10">
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                          <Truck className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Vehicle</p>
                          <p className="text-base font-black text-slate-900">{orderData.truck}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                          <User className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Driver</p>
                          <p className="text-base font-black text-slate-900">{orderData.driver}</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-6">
                      {mode === 'checkout' ? (
                        <>
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-500">
                              <Package className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Loaded Quantity</p>
                              <p className="text-base font-black text-slate-900">{orderData.loadedQuantity}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-500">
                              <UserCheck className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Loaded By</p>
                              <p className="text-base font-black text-slate-900">{orderData.loadingManager}</p>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                              <Package className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Product</p>
                              <p className="text-base font-black text-slate-900">{orderData.product}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                              <MapPin className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Designated Area</p>
                              <p className="text-base font-black text-slate-900">{orderData.bay}</p>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="pt-10 border-t border-slate-50">
                    <button 
                      onClick={handleAction}
                      className={`w-full py-5 text-white text-sm font-black rounded-3xl shadow-xl transition-all uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:shadow-2xl hover:-translate-y-1 ${
                        mode === 'checkin' ? 'bg-[#0047AB] shadow-blue-900/20' : 'bg-green-600 shadow-green-900/20'
                      }`}
                    >
                      {mode === 'checkin' ? <><LogIn className="w-6 h-6" /> Complete Entry</> : <><LogOut className="w-6 h-6" /> Complete Exit</>}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[40px] flex flex-col items-center justify-center p-20 text-center h-full">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-6 animate-pulse">
                  <ShieldCheck className="w-10 h-10 text-slate-200" />
                </div>
                <h4 className="text-lg font-black text-slate-400 tracking-tight tracking-widest">Awaiting Verification</h4>
                <p className="text-xs font-bold text-slate-300 max-w-xs mt-2 uppercase tracking-widest">
                  Scan pass or enter PIN to authorize {mode === 'checkin' ? 'entry' : 'exit'}.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h2 className="text-2xl font-black text-slate-900 tracking-tight">Gate Control</h2>
           <p className="text-xs font-medium text-slate-400 mt-1">Terminal Access & Vehicle Verification</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => { setView('SCANNING'); setMode('checkin'); }}
            className="flex items-center gap-2 px-6 py-3 bg-[#0047AB] text-white text-sm font-bold rounded-2xl shadow-lg shadow-blue-900/20 hover:shadow-xl hover:-translate-y-0.5 transition-all"
          >
            <LogIn className="w-5 h-5" />
            Entry Check-In
          </button>
          <button
            onClick={() => { setView('SCANNING'); setMode('checkout'); }}
            className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-slate-50 text-slate-900 text-sm font-bold rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
          >
            <LogOut className="w-5 h-5" />
            Exit Check-Out
          </button>
        </div>
      </div>

      {/* Proper Listing Filter Section */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <div className="relative group md:col-span-2 lg:col-span-2">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search Truck Number, Driver, or Transporter..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all text-xs font-bold"
            />
          </div>
          <div className="relative">
             <select className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all text-xs font-bold text-slate-600 appearance-none">
               <option>Operational Status</option>
               <option>In Terminal</option>
               <option>Loaded</option>
               <option>Exited</option>
             </select>
             <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
          <div className="relative">
             <select className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all text-xs font-bold text-slate-600 appearance-none">
               <option>Terminal Area</option>
               <option>Terminal A</option>
               <option>Terminal B</option>
             </select>
             <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
          <button className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-slate-50 text-slate-500 font-bold rounded-2xl hover:bg-slate-50 transition-all text-xs">
            <Filter className="w-4 h-4" />
            Advanced Filters
          </button>
        </div>
      </div>

      {/* High Density Table Card - Optimized */}
      <div className="bg-white border border-slate-100 rounded-[40px] shadow-sm overflow-hidden mb-10">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[1000px]">
            <thead>
              <tr className="bg-slate-50/20">
                <th className="pl-10 pr-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Vehicle & Order</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Load Details</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Transporter Info</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Operational Status</th>
                <th className="pl-6 pr-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {mockInsideTrucks.filter(t => 
                t.truck.toLowerCase().includes(searchQuery.toLowerCase()) || 
                t.driver.toLowerCase().includes(searchQuery.toLowerCase()) ||
                t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                t.transporter.toLowerCase().includes(searchQuery.toLowerCase())
              ).map((truck) => (
                <tr key={truck.id} className="hover:bg-slate-50/50 transition-all group">
                  <td className="pl-10 pr-6 py-5">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                          <Truck className="w-5 h-5" />
                       </div>
                       <div>
                          <div className="text-sm font-black text-slate-900">{truck.truck}</div>
                          <div className="flex items-center gap-2 mt-0.5">
                             <span className="text-[10px] font-black text-primary/70 uppercase tracking-widest">{truck.id}</span>
                             <span className="w-1 h-1 rounded-full bg-slate-300" />
                             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">System Order</span>
                          </div>
                       </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-center">
                       <div className="text-sm font-black text-slate-900">{truck.quantity}</div>
                       <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5 italic">{truck.product}</div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-xs font-black text-slate-900">{truck.transporter}</div>
                    <div className="flex items-center gap-1.5 mt-1">
                       <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[8px] font-bold text-slate-500">
                          {truck.driver.charAt(0)}
                       </div>
                       <span className="text-[11px] font-bold text-slate-500">{truck.driver}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                       <div className="flex flex-col items-start">
                          <span className={`px-2.5 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border ${
                            truck.status === 'LOADED' ? 'bg-green-50 text-green-600 border-green-100' :
                            truck.status === 'IN_TERMINAL' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                            truck.status === 'EXITED' ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-50 text-slate-500 border-slate-100'
                          }`}>
                            {truck.status.replace('_', ' ')}
                          </span>
                          <span className="text-[9px] font-bold text-slate-400 mt-1">{truck.bay}</span>
                       </div>
                    </div>
                  </td>
                  <td className="pl-6 pr-10 py-5 text-right">
                    <button className="p-2 hover:bg-white rounded-xl hover:shadow-sm border border-transparent hover:border-slate-100 transition-all text-slate-400 hover:text-primary">
                       <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
