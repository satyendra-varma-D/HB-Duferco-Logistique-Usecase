import { useState } from 'react';
import { Link } from 'react-router';
import { 
  ArrowLeft, Edit, Truck, Calendar, User, 
  Package, MapPin, Clock, ShieldCheck, Info,
  ExternalLink, FileText, CheckCircle2, QrCode, X, ChevronRight
} from 'lucide-react';

import { OrderDocumentsTab } from './OrderDocumentsTab';
import { useAuth } from '../../contexts/AuthContext';

interface OrderDetailProps {
  order: any;
  activeTab: 'SCHEDULE' | 'DOCUMENTS' | 'details' | 'schedule' | 'documents';
  setActiveTab: (tab: any) => void;
}

export function OrderDetail({ order, activeTab: initialTab, setActiveTab: setExternalTab }: OrderDetailProps) {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState(initialTab || 'details');
  const [isVerified, setIsVerified] = useState(false);
  const [showPassLink, setShowPassLink] = useState(false);

  const isAdmin = user?.role === 'ADMIN';

  if (!order) return null;

  const getStatusConfig = (status: string) => {
    const configs: Record<string, { label: string; color: string }> = {
      CREATED: { label: 'CREATED', color: 'bg-amber-50 text-amber-600 border-amber-100' },
      ASSIGNED: { label: 'ASSIGNED', color: 'bg-blue-50 text-blue-600 border-blue-100' },
      TRIP_SCHEDULED: { label: 'TRIP SCHEDULED', color: 'bg-indigo-50 text-indigo-600 border-indigo-100' },
      IN_TERMINAL: { label: 'IN TERMINAL', color: 'bg-purple-50 text-purple-600 border-purple-100' },
      LOADING: { label: 'LOADING', color: 'bg-orange-50 text-orange-600 border-orange-100' },
      LOADED: { label: 'LOADED', color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
      DISPATCHED: { label: 'DISPATCHED', color: 'bg-slate-900 text-white border-slate-900' },
      IN_TRANSIT: { label: 'IN TRANSIT', color: 'bg-blue-600 text-white border-blue-600' },
      DELIVERED: { label: 'DELIVERED', color: 'bg-green-50 text-green-600 border-green-100' },
      REJECTED: { label: 'REJECTED', color: 'bg-red-50 text-red-600 border-red-100' },
    };
    return configs[status] || { label: status, color: 'bg-slate-50 text-slate-500 border-slate-100' };
  };

  const statusConfig = getStatusConfig(order.status);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between p-8 border-b border-slate-50">
        <div>
          <div className="flex items-center gap-3">
             <h2 className="text-2xl font-black text-slate-900 tracking-tight">{order.id}</h2>
             <span className={`px-2 py-0.5 text-[10px] font-black rounded-lg border uppercase tracking-widest ${statusConfig.color}`}>
                {statusConfig.label}
             </span>
          </div>
          <p className="text-xs font-bold text-slate-400 mt-0.5">Order created on {order.date || '2026-04-24'}</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-5 py-2.5 bg-white border border-slate-100 text-slate-600 text-xs font-black rounded-xl hover:bg-slate-50 transition-all uppercase tracking-wider flex items-center gap-2">
             <FileText className="w-4 h-4" />
             Invoice
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-slate-100/50 rounded-2xl w-fit">
        <button 
          onClick={() => setActiveTab('details')}
          className={`px-6 py-2.5 text-xs font-black rounded-xl transition-all uppercase tracking-widest ${
            activeTab === 'details' ? 'bg-white text-primary shadow-sm' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          Order Details
        </button>
        <button 
          onClick={() => setActiveTab('schedule')}
          className={`px-6 py-2.5 text-xs font-black rounded-xl transition-all uppercase tracking-widest ${
            activeTab === 'schedule' ? 'bg-white text-primary shadow-sm' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          Schedule & Tracking
        </button>
        <button 
          onClick={() => setActiveTab('documents')}
          className={`px-6 py-2.5 text-xs font-black rounded-xl transition-all uppercase tracking-widest ${
            activeTab === 'documents' ? 'bg-white text-primary shadow-sm' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          Documents
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {activeTab === 'details' ? (
          <>
            <div className="lg:col-span-2 space-y-6">
              {/* Core Info */}
              <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
                <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2 tracking-tight">
                   <Info className="w-5 h-5 text-primary" />
                   General Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Customer</p>
                    <p className="text-sm font-black text-slate-900">{order.customerName}</p>
                    <p className="text-xs font-bold text-slate-500">{order.contactNumber}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Product & Volume</p>
                    <p className="text-sm font-black text-slate-900">{order.product}</p>
                    <p className="text-xs font-bold text-slate-500">{order.quantity}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Delivery Deadline</p>
                    <div className="flex items-center gap-2">
                       <Clock className="w-4 h-4 text-amber-500" />
                       <p className="text-sm font-black text-slate-900">{order.deliveryDeadline}</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Order Type</p>
                    <span className="inline-flex px-2 py-0.5 bg-indigo-50 text-indigo-500 text-[10px] font-black rounded-lg">
                       {order.type} GENERATED
                    </span>
                  </div>
                </div>
              </div>

              {/* Route Info */}
              <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                   <MapPin className="w-24 h-24" />
                </div>
                <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2 tracking-tight">
                   <Truck className="w-5 h-5 text-primary" />
                   Route & Logistics
                </h3>
                <div className="space-y-8 relative">
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                       <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                          <MapPin className="w-5 h-5" />
                       </div>
                       <div className="w-0.5 flex-1 bg-dashed border-l-2 border-slate-100 border-dashed my-2" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pickup From</p>
                      <p className="text-base font-black text-slate-900">{order.pickupLocation}</p>
                      <p className="text-xs font-bold text-slate-500 mt-1">Industrial Zone, North Sector</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 border border-indigo-500/20">
                       <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Deliver To</p>
                      <p className="text-base font-black text-slate-900">{order.deliveryLocation}</p>
                      <p className="text-xs font-bold text-slate-500 mt-1">ABC Logistics Depot, South District</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {/* Transporter Info */}
              <div className="bg-[#0047AB] p-8 rounded-[40px] text-white relative overflow-hidden shadow-xl shadow-blue-900/20 group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl transition-all duration-500" />
                <h3 className="text-sm font-black uppercase tracking-widest mb-6 opacity-70">Assigned Transporter</h3>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/20">
                     <User className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="text-lg font-black tracking-tight">{order.assignedTransporterName}</div>
                    <div className="text-xs font-bold text-white/60 uppercase tracking-widest">ID: {order.assignedTransporterId}</div>
                  </div>
                </div>
                <button className="w-full py-3.5 bg-white text-[#0047AB] text-[10px] font-black rounded-2xl uppercase tracking-widest hover:bg-slate-50 transition-all">
                  Contact Transporter
                </button>
              </div>

              {/* Status & Timeline */}
              <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
                 <h3 className="text-base font-black text-slate-900 mb-6 tracking-tight">Timeline Progress</h3>
                 <div className="space-y-6">
                    <div className="flex gap-4 items-start">
                       <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white shrink-0 mt-1 shadow-lg shadow-green-200">
                          <CheckCircle2 className="w-4 h-4" />
                       </div>
                       <div>
                          <p className="text-xs font-black text-slate-900">Order Raised</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase">23 Apr, 08:30</p>
                       </div>
                    </div>
                    <div className="flex gap-4 items-start">
                       <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white shrink-0 mt-1 shadow-lg shadow-green-200">
                          <CheckCircle2 className="w-4 h-4" />
                       </div>
                       <div>
                          <p className="text-xs font-black text-slate-900">Transporter Assigned</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase">23 Apr, 09:15</p>
                       </div>
                    </div>
                    <div className="flex gap-4 items-start">
                       <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white shrink-0 mt-1 shadow-lg shadow-primary/20">
                          <Clock className="w-4 h-4" />
                       </div>
                       <div>
                          <p className="text-xs font-black text-slate-900">Awaiting Acceptance</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase">Current Stage</p>
                       </div>
                    </div>
                 </div>
              </div>
            </div>
          </>
        ) : activeTab === 'schedule' ? (
          /* Schedule Tab Content */
          <div className="lg:col-span-3">
             <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm relative overflow-hidden">
                <div className="w-full">
                   <div className="flex items-center gap-4 mb-10">
                      <div className="w-16 h-16 rounded-[24px] bg-indigo-50 flex items-center justify-center text-indigo-500 border border-indigo-100 shadow-inner">
                         <Calendar className="w-8 h-8" />
                      </div>
                      <div>
                         <h3 className="text-2xl font-black text-slate-900 tracking-tight">Schedule & Tracking Info</h3>
                         <p className="text-sm font-bold text-slate-400">Manage trip status and view route progress</p>
                      </div>
                   </div>

                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                     {/* Left Column: Schedule Details */}
                     <div className="space-y-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                           <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 group hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all">
                              <div className="flex items-center gap-4 mb-4">
                                 <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-400 shadow-sm border border-slate-100 group-hover:text-primary transition-colors">
                                    <Truck className="w-5 h-5" />
                                 </div>
                                 <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Truck Number</p>
                                    <p className={`text-base font-black ${['CREATED', 'ASSIGNED'].includes(order.status) ? 'text-slate-300 italic' : 'text-slate-900'}`}>
                                       {['CREATED', 'ASSIGNED'].includes(order.status) ? 'Waiting for Logistics provider Response' : order.truckNumber}
                                    </p>
                                 </div>
                              </div>
                              {order.truckNumber && !['CREATED', 'ASSIGNED'].includes(order.status) && (
                                <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-green-50 text-green-600 text-[9px] font-black rounded-lg uppercase tracking-wider">
                                   <ShieldCheck className="w-3 h-3" />
                                   Verified
                                </div>
                              )}
                           </div>

                           <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 group hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all">
                              <div className="flex items-center gap-4 mb-4">
                                 <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-400 shadow-sm border border-slate-100 group-hover:text-primary transition-colors">
                                    <User className="w-5 h-5" />
                                 </div>
                                 <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Assigned Driver</p>
                                    <p className={`text-base font-black ${['CREATED', 'ASSIGNED'].includes(order.status) ? 'text-slate-300 italic' : 'text-slate-900'}`}>
                                       {['CREATED', 'ASSIGNED'].includes(order.status) ? 'Waiting for Logistics provider Response' : order.driverName}
                                    </p>
                                 </div>
                              </div>
                              {order.driverName && !['CREATED', 'ASSIGNED'].includes(order.status) && (
                                <button className="text-[9px] font-black text-primary uppercase tracking-widest flex items-center gap-1 hover:underline">
                                   <ExternalLink className="w-3 h-3" />
                                   License Docs
                                </button>
                              )}
                           </div>

                           <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 group hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all">
                              <div className="flex items-center gap-4 mb-4">
                                 <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-400 shadow-sm border border-slate-100 group-hover:text-primary transition-colors">
                                    <Clock className="w-5 h-5" />
                                 </div>
                                 <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Scheduled Time Slot</p>
                                    <p className={`text-base font-black ${['CREATED', 'ASSIGNED'].includes(order.status) ? 'text-slate-300 italic' : 'text-slate-900'}`}>
                                       {['CREATED', 'ASSIGNED'].includes(order.status) ? 'Waiting for Logistics provider Response' : order.pickupTimeSlot}
                                    </p>
                                 </div>
                              </div>
                              {order.pickupTimeSlot && !['CREATED', 'ASSIGNED'].includes(order.status) && (
                                <p className="text-[10px] font-bold text-slate-400 italic">Expected at Bay 3</p>
                              )}
                           </div>

                           <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 group hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all">
                              <div className="flex items-center gap-4 mb-4">
                                 <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-400 shadow-sm border border-slate-100 group-hover:text-primary transition-colors">
                                    <Package className="w-5 h-5" />
                                 </div>
                                 <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Scheduled Quantity</p>
                                    <p className={`text-base font-black ${['CREATED', 'ASSIGNED'].includes(order.status) ? 'text-slate-300 italic' : 'text-slate-900'}`}>
                                       {['CREATED', 'ASSIGNED'].includes(order.status) ? 'Waiting for Logistics provider Response' : order.pickupQuantity}
                                    </p>
                                 </div>
                              </div>
                              {order.pickupQuantity && !['CREATED', 'ASSIGNED'].includes(order.status) && (
                                <p className="text-[10px] font-bold text-slate-400 italic">Capacity: 25 MT</p>
                              )}
                           </div>
                        </div>
                     </div>

                     {/* Right Column: Live Tracking & Visualization */}
                     <div className="space-y-6">
                        {user?.role === 'TRANSPORTER' ? (
                          <div className="p-8 bg-slate-900 rounded-[40px] text-white shadow-2xl relative overflow-hidden group border border-slate-800">
                             <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full -mr-32 -mt-32 blur-3xl animate-pulse" />
                             <div className="relative z-10">
                                <div className="flex items-center justify-between mb-8">
                                   <div className="flex items-center gap-3">
                                      <div className="p-2.5 bg-blue-600 rounded-2xl shadow-lg shadow-blue-600/20">
                                         <MapPin className="w-5 h-5 text-white" />
                                      </div>
                                      <h4 className="text-sm font-black uppercase tracking-[0.2em]">Live Tracking</h4>
                                   </div>
                                   <div className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-[9px] font-black text-blue-400 uppercase tracking-widest animate-pulse">
                                      Active Broadcast
                                   </div>
                                </div>

                                <div className="space-y-6">
                                   <div className="space-y-2.5">
                                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Select Checkpoint</label>
                                      <div className="relative">
                                         <select 
                                            className="w-full h-14 pl-5 pr-12 bg-slate-800 border border-slate-700 rounded-2xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-sm font-bold text-white appearance-none cursor-pointer"
                                            defaultValue="Antwerp Port Exit"
                                         >
                                            <option className="bg-slate-900">Antwerp Port Exit</option>
                                            <option className="bg-slate-900">E313 Highway - Milestone 45</option>
                                            <option className="bg-slate-900">Ghent Interchange</option>
                                            <option className="bg-slate-900">Final Destination Approach</option>
                                         </select>
                                         <ChevronRight className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none rotate-90" />
                                      </div>
                                   </div>

                                   <div className="pt-4 space-y-4">
                                      <div className="flex justify-between items-end mb-2">
                                         <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Route Progress</p>
                                         <p className="text-xs font-black text-blue-400">45% Complete</p>
                                      </div>
                                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700 p-0.5">
                                         <div className="h-full w-[45%] bg-gradient-to-r from-blue-600 to-blue-400 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.5)]" />
                                      </div>
                                      <div className="flex justify-between text-[9px] font-black text-slate-600 uppercase tracking-tighter">
                                         <span>Antwerp Terminal</span>
                                         <span>Destination</span>
                                      </div>
                                   </div>

                                   <button 
                                      className="w-full h-14 bg-blue-600 text-white text-[11px] font-black rounded-2xl uppercase tracking-widest hover:bg-blue-500 transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-3 active:scale-95"
                                      onClick={() => alert('Tracking status broadcasted!')}
                                   >
                                      <Truck className="w-4 h-4" />
                                      Broadcast Update
                                   </button>
                                </div>
                             </div>
                          </div>
                        ) : (
                          <div className="p-8 bg-white rounded-[40px] border border-slate-100 shadow-sm h-full relative overflow-hidden">
                             <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-20" />
                             <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-6">
                                <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center text-primary mb-6 shadow-inner">
                                   <MapPin className="w-10 h-10" />
                                </div>
                                <h4 className="text-lg font-black text-slate-900 mb-2">Live Route Visualization</h4>
                                <p className="text-xs font-medium text-slate-400 max-w-[200px]">
                                   Tracking is currently active. Transporter is broadcasting from route checkpoints.
                                </p>
                             </div>
                          </div>
                        )}
                     </div>
                   </div>

                    {order.status === 'TRIP_SCHEDULED' && isAdmin && (
                       <div className="mt-16 pt-10 border-t border-slate-50 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                             <div className="w-10 h-10 rounded-full bg-blue-50 text-primary flex items-center justify-center">
                                <Info className="w-5 h-5" />
                             </div>
                             <p className="text-xs font-bold text-slate-500 max-w-sm">
                                This information is synchronized with the **Gate Control** and **Checkpost Manager** for seamless arrival verification.
                             </p>
                          </div>
                          {!isVerified ? (
                             <button 
                               onClick={() => {
                                 setIsVerified(true);
                                 setShowPassLink(true);
                               }}
                               className="px-8 py-4 bg-primary text-white text-xs font-black rounded-2xl shadow-xl shadow-primary/20 hover:shadow-xl hover:-translate-y-1 transition-all uppercase tracking-widest"
                             >
                               Generate the Link
                             </button>
                          ) : (
                             <div className="flex items-center gap-4">
                                <div className="flex flex-col items-end">
                                   <p className="text-[10px] font-black text-green-500 uppercase tracking-widest">Verification Complete</p>
                                   <p className="text-xs font-bold text-slate-400">Digital Pass Generated</p>
                                </div>
                                <Link 
                                   to={`/terminal-pass/${order.id}`}
                                   target="_blank"
                                   className="px-8 py-4 bg-green-500 text-white text-xs font-black rounded-2xl shadow-xl shadow-green-200 hover:shadow-2xl hover:-translate-y-1 transition-all uppercase tracking-widest flex items-center gap-2"
                                >
                                   <QrCode className="w-4 h-4" />
                                   View Access Pass
                                </Link>
                             </div>
                          )}
                       </div>
                    )}
                </div>
             </div>
          </div>
        ) : (
          /* Documents Tab Content */
          <div className="lg:col-span-3">
             <OrderDocumentsTab order={order} isVerified={isVerified} />
          </div>
        )}
      </div>

      {/* Success Modal */}
      {showPassLink && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="bg-white rounded-[40px] p-10 max-w-lg w-full shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-300">
              <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
                 <CheckCircle2 className="w-48 h-48" />
              </div>
              <button 
                onClick={() => setShowPassLink(false)}
                className="absolute top-6 right-6 p-2 text-slate-300 hover:text-slate-900 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex flex-col items-center text-center">
                 <div className="w-20 h-20 rounded-[30px] bg-green-50 flex items-center justify-center text-green-500 mb-6 border border-green-100 shadow-inner">
                    <CheckCircle2 className="w-10 h-10" />
                 </div>
                 <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-2">Slot Verified Successfully!</h3>
                 <p className="text-sm font-medium text-slate-400 mb-8">
                    The pickup schedule has been confirmed. A secure digital access pass is now available for the driver to enter the terminal.
                 </p>

                 <div className="w-full bg-slate-50 p-6 rounded-3xl border border-slate-100 mb-8 text-left">
                    <div className="flex justify-between items-center mb-4">
                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Shareable Pass URL</span>
                       <button 
                         onClick={() => {
                           navigator.clipboard.writeText(`${window.location.origin}/terminal-pass/${order.id}`);
                           alert('Link copied to clipboard!');
                         }}
                         className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline"
                       >
                         Copy Link
                       </button>
                    </div>
                    <div className="bg-white px-4 py-3 rounded-xl border border-slate-100 text-xs font-bold text-slate-600 break-all select-all">
                       {window.location.origin}/terminal-pass/{order.id}
                    </div>
                 </div>

                 <Link 
                    to={`/terminal-pass/${order.id}`}
                    target="_blank"
                    className="w-full py-4 bg-primary text-white text-sm font-black rounded-2xl shadow-xl shadow-primary/20 hover:shadow-xl hover:-translate-y-1 transition-all uppercase tracking-widest flex items-center justify-center gap-3"
                 >
                    <QrCode className="w-5 h-5" />
                    Open Access Pass
                 </Link>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
