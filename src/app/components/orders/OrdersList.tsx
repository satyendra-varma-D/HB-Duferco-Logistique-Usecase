import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { 
  Plus, Search, Filter, MoreHorizontal, Edit, Trash2, 
  CheckCircle2, XCircle, UserPlus, Clock, ArrowRight,
  ShieldCheck, AlertCircle, Info, Tag, Truck, Package, Container, RotateCw,
  ArrowLeft, ChevronRight, ChevronDown, User, Calendar
} from 'lucide-react';
import { OrderDetail } from './OrderDetail';
import { useAuth } from '../../contexts/AuthContext';

type OrderStatus = 
  | 'CREATED'
  | 'ASSIGNED'
  | 'TRIP_SCHEDULED'
  | 'IN_TERMINAL'
  | 'LOADING'
  | 'LOADED'
  | 'DISPATCHED'
  | 'IN_TRANSIT'
  | 'DELIVERED'
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
  pickupTimeSlot?: string;
  pickupQuantity?: string;
}

const statusConfig: Record<OrderStatus, { label: string; color: string; icon: any }> = {
  CREATED: { label: 'CREATED', color: 'bg-amber-50 text-amber-600 border-amber-100', icon: Clock },
  ASSIGNED: { label: 'ASSIGNED', color: 'bg-blue-50 text-blue-600 border-blue-100', icon: UserPlus },
  TRIP_SCHEDULED: { label: 'TRIP SCHEDULED', color: 'bg-indigo-50 text-indigo-600 border-indigo-100', icon: Truck },
  IN_TERMINAL: { label: 'IN TERMINAL', color: 'bg-purple-50 text-purple-600 border-purple-100', icon: Container },
  LOADING: { label: 'LOADING', color: 'bg-orange-50 text-orange-600 border-orange-100', icon: RotateCw },
  LOADED: { label: 'LOADED', color: 'bg-emerald-50 text-emerald-600 border-emerald-100', icon: ShieldCheck },
  DISPATCHED: { label: 'DISPATCHED', color: 'bg-slate-900 text-white border-slate-900', icon: CheckCircle2 },
  IN_TRANSIT: { label: 'IN TRANSIT', color: 'bg-blue-600 text-white border-blue-600', icon: ArrowRight },
  DELIVERED: { label: 'DELIVERED', color: 'bg-green-50 text-green-600 border-green-100', icon: CheckCircle2 },
  REJECTED: { label: 'REJECTED', color: 'bg-red-50 text-red-600 border-red-100', icon: XCircle },
};

const initialOrders: Order[] = [
  { 
    id: 'ORD-BE-1001', 
    customerName: 'ArcelorMittal Belgium', 
    product: 'Steel Coils', 
    quantity: '25 MT', 
    status: 'TRIP_SCHEDULED', 
    type: 'SYSTEM',
    date: '2026-04-24',
    pickupLocation: 'Antwerp Port Terminal',
    deliveryLocation: 'ArcelorMittal Gent',
    assignedTransporterId: 'T-101',
    assignedTransporterName: 'H. Essers',
    truckNumber: '1-ABC-234',
    driverName: 'Jean Dupont',
    pickupTimeSlot: '24 Apr, 14:00 - 16:00',
    pickupQuantity: '25 MT'
  },
  { 
    id: 'ORD-BE-1008', 
    customerName: 'BASF Antwerp', 
    product: 'Chemical Drums', 
    quantity: '12 MT', 
    status: 'ASSIGNED', 
    type: 'SYSTEM',
    date: '2026-04-25',
    pickupLocation: 'Antwerp Port Terminal',
    deliveryLocation: 'BASF Ludwigshafen',
    assignedTransporterId: 'T-101',
    assignedTransporterName: 'H. Essers'
  },
  { 
    id: 'ORD-BE-1009', 
    customerName: 'Bayer CropScience', 
    product: 'Liquid Fertilizers', 
    quantity: '22 MT', 
    status: 'ASSIGNED', 
    type: 'MANUAL',
    date: '2026-04-25',
    pickupLocation: 'Ghent Terminal',
    deliveryLocation: 'Bayer Leverkusen',
    assignedTransporterId: 'T-101',
    assignedTransporterName: 'H. Essers'
  },
  { 
    id: 'ORD-BE-1010', 
    customerName: 'Umicore Hoboken', 
    product: 'Refined Metals', 
    quantity: '5 MT', 
    status: 'ASSIGNED', 
    type: 'SYSTEM',
    date: '2026-04-26',
    pickupLocation: 'Antwerp Port Terminal',
    deliveryLocation: 'Umicore Hanau',
    assignedTransporterId: 'T-101',
    assignedTransporterName: 'H. Essers'
  },
  { 
    id: 'ORD-BE-1002', 
    customerName: 'TotalEnergies Belgium', 
    product: 'Steel Bars', 
    quantity: '18 MT', 
    status: 'DELIVERED', 
    type: 'MANUAL',
    date: '2026-04-23',
    pickupLocation: 'Zeebrugge Terminal',
    deliveryLocation: 'TotalEnergies Brussels',
    assignedTransporterId: 'T-102',
    assignedTransporterName: 'Van Moer Logistics',
    truckNumber: '2-XYZ-789',
    driverName: 'Marc De Smet'
  },
  { 
    id: 'ORD-BE-1003', 
    customerName: 'ExxonMobil Antwerp Refinery', 
    product: 'Steel Coils', 
    quantity: '30 MT', 
    status: 'CREATED', 
    type: 'SYSTEM',
    date: '2026-04-24',
    pickupLocation: 'Antwerp Port Terminal',
    deliveryLocation: 'Industrial Distribution Centers'
  },
  { 
    id: 'ORD-BE-1004', 
    customerName: 'ArcelorMittal Belgium', 
    product: 'Steel Plates', 
    quantity: '40 MT', 
    status: 'CREATED', 
    type: 'MANUAL',
    date: '2026-04-24',
    pickupLocation: 'Ghent Terminal',
    deliveryLocation: 'Brussels Airport Depot'
  },
  { 
    id: 'ORD-BE-1005', 
    customerName: 'TotalEnergies Belgium', 
    product: 'Steel Coils', 
    quantity: '20 MT', 
    status: 'REJECTED', 
    type: 'SYSTEM',
    date: '2026-04-24',
    pickupLocation: 'Antwerp Port Terminal',
    deliveryLocation: 'TotalEnergies Distribution',
    deliveryDeadline: '2026-04-25T14:00',
    assignedTransporterId: 'T-102',
    assignedTransporterName: 'Van Moer Logistics',
    rejectionReason: 'Vehicle unavailable for the requested slot.'
  },
  { 
    id: 'ORD-BE-1006', 
    customerName: 'ExxonMobil Antwerp Refinery', 
    product: 'Steel Bars', 
    quantity: '15 MT', 
    status: 'TRIP_SCHEDULED', 
    type: 'SYSTEM',
    date: '2026-04-24',
    pickupLocation: 'Antwerp Port Terminal',
    deliveryLocation: 'Main Depot Brussels',
    assignedTransporterId: 'T-104',
    assignedTransporterName: 'Transport Gheys',
    truckNumber: 'BE-TK-9087',
    driverName: 'Thomas Vermeulen',
    pickupTimeSlot: '25 Apr, 09:00 - 11:00',
    pickupQuantity: '15 MT'
  },
  { 
    id: 'ORD-BE-1007', 
    customerName: 'Industrial Distribution Centers', 
    product: 'Steel Plates', 
    quantity: '25 MT', 
    status: 'LOADED', 
    type: 'MANUAL',
    date: '2026-04-24',
    pickupLocation: 'Zeebrugge Terminal',
    deliveryLocation: 'Distribution Center Liege',
    assignedTransporterId: 'T-103',
    assignedTransporterName: 'Katoen Natie',
    truckNumber: '1-DEF-456',
    driverName: 'Lucas Peeters',
    loadedQuantity: '25 MT',
    loadingManagerName: 'Olivier Janssens',
    pickupTimeSlot: '24 Apr, 11:00 - 13:00',
    pickupQuantity: '25 MT'
  },
];

interface Transporter {
  id: string;
  name: string;
  rating: number;
  completedOrders: number;
}

const mockTransporters: Transporter[] = [
  { id: 'T-101', name: 'H. Essers', rating: 4.8, completedOrders: 1250 },
  { id: 'T-102', name: 'Van Moer Logistics', rating: 4.6, completedOrders: 980 },
  { id: 'T-103', name: 'Katoen Natie', rating: 4.9, completedOrders: 2100 },
  { id: 'T-104', name: 'Transport Gheys', rating: 4.5, completedOrders: 750 },
  { id: 'T-105', name: 'Sitra Group', rating: 4.7, completedOrders: 1100 },
];

export function OrdersList() {
  const { user } = useAuth();
  const location = useLocation();
  const [orders, setOrders] = useState<Order[]>(initialOrders);
   const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
   const [isSchedulePanelOpen, setIsSchedulePanelOpen] = useState(false);
   const [isRejectPanelOpen, setIsRejectPanelOpen] = useState(false);
   const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
   const [activeTab, setActiveTab] = useState<'details' | 'schedule' | 'documents'>('details');
   const [rejectionReason, setRejectionReason] = useState('');
   const [searchQuery, setSearchQuery] = useState('');
   const [statusFilter, setStatusFilter] = useState('All Status');
   const [typeFilter, setTypeFilter] = useState('Order Type');

  useEffect(() => {
    const state = location.state as { openOrderId?: string };
    if (state?.openOrderId) {
      const order = orders.find(o => o.id === state.openOrderId);
      if (order) {
        setSelectedOrder(order);
        setActiveTab('schedule');
        // Clear state to prevent re-opening when coming back from order details
        window.history.replaceState({}, document.title);
      }
    }
  }, [location.state, orders]);

  const isAdmin = user?.role === 'ADMIN';
  const isTransporter = user?.role === 'TRANSPORTER';
  const isLoadingManager = user?.role === 'LOADING_MANAGER';
  const isTerminalManager = user?.role === 'TERMINAL_MANAGER' || (user?.role as any) === 'CHECKPOST_MANAGER';

  const displayedOrders = orders.filter(order => {
    // 1. Role-based filtering
    let roleMatch = false;
    if (isAdmin || isLoadingManager || isTerminalManager) roleMatch = true;
    else if (isTransporter) roleMatch = order.assignedTransporterId === 'T-101';
    
    if (!roleMatch) return false;

    // 2. Search filtering
    const searchMatch = searchQuery === '' || 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase());

    // 3. Status filtering
    const statusMatch = statusFilter === 'All Status' || order.status === statusFilter;

    // 4. Type filtering
    const typeMatch = typeFilter === 'Order Type' || order.type === typeFilter;

    return searchMatch && statusMatch && typeMatch;
  });

  const handleAssign = (transporter: Transporter) => {
    if (selectedOrder) {
      setOrders(prev => prev.map(o => o.id === selectedOrder.id ? { 
        ...o, 
        status: 'ASSIGNED',
        assignedTransporterId: transporter.id,
        assignedTransporterName: transporter.name
      } : o));
      setIsAssignModalOpen(false);
      setSelectedOrder(null);
    }
  };

  const handleConfirmReject = () => {
    if (selectedOrder) {
      setOrders(prev => prev.map(o => o.id === selectedOrder.id ? { 
        ...o, 
        status: 'REJECTED',
        rejectionReason: rejectionReason || 'Rejected by Transporter'
      } : o));
      setIsRejectPanelOpen(false);
      setSelectedOrder(null);
      setRejectionReason('');
    }
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
        status: 'TRIP_SCHEDULED',
        ...scheduleData
      } : o));
      setIsSchedulePanelOpen(false);
      setSelectedOrder(null);
    }
  };

  const openOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setActiveTab(isTransporter ? 'schedule' : 'details');
  };

  if (selectedOrder && !isAssignModalOpen && !isSchedulePanelOpen && !isRejectPanelOpen) {
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
    <div className="space-y-6 animate-in fade-in duration-500 relative min-h-screen">
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all text-xs font-bold"
            />
          </div>
          <div className="relative">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all text-xs font-bold text-slate-600 appearance-none"
            >
              <option>All Status</option>
              {Object.entries(statusConfig).map(([key, config]) => (
                <option key={key} value={key}>{config.label}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
          <div className="relative">
            <select 
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all text-xs font-bold text-slate-600 appearance-none"
            >
              <option>Order Type</option>
              <option value="SYSTEM">System Generated</option>
              <option value="MANUAL">Manual Creation</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
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
                        {isAdmin && order.status === 'CREATED' && (
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
                        {isTransporter && order.status === 'ASSIGNED' && (
                          <div className="flex items-center gap-2">
                             <button
                               onClick={() => { setSelectedOrder(order); setIsSchedulePanelOpen(true); }}
                               className="px-3 py-1.5 bg-green-500 text-white text-[9px] font-black rounded-lg uppercase tracking-widest shadow-md shadow-green-900/10 hover:shadow-lg transition-all"
                             >
                               Approve
                             </button>
                             <button
                               onClick={() => { setSelectedOrder(order); setIsRejectPanelOpen(true); }}
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

      {/* Slide-over Side Panel Implementation */}
      {(isSchedulePanelOpen || isRejectPanelOpen || isAssignModalOpen) && (
        <div className="fixed inset-0 z-[100] overflow-hidden">
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity animate-in fade-in duration-300" 
            onClick={() => {
              setIsSchedulePanelOpen(false);
              setIsRejectPanelOpen(false);
              setIsAssignModalOpen(false);
              setSelectedOrder(null);
            }}
          />
          
          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
            <div className="w-screen max-w-xl animate-in slide-in-from-right duration-500">
              <div className="h-full flex flex-col bg-white shadow-2xl border-l border-slate-100">
                
                {/* Header */}
                <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-white z-10">
                  <div>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight uppercase">
                      {isSchedulePanelOpen ? 'Approve & Schedule' : isRejectPanelOpen ? 'Reject Order' : 'Assign Transporter'}
                    </h3>
                    {selectedOrder && (
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
                        Order: {selectedOrder.id}
                      </p>
                    )}
                  </div>
                  <button 
                    onClick={() => {
                      setIsSchedulePanelOpen(false);
                      setIsRejectPanelOpen(false);
                      setIsAssignModalOpen(false);
                      setSelectedOrder(null);
                    }}
                    className="p-2 text-slate-400 hover:text-slate-900 transition-colors"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-8">
                  {isSchedulePanelOpen && (
                    <div className="space-y-8">
                      <div className="bg-blue-50/50 p-6 rounded-3xl border border-blue-100 flex items-start gap-4">
                        <Info className="w-5 h-5 text-[#0047AB] shrink-0 mt-1" />
                        <p className="text-xs font-bold text-[#0047AB] leading-relaxed italic">
                          Provide truck and driver details to finalize the trip schedule and generate the digital gate pass.
                        </p>
                      </div>

                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Truck Number Plate</label>
                          <div className="relative group">
                            <Truck className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-[#0047AB] transition-colors" />
                            <input 
                              type="text" 
                              placeholder="E.G. 1-ABC-234"
                              className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-[#0047AB] transition-all text-sm font-black uppercase"
                              id="sched-truck"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Driver Full Name</label>
                          <div className="relative group">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-[#0047AB] transition-colors" />
                            <input 
                              type="text" 
                              placeholder="ENTER FULL NAME"
                              className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-[#0047AB] transition-all text-sm font-black uppercase"
                              id="sched-driver"
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Scheduled Date</label>
                            <div className="relative group">
                              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-[#0047AB] transition-colors" />
                              <input 
                                type="date" 
                                className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-[#0047AB] transition-all text-sm font-black"
                                id="sched-date"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Scheduled Time</label>
                            <div className="relative group">
                              <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-[#0047AB] transition-colors" />
                              <input 
                                type="time" 
                                className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-[#0047AB] transition-all text-sm font-black"
                                id="sched-time-only"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {isRejectPanelOpen && (
                    <div className="space-y-8">
                      <div className="bg-red-50/50 p-6 rounded-3xl border border-red-100 flex items-start gap-4">
                        <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-1" />
                        <p className="text-xs font-bold text-red-700 leading-relaxed italic">
                          Please provide a specific reason for rejecting this assignment. This will be logged for terminal audit.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Rejection Reason</label>
                        <textarea 
                          rows={6}
                          placeholder="E.G. VEHICLE MAINTENANCE, SLOT UNAVAILABLE, ETC."
                          className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-red-500 transition-all text-sm font-black uppercase resize-none"
                          value={rejectionReason}
                          onChange={(e) => setRejectionReason(e.target.value)}
                        />
                      </div>
                    </div>
                  )}

                  {isAssignModalOpen && (
                    <div className="space-y-4">
                      {mockTransporters.map((t) => (
                        <button
                          key={t.id}
                          onClick={() => handleAssign(t)}
                          className="w-full flex items-center justify-between p-6 bg-white border border-slate-100 rounded-[32px] hover:border-[#0047AB] hover:shadow-xl hover:shadow-blue-900/5 transition-all group relative overflow-hidden"
                        >
                          <div className="flex items-center gap-6">
                            <div className="w-16 h-16 rounded-3xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-[#0047AB] transition-all shrink-0">
                              <Truck className="w-8 h-8" />
                            </div>
                            <div className="text-left">
                              <div className="flex items-center gap-3">
                                <span className="text-base font-black text-slate-900">{t.name}</span>
                                <span className="px-2 py-0.5 bg-slate-100 text-[9px] font-black text-slate-400 rounded-lg uppercase tracking-widest">{t.id}</span>
                              </div>
                              <div className="flex items-center gap-6 mt-2">
                                <div className="flex items-center gap-1.5">
                                  <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                      <svg key={i} className={`w-3 h-3 ${i < Math.floor(t.rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'}`} viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                      </svg>
                                    ))}
                                  </div>
                                  <span className="text-[11px] font-black text-slate-900">{t.rating}</span>
                                </div>
                                <div className="w-px h-3 bg-slate-100" />
                                <div className="flex items-center gap-1.5">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                    <span className="text-slate-900 font-black">{t.completedOrders}</span> Trips
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-[#0047AB] group-hover:text-white transition-all">
                             <ChevronRight className="w-6 h-6" />
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer Actions */}
                <div className="p-8 border-t border-slate-50 bg-slate-50/30">
                  {isSchedulePanelOpen && (
                    <button 
                      onClick={() => {
                        const truck = (document.getElementById('sched-truck') as HTMLInputElement).value;
                        const driver = (document.getElementById('sched-driver') as HTMLInputElement).value;
                        const date = (document.getElementById('sched-date') as HTMLInputElement).value;
                        const time = (document.getElementById('sched-time-only') as HTMLInputElement).value;
                        
                        if (!truck || !driver || !date || !time) {
                          alert('Please complete all scheduling details.');
                          return;
                        }
                        
                        // Mock implementation of handleScheduleSubmit
                        const updatedOrder = {
                          ...selectedOrder!,
                          status: 'TRIP_SCHEDULED' as const,
                          truckNumber: truck,
                          driverName: driver,
                          pickupTimeSlot: `${date} ${time}`,
                          pickupQuantity: selectedOrder?.quantity || '0 MT'
                        };
                        
                        setOrders(orders.map(o => o.id === selectedOrder?.id ? updatedOrder : o));
                        setIsSchedulePanelOpen(false);
                        setSelectedOrder(null);
                      }}
                      className="w-full py-5 bg-[#0047AB] text-white text-xs font-black rounded-3xl shadow-xl shadow-blue-900/10 hover:-translate-y-1 transition-all uppercase tracking-[0.2em] flex items-center justify-center gap-3"
                    >
                      Confirm & Schedule
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  )}

                  {isRejectPanelOpen && (
                    <button 
                      onClick={() => {
                        if (!rejectionReason) return;
                        const updatedOrder = {
                          ...selectedOrder!,
                          status: 'REJECTED' as const,
                          rejectionReason
                        };
                        setOrders(orders.map(o => o.id === selectedOrder?.id ? updatedOrder : o));
                        setIsRejectPanelOpen(false);
                        setSelectedOrder(null);
                        setRejectionReason('');
                      }}
                      disabled={!rejectionReason}
                      className="w-full py-5 bg-red-500 text-white text-xs font-black rounded-3xl shadow-xl shadow-red-900/10 hover:-translate-y-1 transition-all uppercase tracking-[0.2em] flex items-center justify-center gap-3 disabled:opacity-50 disabled:shadow-none disabled:translate-y-0"
                    >
                      Confirm Rejection
                      <XCircle className="w-5 h-5" />
                    </button>
                  )}

                  <button 
                    onClick={() => {
                      setIsSchedulePanelOpen(false);
                      setIsRejectPanelOpen(false);
                      setIsAssignModalOpen(false);
                      setSelectedOrder(null);
                    }}
                    className="w-full mt-3 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors"
                  >
                    Discard Changes
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
