import { useState } from 'react';
import { 
  Truck, Clock, AlertTriangle, CheckCircle2, 
  Package, MapPin, ArrowRight, Search, Plus, 
  Bell, ChevronRight, User, ShieldCheck, 
  AlertCircle, ArrowUpRight, Filter, MoreHorizontal,
  XCircle, LogIn, LogOut, CheckSquare
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
  { id: 'ORD-2412', truck: 'NL-44-BB-2233', driver: 'Leslie Alexander', transporter: 'Swift Transport', status: 'IN_TERMINAL' as any, product: 'Petrol', plannedQty: '15,000 L', timeInQueue: '5m' },
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

  const getStatusColor = (status: TripStatus) => {
    switch (status) {
      case 'LOADING': return 'bg-blue-500 text-white border-blue-600';
      case 'AT_GATE': return 'bg-amber-500 text-white border-amber-600';
      case 'READY_FOR_EXIT': return 'bg-green-500 text-white border-green-600';
      case 'DELAYED': return 'bg-red-500 text-white border-red-600';
      default: return 'bg-slate-400 text-white border-slate-500';
    }
  };

  return (
    <div className="h-[calc(100vh-100px)] flex flex-col gap-4 overflow-hidden -mt-2">
      {/* Top Operational Bar */}
      <div className="bg-[#0A1128] text-white p-4 rounded-2xl flex items-center justify-between shadow-lg shadow-blue-900/10">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
             <span className="text-xs font-black uppercase tracking-[0.2em]">Live Terminal Control</span>
          </div>
          <div className="relative group min-w-[400px]">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
             <input 
               type="text" 
               placeholder="SEARCH TRIP ID, VEHICLE OR DRIVER..."
               className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-2 text-[10px] font-black uppercase tracking-widest focus:bg-white/10 focus:outline-none focus:ring-1 ring-primary transition-all"
             />
          </div>
        </div>
        <div className="flex items-center gap-4">
           <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-[10px] font-black rounded-lg uppercase tracking-widest hover:brightness-110 transition-all">
              <Plus className="w-4 h-4" />
              Quick Order
           </button>
           <div className="h-8 w-px bg-white/10 mx-2" />
           <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-[#0A1128]" />
           </button>
        </div>
      </div>

      <div className="flex-1 flex gap-4 overflow-hidden">
        {/* LEFT PANEL - LIVE QUEUE */}
        <div className="w-[350px] bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col overflow-hidden">
          <div className="p-5 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.15em]">Live Execution Queue</h3>
            <span className="px-2 py-1 bg-primary/10 text-primary text-[10px] font-black rounded">{trips.length}</span>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {trips.map((trip) => (
              <button
                key={trip.id}
                onClick={() => setSelectedTripId(trip.id)}
                className={`w-full text-left p-4 rounded-2xl border transition-all relative overflow-hidden group ${
                  selectedTripId === trip.id 
                    ? 'bg-[#0047AB] border-[#0047AB] text-white shadow-lg shadow-blue-900/20' 
                    : 'bg-white border-slate-100 text-slate-600 hover:border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${
                    selectedTripId === trip.id ? 'bg-white/10 border border-white/20' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {trip.id}
                  </span>
                  <span className="text-[9px] font-bold opacity-60 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {trip.timeInQueue}
                  </span>
                </div>
                <div className="text-sm font-black mb-1 truncate">{trip.truck}</div>
                <div className="flex items-center justify-between">
                   <div className="text-[10px] font-bold opacity-70">{trip.driver}</div>
                   <div className={`px-2 py-0.5 rounded text-[8px] font-black border uppercase tracking-widest ${
                     selectedTripId === trip.id ? 'bg-white text-[#0047AB]' : getStatusColor(trip.status)
                   }`}>
                     {trip.status.replace('_', ' ')}
                   </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* CENTER PANEL - ACTIVE OPERATION */}
        <div className="flex-1 bg-white rounded-[40px] border border-slate-100 shadow-sm flex flex-col overflow-hidden relative">
           {/* Lifecycle Tracker */}
           <div className="px-10 py-6 border-b border-slate-50 flex items-center justify-center gap-4 bg-slate-50/30">
              {['REGISTERED', 'AT GATE', 'LOADING', 'READY FOR EXIT'].map((step, idx) => {
                const isCurrent = step === selectedTrip.status.replace('_', ' ');
                const isPast = ['REGISTERED', 'AT GATE', 'LOADING', 'READY FOR EXIT'].indexOf(selectedTrip.status.replace('_', ' ')) > idx;
                
                return (
                  <div key={step} className="flex items-center gap-4">
                    <div className="flex flex-col items-center gap-2">
                       <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                         isCurrent ? 'bg-primary border-primary text-white shadow-lg shadow-primary/30 scale-110' :
                         isPast ? 'bg-green-500 border-green-500 text-white' : 'bg-white border-slate-200 text-slate-300'
                       }`}>
                          {isPast ? <CheckCircle2 className="w-4 h-4" /> : <span className="text-[10px] font-black">{idx + 1}</span>}
                       </div>
                       <span className={`text-[8px] font-black uppercase tracking-widest ${isCurrent ? 'text-primary' : 'text-slate-400'}`}>{step}</span>
                    </div>
                    {idx < 3 && <div className="w-16 h-0.5 bg-slate-100" />}
                  </div>
                );
              })}
           </div>

           <div className="flex-1 p-10 overflow-y-auto">
              {/* Contextual Header */}
              <div className="flex items-center justify-between mb-10">
                 <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-[24px] bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100">
                       <Truck className="w-8 h-8" />
                    </div>
                    <div>
                       <div className="flex items-center gap-3">
                          <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">{selectedTrip.truck}</h2>
                          <span className="px-3 py-1 bg-primary text-white text-[10px] font-black rounded-lg uppercase tracking-widest">{selectedTrip.id}</span>
                       </div>
                       <p className="text-sm font-bold text-slate-400 mt-1 uppercase tracking-widest">{selectedTrip.transporter} • {selectedTrip.product}</p>
                    </div>
                 </div>
                 <button className="p-3 text-slate-300 hover:text-slate-900 transition-colors">
                    <MoreHorizontal className="w-6 h-6" />
                 </button>
              </div>

              {/* Dynamic Execution Panels */}
              {selectedTrip.status === 'AT_GATE' && (
                <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
                   <div className="grid grid-cols-2 gap-8">
                      <div className="bg-slate-50 p-8 rounded-[32px] border border-slate-100">
                         <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Driver Verification</div>
                         <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400">
                               <User className="w-7 h-7" />
                            </div>
                            <div>
                               <div className="text-lg font-black text-slate-900">{selectedTrip.driver}</div>
                               <div className="text-[10px] font-bold text-primary uppercase tracking-widest">Digital Pass ID: PASS-9981</div>
                            </div>
                         </div>
                      </div>
                      <div className="bg-slate-50 p-8 rounded-[32px] border border-slate-100">
                         <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Planned Load</div>
                         <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400">
                               <Package className="w-7 h-7" />
                            </div>
                            <div>
                               <div className="text-lg font-black text-slate-900">{selectedTrip.plannedQty}</div>
                               <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{selectedTrip.product}</div>
                            </div>
                         </div>
                      </div>
                   </div>

                   <div className="flex gap-4">
                      <button className="flex-1 py-6 bg-[#0047AB] text-white text-sm font-black rounded-3xl shadow-xl shadow-blue-900/20 hover:shadow-2xl hover:-translate-y-1 transition-all uppercase tracking-[0.2em] flex items-center justify-center gap-3">
                         <LogIn className="w-6 h-6" /> Allow Entry
                      </button>
                      <button className="flex-1 py-6 bg-white border-2 border-red-50 text-red-500 text-sm font-black rounded-3xl hover:bg-red-50 transition-all uppercase tracking-[0.2em] flex items-center justify-center gap-3">
                         <XCircle className="w-6 h-6" /> Reject Vehicle
                      </button>
                   </div>
                </div>
              )}

              {selectedTrip.status === 'LOADING' && (
                <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
                   <div className="bg-blue-50 p-10 rounded-[40px] border border-blue-100 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-10 opacity-[0.05]">
                         <Clock className="w-64 h-64" />
                      </div>
                      <div className="relative z-10 grid grid-cols-2 gap-12">
                         <div>
                            <div className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-4">Loading Progress</div>
                            <div className="flex items-end gap-3 mb-4">
                               <div className="text-5xl font-black text-blue-900">{selectedTrip.actualQty?.split(' ')[0]}</div>
                               <div className="text-xl font-black text-blue-400 mb-1">/ {selectedTrip.plannedQty}</div>
                            </div>
                            <div className="h-4 bg-white/50 rounded-full overflow-hidden border border-blue-200">
                               <div className="h-full bg-blue-500 w-[82%] animate-pulse" />
                            </div>
                         </div>
                         <div className="space-y-6">
                            <div className="flex items-center gap-4">
                               <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-blue-500 shadow-sm">
                                  <MapPin className="w-6 h-6" />
                               </div>
                               <div>
                                  <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Active Bay</p>
                                  <p className="text-lg font-black text-blue-900">{selectedTrip.bay}</p>
                               </div>
                            </div>
                            <div className="flex items-center gap-4">
                               <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-blue-500 shadow-sm">
                                  <UserCheck className="w-6 h-6" />
                               </div>
                               <div>
                                  <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Terminal Operator</p>
                                  <p className="text-lg font-black text-blue-900">{selectedTrip.operator}</p>
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>

                   <div className="bg-red-50 p-6 rounded-3xl border border-red-100 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-500">
                            <AlertTriangle className="w-5 h-5" />
                         </div>
                         <div>
                            <p className="text-xs font-black text-red-900 uppercase">Quantity Variance Detected</p>
                            <p className="text-[10px] font-bold text-red-400">Actual flow is 2.4% below planned target.</p>
                         </div>
                      </div>
                      <button className="px-4 py-2 bg-white text-red-500 text-[10px] font-black rounded-lg border border-red-200 uppercase tracking-widest">Log Exception</button>
                   </div>

                   <button className="w-full py-6 bg-green-600 text-white text-sm font-black rounded-3xl shadow-xl shadow-green-900/20 hover:shadow-2xl hover:-translate-y-1 transition-all uppercase tracking-[0.2em] flex items-center justify-center gap-3">
                      <CheckCircle2 className="w-6 h-6" /> Complete Loading & Print Ticket
                   </button>
                </div>
              )}

              {selectedTrip.status === 'READY_FOR_EXIT' && (
                <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {[
                        { label: 'Documentation', status: 'VERIFIED', icon: ShieldCheck },
                        { label: 'Security Seal', status: 'APPLIED', icon: CheckSquare },
                        { label: 'Weight Bridge', status: 'MATCHED', icon: MapPin },
                      ].map((check) => (
                        <div key={check.label} className="bg-green-50 p-6 rounded-3xl border border-green-100 text-center">
                           <check.icon className="w-8 h-8 text-green-500 mx-auto mb-3" />
                           <p className="text-[10px] font-black text-green-400 uppercase tracking-widest mb-1">{check.label}</p>
                           <p className="text-xs font-black text-green-900">{check.status}</p>
                        </div>
                      ))}
                   </div>

                   <div className="bg-white border border-slate-100 rounded-[32px] p-8 space-y-6 shadow-inner">
                      <div className="flex items-center justify-between border-b border-slate-50 pb-4">
                         <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Final Loaded Quantity</span>
                         <span className="text-xl font-black text-slate-900">{selectedTrip.actualQty}</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-slate-50 pb-4">
                         <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Loading Duration</span>
                         <span className="text-xl font-black text-slate-900">42m 15s</span>
                      </div>
                      <div className="flex items-center justify-between">
                         <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Exit Bay Authorization</span>
                         <span className="px-3 py-1 bg-green-500 text-white text-[10px] font-black rounded uppercase">AUTO-APPROVED</span>
                      </div>
                   </div>

                   <button className="w-full py-6 bg-[#0047AB] text-white text-sm font-black rounded-3xl shadow-xl shadow-blue-900/20 hover:shadow-2xl hover:-translate-y-1 transition-all uppercase tracking-[0.2em] flex items-center justify-center gap-3">
                      <LogOut className="w-6 h-6" /> Authorize Gate Exit
                   </button>
                </div>
              )}

              {selectedTrip.status === 'WAITING_APPROVAL' && (
                <div className="flex flex-col items-center justify-center h-[300px] text-center space-y-6">
                   <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center text-amber-500 border border-amber-100">
                      <Clock className="w-10 h-10 animate-pulse" />
                   </div>
                   <div>
                      <h3 className="text-xl font-black text-slate-900 uppercase tracking-widest">Awaiting Admin Verification</h3>
                      <p className="text-xs font-bold text-slate-400 mt-2 max-w-sm">Trip scheduling info has been submitted by the transporter. Verify the slot to generate the digital access pass.</p>
                   </div>
                   <button className="px-10 py-4 bg-primary text-white text-[10px] font-black rounded-2xl shadow-xl shadow-primary/20 hover:shadow-2xl hover:-translate-y-1 transition-all uppercase tracking-widest">Review Schedule</button>
                </div>
              )}
           </div>

           {/* Quick Actions Footer */}
           <div className="px-10 py-4 border-t border-slate-50 bg-slate-50/50 flex items-center justify-between">
              <div className="flex items-center gap-6">
                 <button className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-primary transition-colors flex items-center gap-2">
                    <MapPin className="w-3 h-3" /> View Terminal Map
                 </button>
                 <button className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-primary transition-colors flex items-center gap-2">
                    <User className="w-3 h-3" /> Contact Support
                 </button>
              </div>
              <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">v4.2.0-stable</p>
           </div>
        </div>

        {/* RIGHT PANEL - ALERTS & EXCEPTIONS */}
        <div className="w-[300px] flex flex-col gap-4">
           {/* Alerts Section */}
           <div className="bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col overflow-hidden flex-1">
              <div className="p-5 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
                 <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.15em]">System Alerts</h3>
                 <AlertCircle className="w-4 h-4 text-red-500" />
              </div>
              <div className="p-4 space-y-3 overflow-y-auto">
                 {alerts.map((alert) => (
                   <div key={alert.id} className={`p-4 rounded-2xl border-l-4 shadow-sm group hover:scale-[1.02] transition-all cursor-pointer ${
                     alert.type === 'RED' ? 'bg-red-50 border-red-500' : 'bg-amber-50 border-amber-500'
                   }`}>
                      <div className="flex items-center justify-between mb-2">
                         <span className={`text-[8px] font-black uppercase tracking-widest ${
                           alert.type === 'RED' ? 'text-red-600' : 'text-amber-600'
                         }`}>{alert.type} PRIORITY</span>
                         <span className="text-[9px] font-bold text-slate-400">{alert.time}</span>
                      </div>
                      <p className="text-[11px] font-black text-slate-800 leading-relaxed">{alert.message}</p>
                   </div>
                 ))}
              </div>
           </div>

           {/* Quick Stats Mini */}
           <div className="bg-[#0A1128] rounded-3xl p-6 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-10">
                 <Package className="w-20 h-20" />
              </div>
              <div className="relative z-10 space-y-4">
                 <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Throughput</h4>
                 <div className="flex items-end gap-2">
                    <div className="text-4xl font-black">2.4k</div>
                    <div className="text-xs font-bold text-green-400 mb-1 flex items-center">
                       <ArrowUpRight className="w-3 h-3" /> +12%
                    </div>
                 </div>
                 <p className="text-[10px] font-medium text-slate-500 uppercase tracking-widest">Current Shift: 06:00 - 14:00</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
