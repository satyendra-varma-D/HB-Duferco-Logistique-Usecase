import { useState } from 'react';
import { 
  Truck, Clock, AlertTriangle, CheckCircle2, 
  Package, MapPin, ArrowRight, Search, Plus, 
  Bell, ChevronRight, User, ShieldCheck, 
  AlertCircle, ArrowUpRight, Filter, MoreHorizontal,
  XCircle, LogIn, LogOut, CheckSquare, UserCheck
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

type TripStatus = 'WAITING_APPROVAL' | 'AT_GATE' | 'LOADING' | 'READY_FOR_EXIT' | 'DELAYED';

interface Trip {
  id: string;
  truck: string;
  driver: string;
  transporter: string;
  status: TripStatus;
  product: string;
  plannedQty: string;
  actualQty?: string;
  timeInQueue: string;
  bay?: string;
  operator?: string;
  compliance?: string[];
}

const initialTrips: Trip[] = [
  { id: 'ORD-2401', truck: 'TN-45-AX-1234', driver: 'Robert Fox', transporter: 'Global Logistics', status: 'LOADING', product: 'Diesel', plannedQty: '15,000 L', actualQty: '12,400 L', timeInQueue: '45m', bay: 'Bay 3', operator: 'Mike Johnson' },
  { id: 'ORD-2402', truck: 'BE-12-G-9988', driver: 'Arlene McCoy', transporter: 'ABC Transport', status: 'AT_GATE', product: 'Petrol', plannedQty: '12,000 L', timeInQueue: '12m' },
  { id: 'ORD-2403', truck: 'FR-99-PL-5566', driver: 'Cody Fisher', transporter: 'Nexus Energy', status: 'WAITING_APPROVAL', product: 'Diesel', plannedQty: '20,000 L', timeInQueue: '1h 20m' },
  { id: 'ORD-2406', truck: 'UK-22-KJ-7744', driver: 'Jenny Wilson', transporter: 'Global Logistics', status: 'READY_FOR_EXIT', product: 'Aviation Fuel', plannedQty: '18,500 L', actualQty: '18,500 L', timeInQueue: '2h 15m', operator: 'Sarah Chen' },
  { id: 'ORD-2409', truck: 'DE-88-MN-1122', driver: 'Guy Hawkins', transporter: 'Express Freight', status: 'DELAYED', product: 'Diesel', plannedQty: '5,000 L', timeInQueue: '3h 10m' },
  { id: 'ORD-2412', truck: 'NL-44-BB-2233', driver: 'Leslie Alexander', transporter: 'Swift Transport', status: 'WAITING_APPROVAL' as any, product: 'Petrol', plannedQty: '15,000 L', timeInQueue: '5m' },
];

const alerts = [
  { id: 'ALT-1', type: 'RED', message: 'Quantity Mismatch: ORD-2401 (Bay 3)', time: '2m ago' },
  { id: 'ALT-2', type: 'AMBER', message: 'Delayed Entry: ORD-2409 (3h total)', time: '15m ago' },
  { id: 'ALT-3', type: 'RED', message: 'Unassigned Transporter: ORD-2415', time: '1h ago' },
];

export function Dashboard() {
  const { user } = useAuth();
  const [trips, setTrips] = useState<Trip[]>(initialTrips);
  const [selectedTripId, setSelectedTripId] = useState<string>(initialTrips[0].id);

  const selectedTrip = trips.find(t => t.id === selectedTripId) || trips[0];

  const getStatusBadge = (status: TripStatus) => {
    switch (status) {
      case 'LOADING': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'AT_GATE': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'READY_FOR_EXIT': return 'bg-green-50 text-green-600 border-green-100';
      case 'DELAYED': return 'bg-red-50 text-red-600 border-red-100';
      default: return 'bg-slate-50 text-slate-500 border-slate-100';
    }
  };

  return (
    <div className="h-[calc(100vh-100px)] flex flex-col gap-4 overflow-hidden -mt-2">
      {/* Simplified Operational Top Bar */}
      <div className="bg-white border border-slate-100 p-4 rounded-2xl flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
             <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900">Live Terminal Monitor</span>
          </div>
          <div className="relative group min-w-[350px]">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
             <input 
               type="text" 
               placeholder="SEARCH BY TRIP, TRUCK OR DRIVER..."
               className="w-full bg-slate-50/50 border border-slate-100 rounded-xl pl-12 pr-4 py-2 text-[10px] font-bold uppercase tracking-widest focus:bg-white focus:outline-none focus:ring-4 ring-primary/5 transition-all"
             />
          </div>
        </div>
        <div className="flex items-center gap-3">
           <button className="flex items-center gap-2 px-5 py-2.5 bg-[#0047AB] text-white text-[10px] font-black rounded-xl uppercase tracking-widest hover:shadow-lg hover:shadow-blue-900/10 transition-all">
              <Plus className="w-4 h-4" />
              Quick Order
           </button>
           <div className="h-8 w-px bg-slate-100 mx-1" />
           <button className="relative p-2.5 bg-slate-50 rounded-xl text-slate-400 hover:text-primary transition-all">
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full border-2 border-white" />
           </button>
        </div>
      </div>

      <div className="flex-1 flex gap-4 overflow-hidden">
        {/* LEFT PANEL - EXPANDED QUEUE */}
        <div className="w-[400px] bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col overflow-hidden">
          <div className="p-5 border-b border-slate-50 flex items-center justify-between">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Queue</h3>
            <span className="text-[10px] font-bold text-slate-400">{trips.length} Trips</span>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-1">
            {trips.map((trip) => (
              <button
                key={trip.id}
                onClick={() => setSelectedTripId(trip.id)}
                className={`w-full text-left p-4 rounded-2xl transition-all border ${
                  selectedTripId === trip.id 
                    ? 'bg-slate-50 border-slate-200 shadow-inner' 
                    : 'bg-white border-transparent hover:bg-slate-50'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[9px] font-black text-primary uppercase tracking-widest">{trip.id}</span>
                  <span className="text-[9px] font-bold text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {trip.timeInQueue}
                  </span>
                </div>
                <div className={`text-sm font-black transition-colors ${selectedTripId === trip.id ? 'text-[#0047AB]' : 'text-slate-900'}`}>{trip.truck}</div>
                <div className="flex items-center justify-between mt-2">
                   <div className="text-[10px] font-bold text-slate-400">{trip.driver}</div>
                   <div className={`px-2 py-0.5 rounded text-[8px] font-black border uppercase tracking-widest ${getStatusBadge(trip.status)}`}>
                     {trip.status.replace('_', ' ')}
                   </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* CENTER PANEL - OPERATIONAL WORKSPACE */}
        <div className="flex-1 bg-white rounded-[40px] border border-slate-100 shadow-sm flex flex-col overflow-hidden">
           {/* Discrete Lifecycle Tracker */}
           <div className="px-10 py-6 border-b border-slate-50 flex items-center justify-center gap-2 bg-white">
              {['REGISTERED', 'AT GATE', 'LOADING', 'READY FOR EXIT'].map((step, idx) => {
                const isCurrent = step === selectedTrip.status.replace('_', ' ');
                const isPast = ['REGISTERED', 'AT GATE', 'LOADING', 'READY FOR EXIT'].indexOf(selectedTrip.status.replace('_', ' ')) > idx;
                
                return (
                  <div key={step} className="flex items-center">
                    <div className="flex items-center gap-3">
                       <div className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all ${
                         isCurrent ? 'bg-[#0047AB] border-[#0047AB] text-white shadow-md' :
                         isPast ? 'bg-green-500 border-green-500 text-white' : 'bg-slate-50 border-slate-100 text-slate-300'
                       }`}>
                          {isPast ? <CheckCircle2 className="w-3.5 h-3.5" /> : <span className="text-[9px] font-black">{idx + 1}</span>}
                       </div>
                       <span className={`text-[9px] font-black uppercase tracking-widest ${isCurrent ? 'text-slate-900' : 'text-slate-300'}`}>{step}</span>
                    </div>
                    {idx < 3 && <div className="w-12 h-px bg-slate-100 mx-4" />}
                  </div>
                );
              })}
           </div>

           <div className="flex-1 p-10 overflow-y-auto bg-white">
              <div className="flex items-center justify-between mb-10">
                 <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100">
                       <Truck className="w-7 h-7" />
                    </div>
                    <div>
                       <div className="flex items-center gap-3">
                          <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">{selectedTrip.truck}</h2>
                          <span className="px-2 py-0.5 border border-slate-200 text-slate-500 text-[9px] font-black rounded uppercase tracking-widest">{selectedTrip.id}</span>
                       </div>
                       <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">{selectedTrip.transporter} • {selectedTrip.product}</p>
                    </div>
                 </div>
                 <button className="p-3 text-slate-300 hover:text-slate-900 transition-colors">
                    <MoreHorizontal className="w-6 h-6" />
                 </button>
              </div>

              {/* Functional Detail Panels */}
              <div className="max-w-4xl">
                 {selectedTrip.status === 'AT_GATE' && (
                    <div className="space-y-8 animate-in fade-in duration-500">
                       <div className="grid grid-cols-2 gap-6">
                          <div className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100">
                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Driver Profile</p>
                             <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-300">
                                   <User className="w-6 h-6" />
                                </div>
                                <div>
                                   <div className="text-base font-black text-slate-900">{selectedTrip.driver}</div>
                                   <div className="text-[10px] font-bold text-primary uppercase tracking-widest">Pass ID: Verified</div>
                                </div>
                             </div>
                          </div>
                          <div className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100">
                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Allocation</p>
                             <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-300">
                                   <Package className="w-6 h-6" />
                                </div>
                                <div>
                                   <div className="text-base font-black text-slate-900">{selectedTrip.plannedQty}</div>
                                   <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{selectedTrip.product}</div>
                                </div>
                             </div>
                          </div>
                       </div>

                       <div className="flex gap-4">
                          <button className="flex-1 py-5 bg-[#0047AB] text-white text-xs font-black rounded-2xl shadow-xl shadow-blue-900/10 hover:-translate-y-0.5 transition-all uppercase tracking-[0.2em] flex items-center justify-center gap-3">
                             <LogIn className="w-5 h-5" /> Authorize Entry
                          </button>
                          <button className="flex-1 py-5 bg-white border-2 border-slate-50 text-slate-400 text-xs font-black rounded-2xl hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all uppercase tracking-[0.2em] flex items-center justify-center gap-3">
                             <XCircle className="w-5 h-5" /> Deny Access
                          </button>
                       </div>
                    </div>
                 )}

                 {selectedTrip.status === 'LOADING' && (
                    <div className="space-y-8 animate-in fade-in duration-500">
                       <div className="bg-slate-50/50 p-8 rounded-[32px] border border-slate-100">
                          <div className="grid grid-cols-2 gap-10">
                             <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Flow Progress</p>
                                <div className="flex items-end gap-2 mb-4">
                                   <div className="text-4xl font-black text-slate-900">{selectedTrip.actualQty?.split(' ')[0]}</div>
                                   <div className="text-lg font-bold text-slate-300 mb-1">/ {selectedTrip.plannedQty}</div>
                                </div>
                                <div className="h-2.5 bg-slate-200 rounded-full overflow-hidden">
                                   <div className="h-full bg-[#0047AB] w-[82%] transition-all duration-1000" />
                                </div>
                             </div>
                             <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                   <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-primary">
                                      <MapPin className="w-5 h-5" />
                                   </div>
                                   <div>
                                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Bay</p>
                                      <p className="text-sm font-black text-slate-900">{selectedTrip.bay}</p>
                                   </div>
                                </div>
                                <div className="flex items-center gap-3">
                                   <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-primary">
                                      <UserCheck className="w-5 h-5" />
                                   </div>
                                   <div>
                                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Operator</p>
                                      <p className="text-sm font-black text-slate-900">{selectedTrip.operator}</p>
                                   </div>
                                </div>
                             </div>
                          </div>
                       </div>

                       <div className="bg-amber-50/50 p-5 rounded-2xl border border-amber-100 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                             <AlertTriangle className="w-5 h-5 text-amber-500" />
                             <p className="text-[10px] font-black text-amber-700 uppercase tracking-widest">Variance Detected (2.4%)</p>
                          </div>
                          <button className="text-[10px] font-black text-amber-600 underline uppercase tracking-widest">Verify Flow</button>
                       </div>

                       <button className="w-full py-5 bg-green-600 text-white text-xs font-black rounded-2xl shadow-xl shadow-green-900/10 hover:-translate-y-0.5 transition-all uppercase tracking-[0.2em] flex items-center justify-center gap-3">
                          <CheckCircle2 className="w-5 h-5" /> Confirm Load & Exit Bay
                       </button>
                    </div>
                 )}

                 {selectedTrip.status === 'READY_FOR_EXIT' && (
                    <div className="space-y-8 animate-in fade-in duration-500">
                       <div className="grid grid-cols-3 gap-4">
                          {[
                            { label: 'Documents', icon: ShieldCheck },
                            { label: 'Security Seal', icon: CheckSquare },
                            { label: 'Weight', icon: MapPin },
                          ].map((check) => (
                            <div key={check.label} className="p-5 border border-slate-100 rounded-2xl text-center bg-slate-50/30">
                               <check.icon className="w-6 h-6 text-green-500 mx-auto mb-2" />
                               <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{check.label}</p>
                               <p className="text-[10px] font-black text-slate-900 uppercase mt-1">Verified</p>
                            </div>
                          ))}
                       </div>

                       <div className="bg-slate-50/50 rounded-3xl p-8 space-y-4 border border-slate-100">
                          <div className="flex justify-between">
                             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Net Quantity</span>
                             <span className="text-lg font-black text-slate-900">{selectedTrip.actualQty}</span>
                          </div>
                          <div className="h-px bg-slate-100" />
                          <div className="flex justify-between">
                             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Time In Terminal</span>
                             <span className="text-lg font-black text-slate-900">{selectedTrip.timeInQueue}</span>
                          </div>
                       </div>

                       <button className="w-full py-5 bg-[#0047AB] text-white text-xs font-black rounded-2xl shadow-xl shadow-blue-900/10 hover:-translate-y-0.5 transition-all uppercase tracking-[0.2em] flex items-center justify-center gap-3">
                          <LogOut className="w-5 h-5" /> Final Gate Release
                       </button>
                    </div>
                 )}

                 {selectedTrip.status === 'WAITING_APPROVAL' && (
                    <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
                       <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-200 border border-slate-100">
                          <Clock className="w-8 h-8" />
                       </div>
                       <div>
                          <h3 className="text-lg font-black text-slate-900 uppercase tracking-widest">Pending Verification</h3>
                          <p className="text-xs font-medium text-slate-400 mt-2 max-w-xs mx-auto">Review schedule and transporter documentation to authorize terminal entry.</p>
                       </div>
                       <button className="px-10 py-4 bg-primary text-white text-[10px] font-black rounded-xl uppercase tracking-widest hover:shadow-lg transition-all">Open Verification Panel</button>
                    </div>
                 )}
              </div>
           </div>

           {/* Footer Stats */}
           <div className="px-10 py-4 border-t border-slate-50 flex items-center justify-between text-slate-300">
              <div className="flex gap-6">
                 <span className="text-[9px] font-black uppercase tracking-widest">Terminal A • Active</span>
                 <span className="text-[9px] font-black uppercase tracking-widest">Shift 1 • 06:00 - 14:00</span>
              </div>
              <span className="text-[9px] font-black uppercase tracking-widest">Sys Health: Optimal</span>
           </div>
        </div>

        {/* RIGHT PANEL - EXPANDED ALERTS */}
        <div className="w-[350px] flex flex-col gap-4">
           <div className="bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col overflow-hidden flex-1">
              <div className="p-5 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
                 <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Alerts Hub</h3>
                 <div className="w-2 h-2 rounded-full bg-red-500" />
              </div>
              <div className="p-4 space-y-2 overflow-y-auto">
                 {alerts.map((alert) => (
                   <div key={alert.id} className="p-4 rounded-2xl bg-white border border-slate-100 transition-all hover:border-slate-200">
                      <div className="flex items-center justify-between mb-1">
                         <span className={`text-[8px] font-black uppercase tracking-widest ${
                           alert.type === 'RED' ? 'text-red-500' : 'text-amber-500'
                         }`}>{alert.type} PRIORITY</span>
                         <span className="text-[8px] font-bold text-slate-300">{alert.time}</span>
                      </div>
                      <p className="text-[11px] font-bold text-slate-600 leading-relaxed">{alert.message}</p>
                   </div>
                 ))}
              </div>
           </div>

           <div className="bg-slate-900 rounded-3xl p-6 text-white">
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-4">Current Capacity</p>
              <div className="flex items-end justify-between">
                 <div className="text-3xl font-black italic">84%</div>
                 <div className="text-[10px] font-black text-green-400 flex items-center gap-1 mb-1">
                    <ArrowUpRight className="w-3 h-3" /> 12%
                 </div>
              </div>
              <div className="mt-4 h-1 bg-white/10 rounded-full overflow-hidden">
                 <div className="h-full bg-[#0047AB] w-[84%]" />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
