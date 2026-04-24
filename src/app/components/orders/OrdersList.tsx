import { useState } from 'react';
import { 
  Plus, Search, Filter, MoreHorizontal, Edit, Trash2, 
  CheckCircle2, XCircle, UserPlus, Clock, ArrowRight,
  ShieldCheck, AlertCircle, Info, Tag, Truck, Package, Container, RotateCw,
  ArrowLeft
} from 'lucide-react';
import { OrderDetail } from './OrderDetail';
import { useAuth } from '../../contexts/AuthContext';

type OrderStatus = 
  | 'ORDER_PENDING' 
  | 'WAITING_FOR_APPROVAL' 
  | 'TRANSPORTER_ASSIGNED' 
  | 'ACCEPTED' 
  | 'YET_TO_COME' 
  | 'IN_TERMINAL' 
  | 'LOADED' 
  | 'EXITED'
  | 'COMPLETED' 
  | 'REJECTED';

interface Order {
  id: string;
  customerName: string;
  product: string;
  quantity: string;
  status: OrderStatus;
  type: 'SYSTEM' | 'MANUAL';
  date: string;
  pickupLocation: string;
  deliveryLocation: string;
  assignedTransporterId?: string;
  assignedTransporterName?: string;
  truckNumber?: string;
  driverName?: string;
  deliveryDeadline?: string;
  rejectionReason?: string;
  loadedQuantity?: string;
  loadingManagerName?: string;
}

const statusConfig: Record<OrderStatus, { label: string; color: string; icon: any }> = {
  ORDER_PENDING: { label: 'ORDER PENDING', color: 'bg-amber-50 text-amber-600 border-amber-100', icon: Clock },
  WAITING_FOR_APPROVAL: { label: 'WAITING FOR APPROVAL', color: 'bg-blue-50 text-blue-600 border-blue-100', icon: UserPlus },
  TRANSPORTER_ASSIGNED: { label: 'ASSIGNED', color: 'bg-indigo-50 text-indigo-600 border-indigo-100', icon: Truck },
  ACCEPTED: { label: 'TRIP SCHEDULED', color: 'bg-emerald-50 text-emerald-600 border-emerald-100', icon: CheckCircle2 },
  YET_TO_COME: { label: 'YET TO COME', color: 'bg-orange-50 text-orange-600 border-orange-100', icon: Info },
  IN_TERMINAL: { label: 'IN TERMINAL', color: 'bg-blue-600 text-white border-blue-600', icon: Container },
  LOADED: { label: 'LOADED', color: 'bg-green-100 text-green-700 border-green-200', icon: ShieldCheck },
  EXITED: { label: 'EXITED', color: 'bg-slate-900 text-white border-slate-900', icon: XCircle },
  COMPLETED: { label: 'COMPLETED', color: 'bg-green-50 text-green-600 border-green-100', icon: CheckCircle2 },
  REJECTED: { label: 'REJECTED', color: 'bg-red-50 text-red-600 border-red-100', icon: XCircle },
};

const initialOrders: Order[] = [
  { 
    id: 'ORD-2401', 
    customerName: 'ABC Logistics', 
    product: 'Diesel', 
    quantity: '15000 L', 
    status: 'WAITING_FOR_APPROVAL', 
    type: 'SYSTEM',
    date: '2026-04-24',
    pickupLocation: 'Terminal A, Bay 3',
    deliveryLocation: 'ABC Logistics Depot',
    assignedTransporterId: 'T-101',
    assignedTransporterName: 'Global Logistics Solutions'
  },
  { 
    id: 'ORD-2402', 
    customerName: 'XYZ Transport', 
    product: 'Petrol', 
    quantity: '12000 L', 
    status: 'COMPLETED', 
    type: 'MANUAL',
    date: '2026-04-23',
    pickupLocation: 'Terminal B, Bay 1',
    deliveryLocation: 'XYZ Main Station',
    assignedTransporterId: 'T-102',
    assignedTransporterName: 'Express Freight Co.',
    truckNumber: 'BE-12-G-9988',
    driverName: 'Arlene McCoy'
  },
  { 
    id: 'ORD-2403', 
    customerName: 'Global Freight', 
    product: 'Diesel', 
    quantity: '20000 L', 
    status: 'ORDER_PENDING', 
    type: 'SYSTEM',
    date: '2026-04-24',
    pickupLocation: 'Terminal A, Bay 2',
    deliveryLocation: 'Global Distribution Center'
  },
  { 
    id: 'ORD-2404', 
    customerName: 'Metro Cargo', 
    product: 'Kerosene', 
    quantity: '8000 L', 
    status: 'ORDER_PENDING', 
    type: 'MANUAL',
    date: '2026-04-24',
    pickupLocation: 'Terminal C, Bay 5',
    deliveryLocation: 'Metro Hub 4'
  },
  { 
    id: 'ORD-2405', 
    customerName: 'Quick Ship Ltd', 
    product: 'Diesel', 
    quantity: '18000 L', 
    status: 'REJECTED', 
    type: 'SYSTEM',
    date: '2026-04-24',
    pickupLocation: 'Terminal A, Bay 1',
    deliveryLocation: 'Quick Ship Warehouse',
    deliveryDeadline: '2026-04-25T14:00',
    assignedTransporterId: 'T-102',
    assignedTransporterName: 'Express Freight Co.',
    rejectionReason: 'Vehicle unavailable for the requested slot.'
  },
  { 
    id: 'ORD-2406', 
    customerName: 'Global Logistics', 
    product: 'Diesel', 
    quantity: '15000 L', 
    status: 'YET_TO_COME', 
    type: 'SYSTEM',
    date: '2026-04-24',
    pickupLocation: 'Terminal A, Bay 3',
    deliveryLocation: 'Main Depot',
    assignedTransporterName: 'Global Logistics Solutions',
    truckNumber: 'TN-45-AX-1234',
    driverName: 'Robert Fox'
  },
  { 
    id: 'ORD-2407', 
    customerName: 'Safe Fuel Co', 
    product: 'Petrol', 
    quantity: '20000 L', 
    status: 'LOADED', 
    type: 'MANUAL',
    date: '2026-04-24',
    pickupLocation: 'Terminal B, Bay 2',
    deliveryLocation: 'Station X',
    assignedTransporterName: 'Swift Transport',
    truckNumber: 'BE-88-ZZ-9999',
    driverName: 'John Smith',
    loadedQuantity: '20,005 L',
    loadingManagerName: 'Mike Johnson'
  },
];

interface Transporter {
  id: string;
  name: string;
}

const mockTransporters: Transporter[] = [
  { id: 'T-101', name: 'Global Logistics Solutions' },
  { id: 'T-102', name: 'Express Freight Co.' },
  { id: 'T-103', name: 'Swift Transport NV' },
];

export function OrdersList() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isSchedulePanelOpen, setIsSchedulePanelOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'schedule' | 'documents'>('details');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const isAdmin = user?.role === 'ADMIN';
  const isTransporter = user?.role === 'TRANSPORTER';
  const isLoadingManager = user?.role === 'LOADING_MANAGER';
  const isTerminalManager = user?.role === 'TERMINAL_MANAGER' || (user?.role as any) === 'CHECKPOST_MANAGER';

  const displayedOrders = orders.filter(order => {
    if (isAdmin || isLoadingManager || isTerminalManager) return true;
    if (isTransporter) return order.assignedTransporterId === 'T-101';
    return false;
  });

  const handleAssign = (transporter: Transporter) => {
    if (selectedOrder) {
      setOrders(prev => prev.map(o => o.id === selectedOrder.id ? { 
        ...o, 
        status: 'WAITING_FOR_APPROVAL',
        assignedTransporterId: transporter.id,
        assignedTransporterName: transporter.name
      } : o));
      setIsAssignModalOpen(false);
      setSelectedOrder(null);
    }
  };

  const handleReject = (orderId: string) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { 
      ...o, 
      status: 'REJECTED',
      rejectionReason: 'Rejected by Transporter'
    } : o));
  };

  const handleScheduleSubmit = (scheduleData: {
    truckNumber: string;
    driverName: string;
    pickupTimeSlot: string;
    pickupQuantity: string;
  }) => {
    if (selectedOrder) {
      setOrders(prev => prev.map(o => o.id === selectedOrder.id ? { 
        ...o, 
        status: 'ACCEPTED',
        ...scheduleData
      } : o));
      setIsSchedulePanelOpen(false);
      setSelectedOrder(null);
    }
  };

  const openOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setActiveTab('details');
  };

  if (selectedOrder && !isAssignModalOpen && !isSchedulePanelOpen) {
    return (
      <div className="animate-in fade-in slide-in-from-right-4 duration-500">
        <div className="mb-6 flex items-center gap-4">
           <button 
             onClick={() => setSelectedOrder(null)}
             className="p-3 bg-white border border-slate-100 rounded-2xl hover:bg-slate-50 text-slate-500 transition-all group"
           >
             <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
           </button>
           <div>
             <h2 className="text-2xl font-black text-slate-900 tracking-tight">Order Details</h2>
             <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">ID: {selectedOrder.id}</p>
           </div>
        </div>
        <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
          <OrderDetail 
            order={selectedOrder} 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
           <h2 className="text-2xl font-black text-slate-900 tracking-tight">Orders Management</h2>
           <p className="text-xs font-medium text-slate-400 mt-1">Manage delivery operations and partner coordination</p>
        </div>
        {isAdmin && (
          <button
            className="flex items-center gap-2 px-6 py-3 bg-[#0047AB] text-white text-sm font-bold rounded-2xl shadow-lg shadow-blue-900/20 hover:shadow-xl hover:-translate-y-0.5 transition-all"
          >
            <RotateCw className="w-5 h-5" />
            Sync Orders
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search Order ID or Customer..."
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all text-xs font-bold"
            />
          </div>
          <select className="px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all text-xs font-bold text-slate-600 appearance-none">
            <option>All Status</option>
            {Object.entries(statusConfig).map(([key, config]) => (
              <option key={key} value={key as OrderStatus}>{config.label}</option>
            ))}
          </select>
          <select className="px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all text-xs font-bold text-slate-600 appearance-none">
            <option>Order Type</option>
            <option value="SYSTEM">System Generated</option>
            <option value="MANUAL">Manual Creation</option>
          </select>
          <button className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-slate-50 text-slate-500 font-bold rounded-2xl hover:bg-slate-50 transition-all text-xs">
            <Filter className="w-4 h-4" />
            Advanced Filters
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white border border-slate-100 rounded-[32px] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-400 text-[10px] font-black uppercase tracking-widest border-b border-slate-50">
                <th className="px-8 py-5">Order Details</th>
                <th className="px-8 py-5">Route</th>
                <th className="px-8 py-5">Quantity</th>
                <th className="px-8 py-5">Transporter</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {displayedOrders.map((order) => {
                const config = statusConfig[order.status];
                const StatusIcon = config.icon;
                
                return (
                  <tr 
                    key={order.id} 
                    onClick={() => openOrderDetails(order)}
                    className="group hover:bg-slate-50/50 transition-all cursor-pointer"
                  >
                    <td className="px-8 py-4">
                      <div>
                        <div className="text-sm font-black text-slate-900">{order.id}</div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[11px] font-bold text-slate-500">{order.customerName}</span>
                          <span className={`px-1.5 py-0.5 rounded text-[8px] font-black tracking-widest ${
                            order.type === 'SYSTEM' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'
                          }`}>
                            {order.type}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-4">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                          <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                          {order.pickupLocation}
                        </div>
                        <div className="flex items-center gap-2 text-xs font-black text-[#0047AB]">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#0047AB]" />
                          {order.deliveryLocation}
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-4">
                      <div className="text-sm font-black text-slate-900">{order.quantity}</div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">{order.product}</div>
                    </td>
                    <td className="px-8 py-4">
                      {order.assignedTransporterName ? (
                        <div>
                          <div className="text-xs font-black text-slate-900">{order.assignedTransporterName}</div>
                          {order.truckNumber && (
                            <div className="text-[10px] font-bold text-slate-400 mt-0.5 uppercase tracking-widest">
                              {order.truckNumber}
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="text-[10px] font-bold text-slate-300 italic uppercase tracking-widest">Unassigned</span>
                      )}
                    </td>
                    <td className="px-8 py-4">
                      <div className="space-y-1.5">
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${config.color}`}>
                          <StatusIcon className="w-3 h-3" />
                          {config.label}
                        </div>
                        {order.status === 'REJECTED' && (
                          <div className="flex flex-col gap-0.5">
                             <div className="flex items-center gap-1.5 text-red-500">
                                <XCircle className="w-3.5 h-3.5" />
                                <span className="text-[9px] font-black uppercase tracking-widest">Rejected</span>
                             </div>
                             <p className="text-[10px] font-bold text-slate-400 italic leading-tight ml-5 line-clamp-1">"{order.rejectionReason}"</p>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-4 text-right">
                      <div className="flex items-center justify-end gap-3" onClick={(e) => e.stopPropagation()}>
                        {isAdmin && order.status === 'ORDER_PENDING' && (
                          <button
                            onClick={() => { setSelectedOrder(order); setIsAssignModalOpen(true); }}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0047AB] text-white text-[9px] font-black rounded-lg uppercase tracking-widest shadow-md shadow-blue-900/10 hover:shadow-lg transition-all"
                          >
                            <UserPlus className="w-3 h-3" />
                            Assign
                          </button>
                        )}
                        {isAdmin && order.status === 'REJECTED' && (
                          <button
                            onClick={() => { setSelectedOrder(order); setIsAssignModalOpen(true); }}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0047AB] text-white text-[9px] font-black rounded-lg uppercase tracking-widest shadow-md shadow-blue-900/10 hover:shadow-lg transition-all"
                          >
                            <UserPlus className="w-3 h-3" />
                            Reassign
                          </button>
                        )}
                        {isTransporter && order.status === 'WAITING_FOR_APPROVAL' && (
                          <div className="flex items-center gap-2">
                             <button
                               onClick={() => { setSelectedOrder(order); setIsSchedulePanelOpen(true); }}
                               className="px-3 py-1.5 bg-green-500 text-white text-[9px] font-black rounded-lg uppercase tracking-widest shadow-md shadow-green-900/10 hover:shadow-lg transition-all"
                             >
                               Approve
                             </button>
                             <button
                               onClick={() => handleReject(order.id)}
                               className="px-3 py-1.5 bg-white border border-red-100 text-red-500 text-[9px] font-black rounded-lg uppercase tracking-widest hover:bg-red-50 transition-all"
                             >
                               Reject
                             </button>
                          </div>
                        )}
                        <button 
                          className="p-2 text-slate-400 hover:text-primary transition-colors"
                        >
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Assign Transporter Modal */}
      {isAssignModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-[40px] w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between">
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Assign Transporter</h3>
              <button onClick={() => setIsAssignModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            <div className="p-8 space-y-4">
              {mockTransporters.map((t) => (
                <button
                  key={t.id}
                  onClick={() => handleAssign(t)}
                  className="w-full flex items-center justify-between p-6 bg-slate-50 border border-slate-100 rounded-3xl hover:border-primary hover:bg-white transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
                      <Truck className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-black text-slate-900">{t.name}</div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.id}</div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-primary transition-all" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Transporter Approval / Schedule Modal (keeping as modal for focused interaction) */}
      {isSchedulePanelOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-[40px] w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between">
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Approve & Schedule</h3>
              <button onClick={() => setIsSchedulePanelOpen(false)} className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            <div className="p-8 space-y-8">
               <div className="bg-blue-50/50 p-6 rounded-3xl border border-blue-100 flex items-start gap-4">
                  <Info className="w-5 h-5 text-blue-500 shrink-0 mt-1" />
                  <p className="text-xs font-bold text-blue-700 leading-relaxed italic">
                    Provide truck and driver details to generate the gate pass.
                  </p>
               </div>

               <div className="space-y-6">
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Truck Number Plate</label>
                     <input 
                        type="text" 
                        placeholder="E.G. BE-12-ABC-34"
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-primary transition-all text-sm font-black"
                        id="sched-truck"
                     />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Driver Name</label>
                     <input 
                        type="text" 
                        placeholder="ENTER FULL NAME"
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-primary transition-all text-sm font-black"
                        id="sched-driver"
                     />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Pickup Time Slot</label>
                     <input 
                        type="datetime-local" 
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-primary transition-all text-sm font-black"
                        id="sched-time"
                     />
                  </div>
               </div>

               <button 
                  onClick={() => {
                    const truck = (document.getElementById('sched-truck') as HTMLInputElement).value;
                    const driver = (document.getElementById('sched-driver') as HTMLInputElement).value;
                    const time = (document.getElementById('sched-time') as HTMLInputElement).value;
                    if (truck && driver) {
                       handleScheduleSubmit({
                          truckNumber: truck,
                          driverName: driver,
                          pickupTimeSlot: time,
                          pickupQuantity: selectedOrder?.quantity || '0 L'
                       });
                    }
                  }}
                  className="w-full py-5 bg-[#0047AB] text-white text-xs font-black rounded-3xl shadow-xl shadow-blue-900/10 hover:-translate-y-1 transition-all uppercase tracking-[0.2em] flex items-center justify-center gap-3"
               >
                  Confirm & Approve Order
                  <ArrowRight className="w-5 h-5" />
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
