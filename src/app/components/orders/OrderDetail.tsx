import { useState } from 'react';
import { Link, useParams } from 'react-router';
import { 
  ArrowLeft, Edit, Truck, Calendar, User, 
  Package, MapPin, Clock, ShieldCheck, Info,
  ExternalLink, FileText, CheckCircle2, QrCode, X
} from 'lucide-react';

import { OrderDocumentsTab } from './OrderDocumentsTab';

export function OrderDetail() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<'details' | 'schedule' | 'documents'>('details');
  const [isVerified, setIsVerified] = useState(false);
  const [showPassLink, setShowPassLink] = useState(false);

  // Mock order data (extended with schedule info)
  const order = {
    id: id || 'ORD-2401',
    customerName: 'ABC Logistics',
    contactNumber: '+1 234 567 8901',
    product: 'Diesel',
    quantity: '15,000 L',
    date: '2026-04-23 08:30',
    status: 'ACCEPTED',
    type: 'SYSTEM',
    pickupLocation: 'Terminal A, Bay 3',
    deliveryLocation: 'ABC Logistics Depot',
    deliveryDeadline: '2026-04-25 18:00',
    specialInstructions: 'Handle with care. Ensure proper sealing. Contact supervisor on arrival.',
    assignedTransporterName: 'Global Logistics Solutions',
    assignedTransporterId: 'T-101',
    // Scheduling Info from Transporter
    truckNumber: 'TN-45-AX-1234',
    driverName: 'Robert Fox',
    pickupTimeSlot: '2026-04-24 10:30 AM',
    pickupQuantity: '15,000 L'
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
        <div className="flex items-center gap-4">
          <Link to="/orders" className="p-3 bg-slate-50 hover:bg-slate-100 rounded-2xl transition-colors group">
            <ArrowLeft className="w-5 h-5 text-slate-500 group-hover:text-primary transition-colors" />
          </Link>
          <div>
            <div className="flex items-center gap-3">
               <h2 className="text-2xl font-black text-slate-900 tracking-tight">{order.id}</h2>
               <span className="px-2 py-0.5 bg-green-50 text-green-600 text-[10px] font-black rounded-lg border border-green-100 uppercase tracking-widest">
                  {order.status}
               </span>
            </div>
            <p className="text-xs font-bold text-slate-400 mt-0.5">Order created on {order.date}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-5 py-2.5 bg-white border border-slate-100 text-slate-600 text-xs font-black rounded-xl hover:bg-slate-50 transition-all uppercase tracking-wider flex items-center gap-2">
             <FileText className="w-4 h-4" />
             Invoice
          </button>
          <Link
            to={`/orders/${id}/edit`}
            className="px-5 py-2.5 bg-primary text-white text-xs font-black rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-0.5 transition-all uppercase tracking-wider flex items-center gap-2"
          >
            <Edit className="w-4 h-4" />
            Edit Order
          </Link>
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
          Pickup Schedule
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
                <div className="absolute top-0 right-0 p-10 opacity-[0.03]">
                   <Calendar className="w-64 h-64" />
                </div>
                
                <div className="max-w-4xl">
                   <div className="flex items-center gap-4 mb-10">
                      <div className="w-16 h-16 rounded-[24px] bg-indigo-50 flex items-center justify-center text-indigo-500 border border-indigo-100 shadow-inner">
                         <Calendar className="w-8 h-8" />
                      </div>
                      <div>
                         <h3 className="text-2xl font-black text-slate-900 tracking-tight">Pickup Schedule Info</h3>
                         <p className="text-sm font-bold text-slate-400">Details provided by {order.assignedTransporterName}</p>
                      </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      <div className="space-y-10">
                         <div className="flex items-start gap-5">
                            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100">
                               <Truck className="w-6 h-6" />
                            </div>
                            <div>
                               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Truck Number</p>
                               <p className="text-xl font-black text-slate-900">{order.truckNumber}</p>
                               <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-green-600 text-[10px] font-black rounded-lg uppercase tracking-wider">
                                  <ShieldCheck className="w-3.5 h-3.5" />
                                  Verified Vehicle
                               </div>
                            </div>
                         </div>

                         <div className="flex items-start gap-5">
                            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100">
                               <User className="w-6 h-6" />
                            </div>
                            <div>
                               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Assigned Driver</p>
                               <p className="text-xl font-black text-slate-900">{order.driverName}</p>
                               <button className="mt-2 text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-1 hover:underline">
                                  <ExternalLink className="w-3 h-3" />
                                  View License Documents
                               </button>
                            </div>
                         </div>
                      </div>

                      <div className="space-y-10">
                         <div className="flex items-start gap-5">
                            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100">
                               <Clock className="w-6 h-6" />
                            </div>
                            <div>
                               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Confirmed Time Slot</p>
                               <p className="text-xl font-black text-slate-900">{order.pickupTimeSlot}</p>
                               <p className="mt-2 text-xs font-bold text-slate-400 italic">Expected at Bay 3</p>
                            </div>
                         </div>

                         <div className="flex items-start gap-5">
                            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100">
                               <Package className="w-6 h-6" />
                            </div>
                            <div>
                               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Pickup Quantity</p>
                               <p className="text-xl font-black text-slate-900">{order.pickupQuantity}</p>
                               <p className="mt-2 text-xs font-bold text-slate-400 italic">Full tank capacity: 15,000 L</p>
                            </div>
                         </div>
                      </div>
                   </div>

                   <div className="mt-16 pt-10 border-t border-slate-50 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-full bg-blue-50 text-primary flex items-center justify-center">
                            <Info className="w-5 h-5" />
                         </div>
                         <p className="text-xs font-bold text-slate-500 max-w-sm">
                            This information is synchronized with the **Gate Control** and **Terminal Manager** for seamless arrival verification.
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
                           Verify & Confirm Slot
                         </button>
                      ) : (
                         <div className="flex items-center gap-4">
                            <div className="flex flex-col items-end">
                               <p className="text-[10px] font-black text-green-500 uppercase tracking-widest">Verification Complete</p>
                               <p className="text-xs font-bold text-slate-400">Digital Pass Generated</p>
                            </div>
                            <Link 
                               to={`/terminal-pass/${id}`}
                               target="_blank"
                               className="px-8 py-4 bg-green-500 text-white text-xs font-black rounded-2xl shadow-xl shadow-green-200 hover:shadow-2xl hover:-translate-y-1 transition-all uppercase tracking-widest flex items-center gap-2"
                            >
                               <QrCode className="w-4 h-4" />
                               View Access Pass
                            </Link>
                         </div>
                      )}
                   </div>
                </div>
             </div>
          </div>
        ) : (
          /* Documents Tab Content */
          <div className="lg:col-span-3">
            <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm min-h-[500px]">
               <div className="max-w-2xl">
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-8">Trip Documentation</h3>
                  <OrderDocumentsTab orderId={order.id} />
               </div>
            </div>
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
                           navigator.clipboard.writeText(`${window.location.origin}/terminal-pass/${id}`);
                           alert('Link copied to clipboard!');
                         }}
                         className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline"
                       >
                         Copy Link
                       </button>
                    </div>
                    <div className="bg-white px-4 py-3 rounded-xl border border-slate-100 text-xs font-bold text-slate-600 break-all select-all">
                       {window.location.origin}/terminal-pass/{id}
                    </div>
                 </div>

                 <Link 
                    to={`/terminal-pass/${id}`}
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
