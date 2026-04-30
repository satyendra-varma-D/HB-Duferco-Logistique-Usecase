import { useParams } from 'react-router';
import { 
  Truck, Calendar, MapPin, Clock, ShieldCheck, 
  QrCode, Info, ChevronDown, CheckCircle2, Copy, Share2
} from 'lucide-react';

export function AccessPass() {
  const { id } = useParams();

  // Mock pass data
  const pass = {
    orderId: id || 'ORD-BE-1001',
    truckNumber: '1-ABC-234',
    driverName: 'Jean Dupont',
    pickupTime: '24 Apr 2026, 10:30 AM',
    terminal: 'Antwerp Port Terminal',
    bay: 'Antwerp Bay 3',
    pin: '8842',
    product: 'Steel Coils',
    quantity: '25 MT',
    expiryTime: '24 Apr 2026, 02:30 PM'
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md bg-white rounded-[40px] shadow-2xl overflow-hidden border border-slate-200">
        {/* Header Pass Effect */}
        <div className="bg-[#0047AB] p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
          <div className="relative z-10 flex flex-col items-center">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-md">
                <Truck className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs font-black uppercase tracking-[0.2em] opacity-80">Terminal Access Pass</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight">{pass.orderId}</h1>
            <div className="mt-2 px-3 py-1 bg-green-500/20 text-green-300 text-[10px] font-black rounded-full uppercase tracking-widest border border-green-500/30 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Verified & Active
            </div>
          </div>
          
          {/* Perforated Edge Effect */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2 translate-y-1/2">
             {[...Array(12)].map((_, i) => (
               <div key={i} className="w-4 h-4 rounded-full bg-[#F1F5F9]" />
             ))}
          </div>
        </div>

        <div className="p-8 pt-10 space-y-8">
          {/* Main Pass Info */}
          <div className="grid grid-cols-2 gap-8">
             <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Entry Date</p>
                <p className="text-sm font-black text-slate-900">24 APR 2026</p>
             </div>
             <div className="space-y-1 text-right">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Arrival Slot</p>
                <p className="text-sm font-black text-slate-900">10:30 AM</p>
             </div>
             <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Vehicle</p>
                <p className="text-sm font-black text-slate-900">{pass.truckNumber}</p>
             </div>
             <div className="space-y-1 text-right">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Location</p>
                <p className="text-sm font-black text-slate-900">{pass.bay}</p>
             </div>
          </div>

          {/* QR Code Section */}
          <div className="bg-slate-50 p-6 rounded-[32px] border border-slate-100 flex flex-col items-center">
             <div className="w-48 h-48 bg-white p-4 rounded-2xl shadow-inner border border-slate-100 flex items-center justify-center mb-4">
                <QrCode className="w-full h-full text-[#0047AB]" />
             </div>
             <div className="text-center">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Pass PIN</p>
                <div className="flex items-center gap-2 justify-center">
                   <span className="text-3xl font-black text-slate-900 tracking-[0.2em]">{pass.pin}</span>
                   <button className="p-1.5 text-slate-300 hover:text-primary transition-colors">
                      <Copy className="w-4 h-4" />
                   </button>
                </div>
             </div>
          </div>

          {/* Important Info */}
          <div className="space-y-4">
             <div className="flex gap-4 p-4 rounded-2xl bg-amber-50 border border-amber-100">
                <Info className="w-5 h-5 text-amber-500 shrink-0" />
                <p className="text-[11px] font-bold text-amber-900 leading-relaxed">
                   Please present this pass at the main gate. Ensure the driver is wearing appropriate PPE (Safety Vest & Boots).
                </p>
             </div>

             <div className="flex items-center justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
                <span>Pass Expires in: 4h 22m</span>
                <span className="text-red-400">Unique Code</span>
             </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
             <button className="flex-1 flex items-center justify-center gap-2 py-4 bg-primary text-white text-xs font-black rounded-2xl shadow-lg shadow-primary/20 hover:shadow-xl transition-all uppercase tracking-widest">
                <Share2 className="w-4 h-4" />
                Share Pass
             </button>
             <button className="px-6 py-4 border-2 border-slate-100 text-slate-600 text-xs font-black rounded-2xl hover:bg-slate-50 transition-all uppercase tracking-widest">
                Print
             </button>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 p-6 border-t border-slate-100 text-center">
           <div className="flex items-center justify-center gap-2 text-slate-400">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">Secured by Duferco Logistique</span>
           </div>
        </div>
      </div>
    </div>
  );
}
