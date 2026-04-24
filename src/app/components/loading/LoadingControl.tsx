import { useState } from 'react';
import { 
  ScanLine, ShieldCheck, Truck, User, 
  Package, Clock, MapPin, AlertCircle, 
  CheckCircle2, QrCode, Key, Camera,
  ClipboardCheck, Thermometer, Droplets, Info
} from 'lucide-react';

export function LoadingControl() {
  const [passId, setPassId] = useState('');
  const [pin, setPin] = useState('');
  const [orderData, setOrderData] = useState<any>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  // Checklist State
  const [checklist, setChecklist] = useState({
    driverVerified: false,
    truckInspected: false,
    ppeConfirmed: false,
    bayReady: false
  });

  const [loadingQty, setLoadingQty] = useState('');
  const [imageUploaded, setImageUploaded] = useState(false);

  const handleVerify = () => {
    setIsVerifying(true);
    setError('');
    
    // Simulate API call
    setTimeout(() => {
      // For demo, ORD-2401 is our test case
      if (passId === 'ORD-2401' || pin === '8842') {
        setOrderData({
          id: 'ORD-2401',
          truck: 'TN-45-AX-1234',
          driver: 'Robert Fox',
          product: 'Diesel',
          orderedQuantity: '15,000 L',
          location: 'Terminal A, Bay 3',
          transporter: 'Global Logistics Solutions',
          status: 'AT_GATE'
        });
      } else {
        setError('Invalid Pass ID or PIN. Ensure the truck has checked in at the gate.');
      }
      setIsVerifying(false);
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const maxQty = parseFloat(orderData.orderedQuantity.replace(/[^0-9.]/g, ''));
    const enteredQty = parseFloat(loadingQty);

    if (enteredQty > maxQty) {
      alert(`Error: Loaded quantity cannot exceed ordered volume (${orderData.orderedQuantity})`);
      return;
    }

    if (!checklist.driverVerified || !checklist.truckInspected || !checklist.ppeConfirmed || !checklist.bayReady) {
      alert('Please complete all safety checklist items before starting the load.');
      return;
    }

    if (!imageUploaded) {
      alert('Proof of compartment inspection (image) is required.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      alert(`Loading completed for ${orderData.id}. Status updated to LOADED.`);
      setOrderData(null);
      setPassId('');
      setPin('');
      setLoadingQty('');
      setImageUploaded(false);
      setChecklist({
        driverVerified: false,
        truckInspected: false,
        ppeConfirmed: false,
        bayReady: false
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="w-full space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h2 className="text-3xl font-black text-slate-900 tracking-tight">Loading Station Control</h2>
           <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Order Verification & Fulfillment</p>
        </div>
        <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl border border-slate-100 shadow-sm text-[10px] font-black text-slate-500 uppercase tracking-widest">
           <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
           Operational Mode: Active Loading
        </div>
      </div>

      {!orderData ? (
        /* Verification Screen */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
           <div className="lg:col-span-5">
              <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/20 space-y-8">
                 <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-[24px] bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                       <QrCode className="w-8 h-8" />
                    </div>
                    <div>
                       <h3 className="text-xl font-black text-slate-900 tracking-tight">Order Verification</h3>
                       <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Identify incoming vehicle</p>
                    </div>
                 </div>

                 <div className="space-y-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Pass ID / QR Scan</label>
                       <div className="relative group">
                          <ScanLine className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-primary transition-colors" />
                          <input 
                             type="text"
                             value={passId}
                             onChange={(e) => setPassId(e.target.value.toUpperCase())}
                             placeholder="SCAN OR ENTER PASS ID"
                             autoComplete="off"
                             spellCheck={false}
                             className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 ring-primary/5 focus:bg-white focus:border-primary/20 transition-all text-sm font-black tracking-widest"
                          />
                       </div>
                    </div>

                    <div className="flex items-center gap-4">
                       <div className="h-px flex-1 bg-slate-100" />
                       <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">OR</span>
                       <div className="h-px flex-1 bg-slate-100" />
                    </div>

                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Security PIN</label>
                       <div className="relative group">
                          <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-primary transition-colors" />
                          <input 
                             type="password"
                             maxLength={4}
                             value={pin}
                             onChange={(e) => setPin(e.target.value)}
                             placeholder="4-DIGIT PIN"
                             autoComplete="new-password"
                             className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 ring-primary/5 focus:bg-white focus:border-primary/20 transition-all text-sm font-black tracking-[0.5em] placeholder:tracking-normal"
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
                       className="w-full py-5 bg-primary text-white text-xs font-black rounded-2xl shadow-xl shadow-primary/20 hover:shadow-2xl hover:-translate-y-0.5 disabled:opacity-50 disabled:translate-y-0 transition-all uppercase tracking-[0.2em]"
                    >
                       {isVerifying ? 'Verifying Credentials...' : 'Identify & Start Load'}
                    </button>
                 </div>
              </div>
           </div>

           <div className="lg:col-span-7 h-full">
              <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[40px] flex flex-col items-center justify-center p-20 text-center h-full min-h-[400px]">
                 <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
                    <Package className="w-10 h-10 text-slate-200" />
                 </div>
                 <h4 className="text-lg font-black text-slate-400 tracking-tight">Awaiting Load Identity</h4>
                 <p className="text-xs font-bold text-slate-300 max-w-xs mt-2 uppercase tracking-widest leading-loose">
                    The loading sequence can only begin once the vehicle has been verified at the entry gate.
                 </p>
              </div>
           </div>
        </div>
      ) : (
        /* Loading Execution Form */
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in zoom-in-95 duration-500">
           {/* Order Info Panel */}
           <div className="lg:col-span-4 space-y-6">
              <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-8">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-500 border border-indigo-100">
                       <Info className="w-6 h-6" />
                    </div>
                    <div>
                       <h3 className="text-lg font-black text-slate-900 tracking-tight">{orderData.id}</h3>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{orderData.transporter}</p>
                    </div>
                 </div>

                 <div className="space-y-6">
                    {[
                       { label: 'Vehicle', value: orderData.truck, icon: Truck },
                       { label: 'Driver', value: orderData.driver, icon: User },
                       { label: 'Product', value: orderData.product, icon: Package },
                       { label: 'Location', value: orderData.location, icon: MapPin },
                    ].map((item, i) => (
                       <div key={i} className="flex items-center gap-4 group">
                          <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-300 group-hover:text-primary transition-colors">
                             <item.icon className="w-5 h-5" />
                          </div>
                          <div>
                             <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{item.label}</p>
                             <p className="text-sm font-black text-slate-900">{item.value}</p>
                          </div>
                       </div>
                    ))}
                 </div>

                 <div className="p-6 bg-slate-900 rounded-[32px] text-white">
                    <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Target Quantity</p>
                    <p className="text-3xl font-black">{orderData.orderedQuantity}</p>
                 </div>
              </div>
           </div>

           {/* Checklist & Fulfillment Panel */}
           <div className="lg:col-span-8 space-y-6">
              <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm space-y-10">
                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                       <div className="w-14 h-14 rounded-[24px] bg-green-50 flex items-center justify-center text-green-500 border border-green-100 shadow-inner">
                          <ClipboardCheck className="w-8 h-8" />
                       </div>
                       <div>
                          <h3 className="text-2xl font-black text-slate-900 tracking-tight">Fulfillment Checklist</h3>
                          <p className="text-sm font-bold text-slate-400">Complete all safety steps before submission</p>
                       </div>
                    </div>
                 </div>

                 {/* Safety Checklist */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                       { id: 'driverVerified', label: 'Verify Driver ID & License', icon: User },
                       { id: 'truckInspected', label: 'Inspect Truck Compartments', icon: Truck },
                       { id: 'ppeConfirmed', label: 'Safety Gear (PPE) Verified', icon: ShieldCheck },
                       { id: 'bayReady', label: 'Loading Bay (Bay 3) Clear', icon: MapPin },
                    ].map((item) => (
                       <button
                          key={item.id}
                          type="button"
                          onClick={() => setChecklist(prev => ({ ...prev, [item.id]: !prev[item.id as keyof typeof checklist] }))}
                          className={`flex items-center justify-between p-5 rounded-3xl border transition-all text-left ${
                             checklist[item.id as keyof typeof checklist]
                             ? 'bg-green-50 border-green-100 shadow-inner'
                             : 'bg-white border-slate-100 hover:border-slate-200'
                          }`}
                       >
                          <div className="flex items-center gap-4">
                             <div className={`p-2 rounded-lg ${checklist[item.id as keyof typeof checklist] ? 'text-green-500' : 'text-slate-300'}`}>
                                <item.icon className="w-5 h-5" />
                             </div>
                             <span className={`text-xs font-black uppercase tracking-tight ${checklist[item.id as keyof typeof checklist] ? 'text-green-700' : 'text-slate-500'}`}>
                                {item.label}
                             </span>
                          </div>
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                             checklist[item.id as keyof typeof checklist]
                             ? 'bg-green-500 border-green-500 text-white'
                             : 'border-slate-100'
                          }`}>
                             {checklist[item.id as keyof typeof checklist] && <CheckCircle2 className="w-4 h-4" />}
                          </div>
                       </button>
                    ))}
                 </div>

                 <div className="h-px bg-slate-50" />

                 {/* Inputs Section */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-4">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Actual Loaded Quantity (L)</label>
                          <div className="relative group">
                             <Package className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-primary transition-colors" />
                             <input 
                                type="number"
                                required
                                value={loadingQty}
                                onChange={(e) => setLoadingQty(e.target.value)}
                                placeholder="ENTER LOADED LITERS"
                                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 ring-primary/5 focus:bg-white focus:border-primary/20 transition-all text-sm font-black"
                             />
                          </div>
                       </div>
                    </div>

                    <div className="space-y-4">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Compartment Verification Image</label>
                       <button
                          type="button"
                          onClick={() => setImageUploaded(true)}
                          className={`w-full h-[140px] border-2 border-dashed rounded-[32px] flex flex-col items-center justify-center gap-3 transition-all ${
                             imageUploaded 
                             ? 'bg-green-50 border-green-200 text-green-600' 
                             : 'bg-slate-50 border-slate-200 text-slate-400 hover:border-primary/20 hover:text-primary'
                          }`}
                       >
                          {imageUploaded ? (
                             <>
                                <CheckCircle2 className="w-8 h-8" />
                                <span className="text-[10px] font-black uppercase tracking-widest">Image Uploaded Successfully</span>
                             </>
                          ) : (
                             <>
                                <Camera className="w-8 h-8" />
                                <span className="text-[10px] font-black uppercase tracking-widest">Upload Inspection Photo</span>
                             </>
                          )}
                       </button>
                    </div>
                 </div>

                 {/* Submit Button */}
                 <div className="pt-6">
                    <button 
                       type="submit"
                       disabled={isSubmitting}
                       className="w-full py-5 bg-[#0047AB] text-white text-sm font-black rounded-3xl shadow-xl shadow-blue-900/20 hover:shadow-2xl hover:-translate-y-1 disabled:opacity-50 disabled:translate-y-0 transition-all uppercase tracking-[0.2em] flex items-center justify-center gap-3"
                    >
                       {isSubmitting ? (
                          <>
                             <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                             Processing Fulfillment...
                          </>
                       ) : (
                          <>
                             <ShieldCheck className="w-6 h-6" />
                             Submit & Update Order to LOADED
                          </>
                       )}
                    </button>
                    <button 
                       type="button"
                       onClick={() => setOrderData(null)}
                       className="w-full py-4 mt-3 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] hover:text-slate-900 transition-colors"
                    >
                       Discard & Return to Identification
                    </button>
                 </div>
              </div>
           </div>
        </form>
      )}
    </div>
  );
}
