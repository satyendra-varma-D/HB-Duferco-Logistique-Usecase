import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, MapPin, Navigation, Truck, 
  Clock, Fuel, Thermometer, ShieldCheck,
  ChevronRight, ArrowRight, Signal, Settings
} from 'lucide-react';

const activeTrips = [
  { 
    id: 'TRP-BE-1045', 
    vehicle: '1-ABC-234', 
    driver: 'Jean Dupont',
    origin: 'Antwerp Port Terminal',
    destination: 'ArcelorMittal Gent',
    status: 'IN_TRANSIT', 
    eta: '14:30', 
    progress: 65,
    speed: '68 km/h',
    temp: '4°C',
    fuel: '72%'
  },
  { 
    id: 'TRP-BE-1046', 
    vehicle: '2-XYZ-789', 
    driver: 'Marc De Smet',
    origin: 'Zeebrugge Terminal',
    destination: 'TotalEnergies Brussels',
    status: 'IN_TRANSIT', 
    eta: '15:15', 
    progress: 45,
    speed: '54 km/h',
    temp: '5°C',
    fuel: '85%'
  },
  { 
    id: 'TRP-BE-1047', 
    vehicle: 'BE-TK-9087', 
    driver: 'Thomas Vermeulen',
    origin: 'Antwerp Port Terminal',
    destination: 'Industrial Distribution Centers',
    status: 'DELAYED', 
    eta: '16:00', 
    progress: 30,
    speed: '0 km/h',
    temp: '6°C',
    fuel: '40%'
  },
];

export function Tracking() {
  const [selectedTrip, setSelectedTrip] = useState(activeTrips[0]);

  // Simulated Map SVG Paths
  const mapPath = "M 50 250 L 150 150 L 300 200 L 450 100 L 600 150 L 750 50";
  
  return (
    <div className="flex flex-col h-[calc(100vh-120px)] space-y-6">
      <div className="flex items-center justify-between">
        <div>
           <h2 className="text-xl font-bold text-slate-900 tracking-tight">Real-Time Fleet Tracking</h2>
           <p className="text-xs font-medium text-slate-400 mt-0.5">Live GPS monitoring and vehicle telemetry</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-600 rounded-lg border border-green-100">
           <Signal className="w-3.5 h-3.5 animate-pulse" />
           <span className="text-[10px] font-bold uppercase tracking-wider">All Systems Operational</span>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 overflow-hidden">
        {/* Left: Trip List */}
        <div className="flex flex-col gap-4 overflow-hidden">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search Trip ID / Vehicle..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-100 rounded-xl outline-none focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all text-xs font-medium"
            />
          </div>

          <div className="flex-1 bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden flex flex-col">
            <div className="px-5 py-4 border-b border-slate-50">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Active Units</h3>
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {activeTrips.map((trip) => (
                <button
                  key={trip.id}
                  onClick={() => setSelectedTrip(trip)}
                  className={`w-full text-left p-5 transition-all relative border-b border-slate-50 group ${
                    selectedTrip.id === trip.id ? 'bg-[#EEF4FF]' : 'hover:bg-slate-50'
                  }`}
                >
                  {selectedTrip.id === trip.id && (
                    <motion.div layoutId="active-trip" className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
                  )}
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-xs font-bold text-slate-900">{trip.id}</div>
                    <div className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase ${
                      trip.status === 'DELAYED' ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-500'
                    }`}>
                      {trip.status}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                      <Truck className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-900">{trip.vehicle}</div>
                      <div className="text-[9px] font-medium text-slate-400">{trip.driver}</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-bold">
                      <span className="text-slate-400">ETA: {trip.eta}</span>
                      <span className="text-primary">{trip.progress}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${trip.progress}%` }}
                        className="h-full bg-primary"
                      />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Detailed Map View */}
        <div className="lg:col-span-3 flex flex-col gap-6 overflow-hidden">
          <div className="flex-1 bg-white border border-slate-100 rounded-[32px] shadow-sm relative overflow-hidden group">
            {/* Map Simulation */}
            <div className="absolute inset-0 bg-[#F1F5F9] overflow-hidden">
              {/* Grid Lines */}
              <div className="absolute inset-0" style={{ 
                backgroundImage: 'radial-gradient(circle, #CBD5E1 1px, transparent 1px)', 
                backgroundSize: '40px 40px' 
              }} />
              
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 400">
                {/* Main Route Path */}
                <path
                  d={mapPath}
                  fill="none"
                  stroke="#E2E8F0"
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                
                {/* Completed Path */}
                <motion.path
                  d={mapPath}
                  fill="none"
                  stroke="#0066FF"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: selectedTrip.progress / 100 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />

                {/* Animated Truck Marker */}
                <motion.g
                  initial={{ offsetDistance: "0%" }}
                  animate={{ offsetDistance: `${selectedTrip.progress}%` }}
                  style={{ 
                    offsetPath: `path("${mapPath}")`,
                    offsetRotate: "auto 180deg"
                  }}
                >
                  <circle r="12" fill="#0066FF" stroke="white" strokeWidth="3" />
                  <Truck className="w-3 h-3 text-white -translate-x-1.5 -translate-y-1.5" />
                  <motion.circle
                    r="20"
                    fill="#0066FF"
                    initial={{ opacity: 0.3, scale: 0.8 }}
                    animate={{ opacity: 0, scale: 2 }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.g>

                {/* Start & End Points */}
                <g transform="translate(50, 250)">
                  <circle r="6" fill="#10B981" stroke="white" strokeWidth="2" />
                </g>
                <g transform="translate(750, 50)">
                  <circle r="6" fill="#EF4444" stroke="white" strokeWidth="2" />
                </g>
              </svg>
            </div>

            {/* Overlays */}
            {/* Header Overlay */}
            <div className="absolute top-6 left-6 right-6 flex items-center justify-between pointer-events-none">
              <div className="flex gap-4">
                <div className="bg-white/90 backdrop-blur-md px-5 py-3 rounded-2xl shadow-xl border border-white/50 pointer-events-auto">
                   <div className="text-[9px] font-bold text-slate-400 uppercase mb-1">Origin</div>
                   <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
                     <MapPin className="w-3.5 h-3.5 text-green-500" />
                     {selectedTrip.origin}
                   </div>
                </div>
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/90 backdrop-blur-md shadow-xl border border-white/50">
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </div>
                <div className="bg-white/90 backdrop-blur-md px-5 py-3 rounded-2xl shadow-xl border border-white/50 pointer-events-auto">
                   <div className="text-[9px] font-bold text-slate-400 uppercase mb-1">Destination</div>
                   <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
                     <MapPin className="w-3.5 h-3.5 text-red-500" />
                     {selectedTrip.destination}
                   </div>
                </div>
              </div>
              <div className="bg-slate-900 px-4 py-2 rounded-xl shadow-2xl flex items-center gap-3 pointer-events-auto text-white">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Live View</span>
              </div>
            </div>

            {/* Bottom Overlay: Telemetry */}
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between pointer-events-none">
              <div className="bg-white/90 backdrop-blur-md p-6 rounded-[24px] shadow-2xl border border-white/50 pointer-events-auto max-w-sm w-full">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
                      <Truck className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">{selectedTrip.vehicle}</div>
                      <div className="text-[10px] font-medium text-slate-400">Driver: {selectedTrip.driver}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-black text-slate-900">{selectedTrip.speed}</div>
                    <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Current Speed</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 py-4 border-t border-slate-100">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <Fuel className="w-3.5 h-3.5" />
                      <span className="text-[9px] font-bold uppercase tracking-wider">Fuel</span>
                    </div>
                    <div className="text-xs font-bold text-slate-900">{selectedTrip.fuel}</div>
                  </div>
                  <div className="space-y-1 border-l border-slate-50 pl-4">
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <Thermometer className="w-3.5 h-3.5" />
                      <span className="text-[9px] font-bold uppercase tracking-wider">Temp</span>
                    </div>
                    <div className="text-xs font-bold text-slate-900">{selectedTrip.temp}</div>
                  </div>
                  <div className="space-y-1 border-l border-slate-50 pl-4">
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <Clock className="w-3.5 h-3.5" />
                      <span className="text-[9px] font-bold uppercase tracking-wider">ETA</span>
                    </div>
                    <div className="text-xs font-bold text-primary">{selectedTrip.eta}</div>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-3 px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-100">
                   <ShieldCheck className="w-4 h-4 text-green-500" />
                   <span className="text-[10px] font-bold text-slate-600">Secure & Protected Route</span>
                </div>
              </div>

              <div className="flex flex-col gap-3 pointer-events-auto">
                 {[Navigation, ShieldCheck, Settings].map((Icon, i) => (
                    <button key={i} className="w-12 h-12 rounded-2xl bg-white shadow-xl flex items-center justify-center text-slate-400 hover:text-primary transition-all hover:-translate-x-1">
                       <Icon className="w-5 h-5" />
                    </button>
                 ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
