import { useState } from 'react';
import { 
  ScanLine, LogIn, LogOut, ShieldCheck, 
  Truck, User, Package, Clock, MapPin, 
  AlertCircle, CheckCircle2, QrCode, Key,
  ExternalLink, UserCheck
} from 'lucide-react';

type Mode = 'checkin' | 'checkout';

export function GateControl() {
  const [mode, setMode] = useState<Mode>('checkin');
  const [passId, setPassId] = useState('');
  const [pin, setPin] = useState('');
  const [orderData, setOrderData] = useState<any>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');

  const handleVerify = () => {
    setIsVerifying(true);
    setError('');
    
    // Simulate API call
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
          // Mock data for check-out (loaded state)
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
    if (mode === 'checkin') {
      alert(`Order ${orderData.id} checked in. Status updated to AT GATE.`);
    } else {
      alert(`Order ${orderData.id} checked out. Status updated to IN TRANSIT.`);
    }
    setOrderData(null);
    setPassId('');
    setPin('');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h2 className="text-3xl font-black text-slate-900 tracking-tight">Gate Control</h2>
           <p className="text-sm font-bold text-slate-400">Terminal Access & Vehicle Verification</p>
        </div>
        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl border border-slate-100 shadow-sm text-xs font-black text-slate-500 uppercase tracking-widest">
           <Clock className="w-4 h-4 text-primary" />
           {new Date().toLocaleString('en-US', {
             weekday: 'short',
             day: 'numeric',
             month: 'short',
             hour: '2-digit',
             minute: '2-digit'
           })}
        </div>
      </div>

      {/* Mode Selector */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => { setMode('checkin'); setOrderData(null); }}
          className={`flex items-center justify-center gap-4 p-6 rounded-[32px] transition-all border-2 ${
            mode === 'checkin'
              ? 'bg-[#0047AB] border-[#0047AB] text-white shadow-xl shadow-blue-900/20 translate-y-[-2px]'
              : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200 shadow-sm'
          }`}
        >
          <LogIn className="w-6 h-6" />
          <span className="text-sm font-black uppercase tracking-[0.1em]">Entry Check-In</span>
        </button>
        <button
          onClick={() => { setMode('checkout'); setOrderData(null); }}
          className={`flex items-center justify-center gap-4 p-6 rounded-[32px] transition-all border-2 ${
            mode === 'checkout'
              ? 'bg-[#0047AB] border-[#0047AB] text-white shadow-xl shadow-blue-900/20 translate-y-[-2px]'
              : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200 shadow-sm'
          }`}
        >
          <LogOut className="w-6 h-6" />
          <span className="text-sm font-black uppercase tracking-[0.1em]">Exit Check-Out</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Verification Form */}
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

        {/* Details & Action */}
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
                       <span className="px-4 py-1.5 bg-indigo-50 text-indigo-500 text-[10px] font-black rounded-full border border-indigo-100 uppercase tracking-widest">
                          {mode === 'checkin' ? 'Entry Clearance' : 'Exit Clearance'}
                       </span>
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
                                      <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase">{orderData.loadingTime}</p>
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
                                      <p className="text-xs font-bold text-slate-500">{orderData.quantity}</p>
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
                          {mode === 'checkin' ? (
                             <>
                                <LogIn className="w-6 h-6" />
                                Complete Entry Check-In
                             </>
                          ) : (
                             <>
                                <LogOut className="w-6 h-6" />
                                Approve Exit & Release Vehicle
                             </>
                          )}
                       </button>
                    </div>
                 </div>
              </div>
           ) : (
              <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[40px] flex flex-col items-center justify-center p-20 text-center h-full">
                 <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
                    <ShieldCheck className="w-10 h-10 text-slate-200" />
                 </div>
                 <h4 className="text-lg font-black text-slate-400 tracking-tight">Awaiting {mode === 'checkin' ? 'Entry' : 'Exit'} Identity</h4>
                 <p className="text-xs font-bold text-slate-300 max-w-xs mt-2 uppercase tracking-widest">
                    Scan the driver's pass or enter the 4-digit security PIN to authorize vehicle {mode === 'checkin' ? 'entry' : 'exit'}.
                 </p>
              </div>
           )}
        </div>
      </div>
    </div>
  );
}

