import { useState } from 'react';
import { Link } from 'react-router';
import { Check, X, Clock, Truck, Calendar, MapPin, Package, ArrowRight, CheckCircle2 } from 'lucide-react';

const pendingTrips = [
  { id: 'ORD-BE-1001', customer: 'ArcelorMittal Gent', product: 'Steel Coils', quantity: '25 MT', pickup: 'Antwerp Port Terminal', delivery: 'ABC Depot', date: '2026-04-24' },
  { id: 'ORD-BE-1002', customer: 'TotalEnergies Brussels', product: 'Steel Bars', quantity: '18 MT', pickup: 'Ghent Terminal', delivery: 'XYZ Warehouse', date: '2026-04-24' },
  { id: 'ORD-BE-1003', customer: 'Industrial Distribution Centers', product: 'Steel Plates', quantity: '30 MT', pickup: 'Antwerp Port Terminal', delivery: 'Global Station', date: '2026-04-25' },
];

const myTrips = [
  { id: 'TRP-BE-1045', status: 'IN_TERMINAL', stage: 'Loading', customer: 'ArcelorMittal Gent', product: 'Steel Coils', quantity: '25 MT' },
  { id: 'ORD-BE-1001', status: 'IN_TRANSIT', stage: 'En Route', customer: 'ArcelorMittal Gent', truck: '1-ABC-234', currentLocation: 'Antwerp Port Exit' },
  { id: 'TRP-BE-1042', status: 'DELIVERED', stage: 'Delivered', customer: 'TotalEnergies Brussels', product: 'Steel Bars', quantity: '18 MT' },
  { id: 'TRP-BE-1040', status: 'ASSIGNED', stage: 'Waiting', customer: 'ExxonMobil Antwerp Refinery', product: 'Steel Plates', quantity: '30 MT' },
];

const routeCheckpoints = [
  'Antwerp Port Exit',
  'E313 Highway - Milestone 45',
  'Antwerp Ring Road',
  'E17 Highway - Milestone 10',
  'Ghent North Gate',
  'Arrived at ArcelorMittal Gent'
];

export function TransporterView() {
  const [acceptingTripId, setAcceptingTripId] = useState<string | null>(null);
  const [updatingTripId, setUpdatingTripId] = useState<string | null>(null);
  const [selectedCheckpoint, setSelectedCheckpoint] = useState('');
  const [formData, setFormData] = useState({ truck: '', date: '', time: '' });

  const handleAccept = (tripId: string) => {
    setAcceptingTripId(tripId);
  };

  const handleReject = (tripId: string) => {
    alert(`Trip ${tripId} rejected!`);
  };

  const handleConfirmAccept = (tripId: string) => {
    alert(`Trip ${tripId} confirmed with Truck ${formData.truck} for ${formData.date} at ${formData.time}`);
    setAcceptingTripId(null);
    setFormData({ truck: '', date: '', time: '' });
  };

  const handleUpdateLocation = (tripId: string) => {
    alert(`Location for ${tripId} updated to: ${selectedCheckpoint}`);
    setUpdatingTripId(null);
    setSelectedCheckpoint('');
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-10 bg-[#F9FBFC] min-h-screen relative">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Transporter Portal</h1>
          <div className="flex items-center gap-2 mt-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Swift Transport • Active Session</span>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="px-6 py-3 bg-white rounded-2xl border border-slate-100 shadow-sm text-center">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Efficiency</p>
            <p className="text-lg font-black text-[#0047AB]">98.2%</p>
          </div>
          <div className="px-6 py-3 bg-white rounded-2xl border border-slate-100 shadow-sm text-center">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Fleet</p>
            <p className="text-lg font-black text-[#0047AB]">14/15</p>
          </div>
        </div>
      </div>

      {/* Pending Assignments */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-black text-slate-900 uppercase tracking-widest flex items-center gap-3">
            Pending Assignments
            <span className="px-3 py-1 bg-blue-50 text-[#0047AB] text-xs rounded-lg">{pendingTrips.length}</span>
          </h3>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          {pendingTrips.map((trip) => (
            <div key={trip.id} className="bg-white rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-100/50 transition-all overflow-hidden">
              <div className="p-8">
                <div className="flex items-start justify-between mb-8">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-[#0047AB]">
                      <Package className="w-8 h-8" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <h4 className="text-xl font-black text-slate-900">{trip.id}</h4>
                        <span className="px-3 py-1 bg-[#F59E0B]/10 text-[#F59E0B] text-[10px] font-black uppercase tracking-widest rounded-lg border border-[#F59E0B]/20">Pending Action</span>
                      </div>
                      <p className="text-sm font-bold text-slate-400 mt-1 uppercase tracking-widest">{trip.customer}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Scheduled For</p>
                    <p className="text-sm font-black text-slate-900 mt-1">{trip.date}</p>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-8 mb-8 pb-8 border-b border-slate-50">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Product</p>
                    <p className="text-sm font-bold text-slate-900">{trip.product}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Quantity</p>
                    <p className="text-sm font-bold text-slate-900">{trip.quantity}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pickup</p>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-blue-500" />
                      <p className="text-sm font-bold text-slate-900">{trip.pickup}</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Delivery</p>
                    <div className="flex items-center gap-2">
                      <ArrowRight className="w-3.5 h-3.5 text-orange-500" />
                      <p className="text-sm font-bold text-slate-900">{trip.delivery}</p>
                    </div>
                  </div>
                </div>

                {acceptingTripId === trip.id ? (
                  <div className="bg-slate-50/50 rounded-3xl p-6 border border-slate-100 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="flex items-center gap-6 mb-6">
                       <div className="w-10 h-10 bg-[#0047AB] rounded-xl flex items-center justify-center text-white">
                          <Truck className="w-5 h-5" />
                       </div>
                       <h5 className="text-sm font-black text-slate-900 uppercase tracking-widest">Trip Assignment Details</h5>
                    </div>
                    <div className="grid grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Truck Number</label>
                        <input 
                          type="text" 
                          placeholder="e.g. 1-ABC-123"
                          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-[#0047AB]/5 outline-none transition-all text-sm font-bold"
                          value={formData.truck}
                          onChange={(e) => setFormData({...formData, truck: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pickup Date</label>
                        <input 
                          type="date" 
                          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-[#0047AB]/5 outline-none transition-all text-sm font-bold"
                          value={formData.date}
                          onChange={(e) => setFormData({...formData, date: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pickup Time</label>
                        <input 
                          type="time" 
                          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-[#0047AB]/5 outline-none transition-all text-sm font-bold"
                          value={formData.time}
                          onChange={(e) => setFormData({...formData, time: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="flex gap-4 mt-8">
                      <button
                        onClick={() => handleConfirmAccept(trip.id)}
                        disabled={!formData.truck || !formData.date || !formData.time}
                        className="flex-1 flex items-center justify-center gap-3 px-8 py-4 bg-[#0047AB] text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all disabled:opacity-50 disabled:shadow-none"
                      >
                        <CheckCircle2 className="w-5 h-5" />
                        Confirm & Schedule
                      </button>
                      <button
                        onClick={() => setAcceptingTripId(null)}
                        className="px-8 py-4 bg-white border border-slate-200 text-slate-400 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handleAccept(trip.id)}
                        className="flex items-center gap-3 px-8 py-4 bg-[#0047AB] text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all"
                      >
                        <Check className="w-5 h-5" />
                        Accept Assignment
                      </button>
                      <button
                        onClick={() => handleReject(trip.id)}
                        className="flex items-center gap-3 px-8 py-4 bg-white border border-slate-200 text-red-500 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-red-50 hover:border-red-100 transition-all"
                      >
                        <X className="w-5 h-5" />
                        Reject
                      </button>
                    </div>
                    <button className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-[#0047AB] transition-colors">
                       View Complete Dossier
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fleet Operations */}
      <div className="space-y-6 pb-20">
        <h3 className="text-lg font-black text-slate-900 uppercase tracking-widest">Fleet Operations</h3>
        <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-50">
                <th className="text-left px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Trip ID</th>
                <th className="text-left px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Customer</th>
                <th className="text-left px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Truck & Location</th>
                <th className="text-left px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Operational Stage</th>
                <th className="text-left px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
                <th className="text-right px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {myTrips.map((trip) => (
                <tr key={trip.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-6">
                    <span className="text-sm font-black text-slate-900 group-hover:text-[#0047AB] transition-colors cursor-pointer">{trip.id}</span>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-sm font-bold text-slate-900">{trip.customer}</p>
                  </td>
                  <td className="px-8 py-6">
                    {trip.truck ? (
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                           <Truck className="w-3.5 h-3.5 text-slate-400" />
                           <span className="text-xs font-black text-slate-900 uppercase">{trip.truck}</span>
                        </div>
                        <div className="flex items-center gap-2">
                           <MapPin className="w-3.5 h-3.5 text-blue-500" />
                           <span className="text-[10px] font-bold text-slate-400 uppercase">{trip.currentLocation || 'N/A'}</span>
                        </div>
                      </div>
                    ) : (
                      <span className="text-[10px] font-bold text-slate-300 italic uppercase">Not Dispatched</span>
                    )}
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${trip.status === 'IN_TRANSIT' ? 'bg-blue-500 animate-pulse' : 'bg-slate-300'}`} />
                      <p className="text-sm font-bold text-slate-500">{trip.stage}</p>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`inline-flex items-center px-4 py-1.5 rounded-xl text-[10px] font-black border uppercase tracking-widest ${
                      trip.status === 'DELIVERED' ? 'bg-green-50 text-green-600 border-green-100' :
                      trip.status === 'IN_TERMINAL' ? 'bg-blue-50 text-[#0047AB] border-blue-100' :
                      trip.status === 'IN_TRANSIT' ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-900/10' :
                      'bg-slate-50 text-slate-500 border-slate-100'
                    }`}>
                      {trip.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-3">
                      {trip.status === 'IN_TRANSIT' && (
                        <button 
                          onClick={() => setUpdatingTripId(trip.id)}
                          className="px-4 py-2 bg-white border border-blue-100 text-[#0047AB] text-[10px] font-black rounded-xl uppercase tracking-widest hover:bg-blue-50 transition-all flex items-center gap-2"
                        >
                           <MapPin className="w-3.5 h-3.5" />
                           Update Location
                        </button>
                      )}
                      <button className="p-2 hover:bg-blue-50 rounded-xl transition-colors text-slate-300 hover:text-[#0047AB]">
                         <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Location Update Side Panel */}
      {updatingTripId && (
        <div className="fixed inset-0 z-[100] overflow-hidden">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setUpdatingTripId(null)} />
          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
            <div className="w-screen max-w-md animate-in slide-in-from-right duration-500">
              <div className="h-full flex flex-col bg-white shadow-2xl border-l border-slate-100">
                <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight uppercase">Update Live Tracking</h3>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Trip ID: {updatingTripId}</p>
                  </div>
                  <button onClick={() => setUpdatingTripId(null)} className="p-2 text-slate-400 hover:text-slate-900">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="flex-1 p-8 space-y-8 overflow-y-auto">
                   <div className="bg-blue-50/50 p-6 rounded-3xl border border-blue-100 flex items-start gap-4">
                      <Clock className="w-5 h-5 text-[#0047AB] shrink-0 mt-1" />
                      <p className="text-xs font-bold text-[#0047AB] leading-relaxed italic">
                        Select the current checkpoint for this vehicle. This will immediately update the control center dashboard for the client.
                      </p>
                   </div>

                   <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Current Checkpoint</label>
                        <div className="relative group">
                           <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#0047AB] transition-colors" />
                           <select 
                             className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-[#0047AB] transition-all text-sm font-black text-slate-600 appearance-none"
                             value={selectedCheckpoint}
                             onChange={(e) => setSelectedCheckpoint(e.target.value)}
                           >
                             <option value="">Choose Location...</option>
                             {routeCheckpoints.map((cp) => (
                               <option key={cp} value={cp}>{cp}</option>
                             ))}
                           </select>
                           <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                              <ArrowRight className="w-4 h-4 text-slate-400 rotate-90" />
                           </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Status Update</label>
                         <div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl flex items-center gap-4">
                            <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                            <span className="text-xs font-black text-slate-900 uppercase tracking-wider">Vehicle is En-Route</span>
                         </div>
                      </div>
                   </div>
                </div>

                <div className="p-8 border-t border-slate-50 bg-slate-50/30">
                  <button 
                    onClick={() => handleUpdateLocation(updatingTripId)}
                    disabled={!selectedCheckpoint}
                    className="w-full py-5 bg-[#0047AB] text-white text-xs font-black rounded-3xl shadow-xl shadow-blue-900/10 hover:-translate-y-1 transition-all uppercase tracking-[0.2em] flex items-center justify-center gap-3 disabled:opacity-50 disabled:translate-y-0"
                  >
                    Broadcast Update
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
