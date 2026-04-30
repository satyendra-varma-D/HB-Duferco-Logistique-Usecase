import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router';
import { 
  ArrowLeft, Save, CheckCircle2, Truck, User, 
  Camera, Package, AlertCircle, Play, CheckCircle, ShieldCheck
} from 'lucide-react';

export function LoadingForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState<'checklist' | 'loading' | 'completed'>('checklist');
  const [checklist, setChecklist] = useState({
    driverVerified: false,
    truckVerified: false,
    safetyCheck: false,
    imageUploaded: false
  });
  const [loadedQty, setLoadedQty] = useState('25');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleStartLoading = () => {
    if (checklist.driverVerified && checklist.truckVerified && checklist.imageUploaded) {
      setStep('loading');
    }
  };

  const handleCompleteLoading = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setStep('completed');
      setIsSubmitting(false);
      // In a real app, this would update the status to 'LOADED'
      setTimeout(() => navigate('/loading'), 2000);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
        <div className="flex items-center gap-4">
          <Link to="/loading" className="p-3 bg-slate-50 hover:bg-slate-100 rounded-2xl transition-colors group">
            <ArrowLeft className="w-5 h-5 text-slate-500 group-hover:text-primary transition-colors" />
          </Link>
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Loading Operation</h2>
            <p className="text-xs font-bold text-slate-400">Order Ref: {id}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
           <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
             step === 'checklist' ? 'bg-amber-50 text-amber-600 border-amber-100' :
             step === 'loading' ? 'bg-blue-50 text-blue-600 border-blue-100 animate-pulse' :
             'bg-green-50 text-green-600 border-green-100'
           }`}>
             {step === 'checklist' ? 'Verification' : step === 'loading' ? 'In Progress' : 'Loaded'}
           </div>
        </div>
      </div>

      {step === 'checklist' && (
        <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm space-y-10 animate-in slide-in-from-bottom-4 duration-500">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                 <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                 <h3 className="text-xl font-black text-slate-900">Loading Manager Checklist</h3>
                 <p className="text-sm font-bold text-slate-400">Please verify all information before starting the pump.</p>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Checklist Items */}
              <div className="space-y-4">
                 {[
                   { id: 'driverVerified', label: 'Verify Driver Identity', icon: User },
                   { id: 'truckVerified', label: 'Verify Truck Number Plate', icon: Truck },
                   { id: 'safetyCheck', label: 'Safety Grounding & PPE Check', icon: ShieldCheck },
                 ].map((item) => (
                   <label key={item.id} className="flex items-center justify-between p-5 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 cursor-pointer transition-all">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-400 border border-slate-100">
                            <item.icon className="w-5 h-5" />
                         </div>
                         <span className="text-sm font-black text-slate-700">{item.label}</span>
                      </div>
                      <input 
                         type="checkbox" 
                         checked={checklist[item.id as keyof typeof checklist]}
                         onChange={(e) => setChecklist({...checklist, [item.id]: e.target.checked})}
                         className="w-6 h-6 rounded-lg border-slate-200 text-primary focus:ring-primary/20 cursor-pointer"
                      />
                   </label>
                 ))}
              </div>

              {/* Photo Upload */}
              <div className="space-y-4">
                 <div className={`h-full border-2 border-dashed rounded-[32px] p-8 flex flex-col items-center justify-center text-center transition-all ${
                    checklist.imageUploaded ? 'border-green-200 bg-green-50/30' : 'border-slate-200 bg-slate-50/30'
                 }`}>
                    {checklist.imageUploaded ? (
                       <>
                          <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center text-white mb-4 shadow-lg shadow-green-200">
                             <CheckCircle className="w-8 h-8" />
                          </div>
                          <p className="text-sm font-black text-green-600">Truck Photo Captured</p>
                          <button onClick={() => setChecklist({...checklist, imageUploaded: false})} className="mt-2 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-red-500">Retake</button>
                       </>
                    ) : (
                       <>
                          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-slate-300 mb-4 border border-slate-100 shadow-sm">
                             <Camera className="w-8 h-8" />
                          </div>
                          <p className="text-sm font-black text-slate-900">Vehicle Photo Required</p>
                          <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase">Upload image of the loaded compartment</p>
                          <button 
                             onClick={() => setChecklist({...checklist, imageUploaded: true})}
                             className="mt-6 px-6 py-2 bg-white text-primary text-[10px] font-black rounded-xl border border-primary/20 shadow-sm uppercase tracking-widest hover:bg-primary hover:text-white transition-all"
                          >
                             Capture Photo
                          </button>
                       </>
                    )}
                 </div>
              </div>
           </div>

           <div className="pt-8 border-t border-slate-50">
              <button 
                 disabled={!Object.values(checklist).every(v => v)}
                 onClick={handleStartLoading}
                 className="w-full py-5 bg-[#0047AB] text-white text-sm font-black rounded-3xl shadow-xl shadow-blue-900/20 hover:shadow-2xl hover:-translate-y-1 transition-all uppercase tracking-[0.2em] flex items-center justify-center gap-3 disabled:opacity-50 disabled:translate-y-0"
              >
                 <Play className="w-6 h-6" />
                 Initiate Loading Process
              </button>
           </div>
        </div>
      )}

      {step === 'loading' && (
        <form onSubmit={handleCompleteLoading} className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm space-y-10 animate-in zoom-in-95 duration-500">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-500">
                 <Package className="w-6 h-6" />
              </div>
              <div>
                 <h3 className="text-xl font-black text-slate-900">Quantity Recording</h3>
                 <p className="text-sm font-bold text-slate-400">Record the final meter reading from the loading arm.</p>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                 <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Target Quantity</p>
                    <p className="text-3xl font-black text-slate-900">25 MT</p>
                 </div>
                 <div className="space-y-2 px-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Actual Loaded Quantity (MT)</label>
                    <input 
                       type="number"
                       value={loadedQty}
                       onChange={(e) => setLoadedQty(e.target.value)}
                       className="w-full px-6 py-5 bg-white border-2 border-[#0047AB]/20 rounded-3xl outline-none focus:border-[#0047AB] transition-all text-2xl font-black text-slate-900"
                    />
                 </div>
              </div>

              <div className="flex flex-col justify-center gap-4">
                 <div className="flex items-start gap-4 p-6 rounded-3xl bg-blue-50 border border-blue-100">
                    <AlertCircle className="w-5 h-5 text-blue-500 shrink-0" />
                    <div>
                       <p className="text-xs font-black text-blue-900">Automatic Sync</p>
                       <p className="text-[11px] font-medium text-blue-700 mt-1">
                          The final quantity will be shared with the Checkpost Manager for exit clearance. Ensure the meter reading is accurate.
                       </p>
                    </div>
                 </div>
              </div>
           </div>

           <div className="pt-8 border-t border-slate-50">
              <button 
                 type="submit"
                 disabled={isSubmitting}
                 className="w-full py-5 bg-green-500 text-white text-sm font-black rounded-3xl shadow-xl shadow-green-200 hover:shadow-2xl hover:-translate-y-1 transition-all uppercase tracking-[0.2em] flex items-center justify-center gap-3 disabled:opacity-50 disabled:translate-y-0"
              >
                 {isSubmitting ? 'Processing...' : (
                    <>
                       <Save className="w-6 h-6" />
                       Complete & Seal Compartment
                    </>
                 )}
              </button>
           </div>
        </form>
      )}

      {step === 'completed' && (
        <div className="bg-white p-16 rounded-[40px] border border-slate-100 shadow-sm text-center space-y-6 animate-in zoom-in-95 duration-500">
           <div className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center text-white mx-auto shadow-xl shadow-green-200">
              <CheckCircle2 className="w-12 h-12" />
           </div>
           <div>
              <h3 className="text-3xl font-black text-slate-900 tracking-tight">Loading Complete</h3>
              <p className="text-sm font-bold text-slate-400 mt-2">The vehicle has been loaded with {loadedQty} MT of Steel Coils.</p>
           </div>
           <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest pt-4">Status Updated to: LOADED</p>
           <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Headed to Gate Check-Out</p>
        </div>
      )}
    </div>
  );
}
