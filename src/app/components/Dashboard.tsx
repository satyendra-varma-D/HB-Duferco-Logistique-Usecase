import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router';
import {
   Truck, Clock, AlertTriangle, CheckCircle2,
   Package, MapPin, ArrowRight, Search, Plus,
   Bell, ChevronRight, User, ShieldCheck,
   AlertCircle, ArrowUpRight, Filter, MoreHorizontal,
   XCircle, LogIn, LogOut, CheckSquare, UserCheck, Settings
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

type TripStatus = 'TRIP_SCHEDULED' | 'IN_TERMINAL' | 'LOADING' | 'LOADED' | 'DISPATCHED' | 'DELAYED';

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
   pickup?: string;
   delivery?: string;
   loadingDate?: string;
}

const initialTrips: Trip[] = [
   { id: 'ORD-BE-1001', truck: '1-ABC-234', driver: 'Jean Dupont', transporter: 'H. Essers', status: 'IN_TERMINAL', product: 'Steel Coils', plannedQty: '25 MT', actualQty: '22 MT', timeInQueue: '45m', bay: 'Antwerp Bay 3', operator: 'Olivier Janssens', pickup: 'Antwerp Port Terminal', delivery: 'ArcelorMittal Gent', loadingDate: '24 Apr 2026' },
   { id: 'ORD-BE-1002', truck: '2-XYZ-789', driver: 'Marc De Smet', transporter: 'Van Moer Logistics', status: 'TRIP_SCHEDULED', product: 'Steel Bars', plannedQty: '18 MT', timeInQueue: '12m', pickup: 'Ghent Terminal', delivery: 'TotalEnergies Brussels', loadingDate: '24 Apr 2026' },
   { id: 'ORD-BE-1003', truck: 'BE-TK-9087', driver: 'Thomas Vermeulen', transporter: 'Sitra Group', status: 'TRIP_SCHEDULED', product: 'Steel Coils', plannedQty: '30 MT', timeInQueue: '1h 20m', pickup: 'Antwerp Port Terminal', delivery: 'Industrial Distribution Centers', loadingDate: '25 Apr 2026' },
   { id: 'ORD-BE-1006', truck: '1-DEF-456', driver: 'Lucas Peeters', transporter: 'Transport Gheys', status: 'LOADED', product: 'Steel Plates', plannedQty: '40 MT', actualQty: '40 MT', timeInQueue: '2h 15m', operator: 'Sarah Chen', pickup: 'Zeebrugge Terminal', delivery: 'ExxonMobil Antwerp Refinery', loadingDate: '24 Apr 2026' },
   { id: 'ORD-BE-1012', truck: '1-JKL-789', driver: 'Jean Peeters', transporter: 'H. Essers', status: 'IN_TERMINAL', product: 'Steel Bars', plannedQty: '20 MT', timeInQueue: '5m', pickup: 'Antwerp Port Terminal', delivery: 'ArcelorMittal Gent', loadingDate: '25 Apr 2026' },
   { id: 'ORD-BE-1008', truck: 'TBD', driver: 'TBD', transporter: 'H. Essers', status: 'TRIP_SCHEDULED', product: 'Chemical Drums', plannedQty: '12 MT', timeInQueue: 'Pending', pickup: 'Antwerp Port Terminal', delivery: 'BASF Ludwigshafen', loadingDate: '25 Apr 2026' },
   { id: 'ORD-BE-1009', truck: 'TBD', driver: 'TBD', transporter: 'H. Essers', status: 'TRIP_SCHEDULED', product: 'Liquid Fertilizers', plannedQty: '22 MT', timeInQueue: 'Pending', pickup: 'Ghent Terminal', delivery: 'Bayer Leverkusen', loadingDate: '25 Apr 2026' },
   { id: 'ORD-BE-1015', truck: '1-AAA-111', driver: 'Sébastien Loeb', transporter: 'Sitra Group', status: 'DELAYED', product: 'Steel Sheets', plannedQty: '15 MT', timeInQueue: '3h 10m', pickup: 'Zeebrugge Terminal', delivery: 'Ford Genk', loadingDate: '24 Apr 2026' },
];



export function Dashboard() {
   const { user } = useAuth();
   const navigate = useNavigate();
   const [trips, setTrips] = useState<Trip[]>(initialTrips);
   const [selectedTripId, setSelectedTripId] = useState<string>(initialTrips[0].id);
   const [dateRange, setDateRange] = useState('Daily');

   const getMetrics = () => {
      switch (dateRange) {
         case 'Monthly': return { active: '45', volume: '3,450 MT', trips: '120 Trips' };
         case 'Yearly': return { active: '112', volume: '41,200 MT', trips: '1,450 Trips' };
         default: return { active: '12', volume: '142 MT', trips: '5 Trips' };
      }
   };
   const metrics = getMetrics();

   const selectedTrip = trips.find(t => t.id === selectedTripId) || trips[0];

   const updateTripStatus = (id: string, newStatus: TripStatus) => {
      setTrips(trips.map(t => t.id === id ? { ...t, status: newStatus } : t));
   };

   const getStatusBadge = (status: TripStatus) => {
      switch (status) {
         case 'IN_TERMINAL': return 'bg-blue-50 text-blue-600 border-blue-100';
         case 'TRIP_SCHEDULED': return 'bg-amber-50 text-amber-600 border-amber-100';
         case 'LOADING': return 'bg-orange-50 text-orange-600 border-orange-100';
         case 'LOADED': return 'bg-green-50 text-green-600 border-green-100';
         case 'DELAYED': return 'bg-red-50 text-red-600 border-red-100';
         case 'DISPATCHED': return 'bg-slate-900 text-white border-slate-900';
         default: return 'bg-slate-50 text-slate-500 border-slate-100';
      }
   };

   const getStatusLabel = (status: string) => {
      if (status === 'TRIP_SCHEDULED') return 'Scheduled';
      if (status === 'IN_TERMINAL') return 'In Terminal';
      if (status === 'LOADING') return 'Loading';
      if (status === 'LOADED') return 'Loaded';
      if (status === 'DISPATCHED') return 'Dispatched';
      return status;
   };

   return (
      <div className="w-full h-[calc(100vh-100px)] flex flex-col gap-4 overflow-hidden -mt-2">
         {/* High-Level Insight Cards & Filters */}
         <div className="w-full flex items-center gap-6 bg-white p-4 rounded-3xl border border-slate-100 shadow-sm">
            <div className="flex flex-col gap-2 min-w-[150px] border-r border-slate-100 pr-6 pl-2">
               <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-2 rounded-full bg-[#0047AB] animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900">Insights</span>
               </div>
               <div className="flex flex-col gap-1.5">
                  {['Daily', 'Monthly', 'Yearly'].map(r => (
                     <button
                        key={r}
                        onClick={() => setDateRange(r)}
                        className={`px-4 py-2 text-left text-[9px] font-black uppercase tracking-widest rounded-xl transition-all ${dateRange === r ? 'bg-[#0047AB] text-white shadow-md' : 'text-slate-400 hover:bg-slate-50'
                           }`}
                     >
                        {r}
                     </button>
                  ))}
               </div>
            </div>

            <div className="flex-1 grid grid-cols-3 gap-6 pr-2">
               {/* Top Transporter */}
               <div className="bg-blue-50/30 border border-blue-100/50 rounded-2xl p-5 flex items-center justify-between hover:border-[#0047AB]/20 transition-colors">
                  <div>
                     <div className="flex items-center gap-2 mb-2">
                        <Truck className="w-4 h-4 text-[#0047AB]" />
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Transporters Active</span>
                     </div>
                     <span className="text-2xl font-black text-slate-900">{metrics.active} <span className="text-[10px] text-[#0047AB] ml-1 uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded">Orders Accepted</span></span>
                  </div>
               </div>

               {/* Volume Fulfilled */}
               <div className="bg-blue-50/30 border border-blue-100/50 rounded-2xl p-5 flex items-center justify-between hover:border-[#0047AB]/20 transition-colors">
                  <div>
                     <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 className="w-4 h-4 text-[#0047AB]" />
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Volume Fulfilled</span>
                     </div>
                     <span className="text-2xl font-black text-slate-900">{metrics.volume}</span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-white border border-blue-50 shadow-sm flex items-center justify-center text-[#0047AB]">
                     <Package className="w-5 h-5" />
                  </div>
               </div>

               {/* Scheduled Trips */}
               <div className="bg-blue-50/30 border border-blue-100/50 rounded-2xl p-5 flex items-center justify-between hover:border-[#0047AB]/20 transition-colors">
                  <div>
                     <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4 text-[#0047AB]" />
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Scheduled Trips</span>
                     </div>
                     <span className="text-2xl font-black text-slate-900">{metrics.trips}</span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-white border border-blue-50 shadow-sm flex items-center justify-center text-[#0047AB]">
                     <ArrowRight className="w-5 h-5" />
                  </div>
               </div>
            </div>
         </div>

         <div className="w-full flex-1 flex gap-4 overflow-hidden">
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
                        className={`w-full text-left p-4 rounded-2xl transition-all border ${selectedTripId === trip.id
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
                              {getStatusLabel(trip.status)}
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
                  {['Scheduled', 'In Terminal', 'Loaded', 'Dispatched'].map((step, idx) => {
                     const isCurrent = step === getStatusLabel(selectedTrip.status);
                     const isPast = ['Scheduled', 'In Terminal', 'Loaded', 'Dispatched'].indexOf(getStatusLabel(selectedTrip.status)) > idx;

                     return (
                        <div key={step} className="flex items-center">
                           <div className="flex items-center gap-3">
                              <div className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all ${isCurrent ? 'bg-[#0047AB] border-[#0047AB] text-white shadow-md' :
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

               <div className="w-full flex-1 p-6 overflow-y-auto bg-white">


                  {/* Unified Workspace Section */}
                  <div className="w-full flex gap-10 bg-slate-50/30 p-10 rounded-[40px] border border-slate-100 min-h-[600px] relative overflow-hidden">
                     {/* Left Column: Info & Actions */}
                     <div className="w-[450px] flex flex-col justify-between z-10 shrink-0">
                        <div className="space-y-10">
                           <div className="flex items-center gap-6">
                              <div className="w-16 h-16 rounded-3xl bg-white flex items-center justify-center text-[#0047AB] border border-blue-50 shadow-sm">
                                 <Truck className="w-8 h-8" />
                              </div>
                              <div>
                                 <div className="flex items-center gap-3">
                                    <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase">{selectedTrip.truck}</h2>
                                    <span className="px-4 py-1.5 border border-blue-50 bg-blue-50/30 text-[#0047AB] text-[11px] font-black rounded-xl uppercase tracking-widest shadow-sm">
                                       {selectedTrip.id}
                                    </span>
                                 </div>
                                 <p className="text-sm font-bold text-slate-400 mt-1 uppercase tracking-widest">{selectedTrip.transporter} • {selectedTrip.product}</p>
                              </div>
                           </div>

                           <div className="grid grid-cols-1 gap-10">
                              <div className="grid grid-cols-2 gap-10 pt-10 border-t border-slate-200/60">
                                 <div className="space-y-6">
                                    <div className="flex items-center gap-4">
                                       <div className="w-11 h-11 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-300">
                                          <User className="w-6 h-6" />
                                       </div>
                                       <div>
                                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Driver Name</p>
                                          <p className="text-base font-black text-slate-900">{selectedTrip.driver}</p>
                                       </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                       <div className="w-11 h-11 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-300">
                                          <Package className="w-6 h-6" />
                                       </div>
                                       <div>
                                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Scheduled Quantity</p>
                                          <p className="text-base font-black text-slate-900">{selectedTrip.plannedQty}</p>
                                       </div>
                                    </div>
                                 </div>
                                 <div className="space-y-6">
                                    <div className="flex items-center gap-4">
                                       <div className="w-11 h-11 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-[#0047AB]">
                                          <MapPin className="w-6 h-6" />
                                       </div>
                                       <div>
                                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pickup Location</p>
                                          <p className="text-sm font-bold text-slate-700">{selectedTrip.pickup}</p>
                                       </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                       <div className="w-11 h-11 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-[#0047AB]">
                                          <ArrowRight className="w-6 h-6" />
                                       </div>
                                       <div>
                                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Delivery Location</p>
                                          <p className="text-sm font-bold text-slate-700">{selectedTrip.delivery}</p>
                                       </div>
                                    </div>
                                 </div>
                              </div>

                              {/* Operator/Bay info moved here if needed or kept simple */}
                              {selectedTrip.status === 'IN_TERMINAL' && (
                                 <div className="flex items-center gap-8 py-6 px-8 bg-blue-50/30 rounded-3xl border border-blue-100/50">
                                    <div className="flex items-center gap-3">
                                       <UserCheck className="w-5 h-5 text-[#0047AB]" />
                                       <div>
                                          <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Operator</p>
                                          <p className="text-xs font-black text-slate-900">{selectedTrip.operator || 'Waiting...'}</p>
                                       </div>
                                    </div>
                                    <div className="w-px h-8 bg-blue-100" />
                                    <div className="flex items-center gap-3">
                                       <MapPin className="w-5 h-5 text-[#0047AB]" />
                                       <div>
                                          <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Active Bay</p>
                                          <p className="text-xs font-black text-slate-900">{selectedTrip.bay || 'Pending'}</p>
                                       </div>
                                    </div>
                                 </div>
                              )}
                           </div>
                        </div>

                        {/* Bottom Left Action Buttons */}
                        <div className="max-w-md animate-in fade-in slide-in-from-left-4 duration-500">
                           {selectedTrip.status === 'TRIP_SCHEDULED' && (
                              <button
                                 onClick={() => navigate('/gate?action=scan&mode=checkin')}
                                 className="w-full py-6 bg-[#0047AB] text-white text-sm font-black rounded-[24px] shadow-2xl shadow-blue-900/20 hover:-translate-y-1 hover:shadow-[#0047AB]/30 transition-all uppercase tracking-[0.2em] flex items-center justify-center gap-4 group"
                              >
                                 <LogIn className="w-6 h-6 transition-transform group-hover:translate-x-1" />
                                 Authorize Entry
                              </button>
                           )}

                           {selectedTrip.status === 'IN_TERMINAL' && (
                              <button
                                 onClick={() => navigate(`/loading`)}
                                 className="w-full py-6 bg-green-600 text-white text-sm font-black rounded-[24px] shadow-2xl shadow-green-900/20 hover:-translate-y-1 hover:shadow-green-600/30 transition-all uppercase tracking-[0.2em] flex items-center justify-center gap-4 group"
                              >
                                 <CheckCircle2 className="w-6 h-6" />
                                 Confirm Load & Release
                              </button>
                           )}

                           {selectedTrip.status === 'LOADED' && (
                              <button
                                 onClick={() => navigate(`/gate?action=scan&mode=checkout`)}
                                 className="w-full py-6 bg-[#0047AB] text-white text-sm font-black rounded-[24px] shadow-2xl shadow-blue-900/20 hover:-translate-y-1 hover:shadow-[#0047AB]/30 transition-all uppercase tracking-[0.2em] flex items-center justify-center gap-4 group"
                              >
                                 <LogOut className="w-6 h-6" />
                                 Authorize Final Exit
                              </button>
                           )}
                        </div>
                     </div>
                     {/* Right Column: Premium Tracking View */}
                     <div className="w-[55%] bg-[#F1F5F9] rounded-[48px] relative overflow-hidden border border-slate-200 shadow-2xl group">

                        {/* BACKGROUND GRID (Dotted) */}
                        <div className="absolute inset-0"
                           style={{
                              backgroundImage: 'radial-gradient(#CBD5E1 1px, transparent 1px)',
                              backgroundSize: '32px 32px'
                           }}>
                        </div>

                        {/* LIVE INDICATOR */}
                        <div className="absolute top-8 right-8 z-30">
                           <div className="bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 border border-white/10 shadow-xl">
                              <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                              <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Live View</span>
                           </div>
                        </div>

                        {/* ORIGIN & DESTINATION CHIPS */}
                        <div className="absolute top-8 left-8 flex items-center gap-4 z-30">
                           <div className="bg-white px-5 py-3 rounded-2xl shadow-xl border border-slate-100 flex flex-col gap-1 min-w-[140px]">
                              <div className="flex items-center gap-2">
                                 <div className="w-2 h-2 rounded-full bg-green-500" />
                                 <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Origin</span>
                              </div>
                              <span className="text-xs font-black text-slate-900 truncate">{selectedTrip.pickup}</span>
                           </div>
                           <div className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-slate-100 flex items-center justify-center shadow-lg">
                              <ArrowRight className="w-4 h-4 text-slate-400" />
                           </div>
                           <div className="bg-white px-5 py-3 rounded-2xl shadow-xl border border-slate-100 flex flex-col gap-1 min-w-[140px]">
                              <div className="flex items-center gap-2">
                                 <div className="w-2 h-2 rounded-full bg-red-500" />
                                 <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Destination</span>
                              </div>
                              <span className="text-xs font-black text-slate-900 truncate">{selectedTrip.delivery}</span>
                           </div>
                        </div>

                        {/* STYLIZED ROUTE SVG */}
                        <svg className="absolute inset-0 w-full h-full p-20 z-10" viewBox="0 0 1000 600">
                           <defs>
                              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                                 <feGaussianBlur stdDeviation="8" result="blur" />
                                 <feComposite in="SourceGraphic" in2="blur" operator="over" />
                              </filter>
                              <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                 <stop offset="0%" stopColor="#10B981" />
                                 <stop offset="50%" stopColor="#3B82F6" />
                                 <stop offset="100%" stopColor="#EF4444" />
                              </linearGradient>
                           </defs>

                           {/* Main Path */}
                           <path
                              d="M 50 550 L 150 400 L 350 500 L 550 300 L 750 420 L 950 100"
                              fill="none"
                              stroke="#E2E8F0"
                              strokeWidth="12"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="opacity-50"
                           />

                           {/* Traveled Path */}
                           <path
                              d="M 50 550 L 150 400 L 350 500 L 550 300"
                              fill="none"
                              stroke="#0047AB"
                              strokeWidth="8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              filter="url(#glow)"
                              className="animate-draw-path"
                           />

                           {/* Vehicle Marker */}
                           <g transform="translate(550, 300)">
                              <circle r="25" fill="#0047AB" fillOpacity="0.1" className="animate-ping" />
                              <circle r="12" fill="#0047AB" stroke="white" strokeWidth="4" />
                              <g transform="translate(-15, -45)" className="animate-bounce">
                                 <path d="M 0 0 L 30 0 L 15 20 Z" fill="#0047AB" />
                              </g>
                           </g>

                           {/* Origin Point */}
                           <circle cx="50" cy="550" r="8" fill="#10B981" stroke="white" strokeWidth="3" />
                           {/* Destination Point */}
                           <circle cx="950" cy="100" r="8" fill="#EF4444" stroke="white" strokeWidth="3" />
                        </svg>

                        {/* TELEMETRY CARD */}
                        <div className="absolute bottom-10 left-10 z-30 w-72 bg-white/95 backdrop-blur-md rounded-[32px] border border-white shadow-2xl p-6 overflow-hidden">
                           <div className="flex items-start justify-between mb-6">
                              <div className="flex items-center gap-3">
                                 <div className="w-12 h-12 rounded-2xl bg-[#0047AB] flex items-center justify-center text-white shadow-lg shadow-blue-900/20">
                                    <Truck className="w-6 h-6" />
                                 </div>
                                 <div>
                                    <p className="text-sm font-black text-slate-900 tracking-tight">{selectedTrip.truck}</p>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Driver: {selectedTrip.driver}</p>
                                 </div>
                              </div>
                              <div className="text-right">
                                 <p className="text-xl font-black text-slate-900">68 <span className="text-[10px] font-black text-slate-400">km/h</span></p>
                                 <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Current Speed</p>
                              </div>
                           </div>

                           <div className="grid grid-cols-3 gap-4 mb-6">
                              <div className="space-y-1">
                                 <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1"><CheckSquare className="w-2.5 h-2.5" /> Fuel</p>
                                 <p className="text-xs font-black text-slate-900">72%</p>
                              </div>
                              <div className="space-y-1 text-center">
                                 <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest flex items-center justify-center gap-1"><Clock className="w-2.5 h-2.5" /> Temp</p>
                                 <p className="text-xs font-black text-slate-900">4°C</p>
                              </div>
                              <div className="space-y-1 text-right">
                                 <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest flex items-center justify-end gap-1"><Clock className="w-2.5 h-2.5" /> ETA</p>
                                 <p className="text-xs font-black text-[#0047AB]">14:30</p>
                              </div>
                           </div>

                           <div className="bg-slate-50 px-4 py-3 rounded-2xl border border-slate-100 flex items-center gap-3">
                              <div className="w-2 h-2 rounded-full bg-green-500" />
                              <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Secure & Protected Route</span>
                           </div>
                        </div>

                        {/* FLOATING ACTION BUTTONS */}
                        <div className="absolute bottom-10 right-10 z-30 flex flex-col gap-3">
                           <button className="w-12 h-12 bg-white rounded-2xl shadow-xl border border-slate-100 flex items-center justify-center text-slate-400 hover:text-[#0047AB] hover:-translate-y-1 transition-all group">
                              <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform" />
                           </button>
                           <button className="w-12 h-12 bg-white rounded-2xl shadow-xl border border-slate-100 flex items-center justify-center text-slate-400 hover:text-[#0047AB] hover:-translate-y-1 transition-all">
                              <ShieldCheck className="w-5 h-5" />
                           </button>
                           <button className="w-12 h-12 bg-white rounded-2xl shadow-xl border border-slate-100 flex items-center justify-center text-slate-400 hover:text-[#0047AB] hover:-translate-y-1 transition-all">
                              <Settings className="w-5 h-5" />
                           </button>
                        </div>
                     </div>

                     {selectedTrip.status === 'DISPATCHED' && (
                        <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
                           <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-green-500 border border-green-100">
                              <CheckCircle2 className="w-8 h-8" />
                           </div>
                           <div>
                              <h3 className="text-lg font-black text-slate-900 uppercase tracking-widest">Exited Terminal</h3>
                              <p className="text-xs font-medium text-slate-400 mt-2 max-w-xs mx-auto">The vehicle has successfully completed its operation and exited the terminal gates.</p>
                           </div>
                           <button className="px-10 py-4 bg-slate-900 text-white text-[10px] font-black rounded-xl uppercase tracking-widest">View Audit Log</button>
                        </div>
                     )}

                     {selectedTrip.status === 'DELAYED' && (
                        <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
                           <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-red-500 border border-red-100">
                              <AlertCircle className="w-8 h-8" />
                           </div>
                           <div>
                              <h3 className="text-lg font-black text-slate-900 uppercase tracking-widest text-red-500">Delayed Operation</h3>
                              <p className="text-xs font-medium text-slate-400 mt-2 max-w-xs mx-auto">This trip has exceeded the expected dwell time. Immediate operational attention is required.</p>
                           </div>
                           <button className="px-10 py-4 bg-red-500 text-white text-[10px] font-black rounded-xl uppercase tracking-widest shadow-lg shadow-red-200">Re-assign Resources</button>
                        </div>
                     )}
                  </div>
               </div>

               {/* Footer Stats */}
               <div className="px-10 py-4 border-t border-slate-50 bg-slate-50/50 flex items-center justify-between text-slate-300">
                  <div className="flex gap-6">
                     <span className="text-[9px] font-black uppercase tracking-widest">Antwerp Terminal • Active</span>
                     <span className="text-[9px] font-black uppercase tracking-widest">Shift 1 • 06:00 - 14:00</span>
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-widest">Sys Health: Optimal</span>
               </div>
            </div>
         </div>
      </div>
   );
}
