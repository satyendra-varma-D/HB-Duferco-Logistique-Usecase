import { useState } from 'react';
import { Link } from 'react-router';
import { 
  Plus, Search, Filter, MoreHorizontal, Edit, Trash2, 
  CheckCircle2, XCircle, UserPlus, Clock, ArrowRight,
  ShieldCheck, AlertCircle, Info, Tag, Truck, Package, Container
} from 'lucide-react';
import { SidePanel } from '../ui/SidePanel';
import { OrderForm } from './OrderForm';
import { OrderAssignModal } from './OrderAssignModal';
import { OrderScheduleForm } from './OrderScheduleForm';
import { OrderDocumentsTab } from './OrderDocumentsTab';
import { Order, OrderStatus, Transporter } from '../../types/order';
import { useAuth } from '../../contexts/AuthContext';

const initialOrders: Order[] = [
  { 
    id: 'ORD-2401', 
    customerName: 'ABC Logistics', 
    contactNumber: '+1 234 567 8901',
    product: 'Diesel', 
    quantity: '15000 L', 
    status: 'TRANSPORTER_ASSIGNED', 
    type: 'SYSTEM',
    date: '2026-04-23',
    pickupLocation: 'Terminal A, Bay 3',
    deliveryLocation: 'ABC Logistics Depot',
    deliveryDeadline: '2026-04-25T18:00',
    assignedTransporterId: 'T-101',
    assignedTransporterName: 'Global Logistics Solutions'
  },
  { 
    id: 'ORD-2402', 
    customerName: 'XYZ Transport', 
    contactNumber: '+1 234 567 8902',
    product: 'Petrol', 
    quantity: '12000 L', 
    status: 'COMPLETED', 
    type: 'MANUAL',
    date: '2026-04-22',
    pickupLocation: 'Terminal B, Bay 1',
    deliveryLocation: 'XYZ Main Station',
    deliveryDeadline: '2026-04-24T12:00'
  },
  { 
    id: 'ORD-2403', 
    customerName: 'Global Freight', 
    contactNumber: '+1 234 567 8903',
    product: 'Diesel', 
    quantity: '20000 L', 
    status: 'WAITING_FOR_APPROVAL', 
    type: 'SYSTEM',
    date: '2026-04-23',
    pickupLocation: 'Terminal A, Bay 2',
    deliveryLocation: 'Global Distribution Center',
    deliveryDeadline: '2026-04-26T09:00'
  },
  { 
    id: 'ORD-2404', 
    customerName: 'Metro Cargo', 
    contactNumber: '+1 234 567 8904',
    product: 'Kerosene', 
    quantity: '8000 L', 
    status: 'WAITING_FOR_APPROVAL', 
    type: 'MANUAL',
    date: '2026-04-21',
    pickupLocation: 'Terminal C, Bay 5',
    deliveryLocation: 'Metro Hub 4',
    deliveryDeadline: '2026-04-23T15:00'
  },
  { 
    id: 'ORD-2405', 
    customerName: 'Quick Ship Ltd', 
    contactNumber: '+1 234 567 8905',
    product: 'Diesel', 
    quantity: '18000 L', 
    status: 'REJECTED', 
    type: 'SYSTEM',
    date: '2026-04-23',
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
    status: 'AT_GATE', 
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
  { 
    id: 'ORD-2406', 
    customerName: 'Global Logistics', 
    contactNumber: '+1 234 567 8906',
    product: 'Diesel', 
    quantity: '15000 L', 
    status: 'AT_GATE', 
    type: 'SYSTEM',
    date: '2026-04-24',
    pickupLocation: 'Terminal A, Bay 3',
    deliveryLocation: 'Main Depot',
    deliveryDeadline: '2026-04-26T12:00',
    assignedTransporterId: 'T-101',
    assignedTransporterName: 'Global Logistics Solutions'
  }
];

const statusConfig: Record<OrderStatus, { label: string; color: string; icon: any }> = {
  WAITING_FOR_APPROVAL: { label: 'Order Pending', color: 'bg-amber-50 text-amber-600 border-amber-100', icon: Clock },
  TRANSPORTER_ASSIGNED: { label: 'Waiting for Approval', color: 'bg-blue-50 text-blue-600 border-blue-100', icon: UserPlus },
  REJECTED: { label: 'Rejected', color: 'bg-red-50 text-red-600 border-red-100', icon: XCircle },
  ACCEPTED: { label: 'Accepted', color: 'bg-indigo-50 text-indigo-600 border-indigo-100', icon: CheckCircle2 },
  AT_GATE: { label: 'At Gate', color: 'bg-orange-50 text-orange-600 border-orange-100', icon: Truck },
  LOADING: { label: 'Loading', color: 'bg-blue-50 text-blue-600 border-blue-100', icon: Package },
  LOADED: { label: 'Loaded', color: 'bg-emerald-50 text-emerald-600 border-emerald-100', icon: CheckCircle2 },
  IN_TRANSIT: { label: 'In Transit', color: 'bg-violet-50 text-violet-600 border-violet-100', icon: Truck },
  COMPLETED: { label: 'Completed', color: 'bg-green-50 text-green-600 border-green-100', icon: ShieldCheck },
};

export function OrdersList() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isSchedulePanelOpen, setIsSchedulePanelOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'SCHEDULE' | 'DOCUMENTS'>('SCHEDULE');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const isAdmin = user?.role === 'ADMIN';
  const isTransporter = user?.role === 'TRANSPORTER';
  const isLoadingManager = user?.role === 'LOADING_MANAGER';
  const isTerminalManager = user?.role === 'TERMINAL_MANAGER';

  // Filter orders based on role
  const displayedOrders = orders.filter(order => {
    if (isAdmin || isLoadingManager || isTerminalManager) return true;
    if (isTransporter) return order.assignedTransporterId === 'T-101'; // Mocking current transporter ID
    return false;
  });

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  const handleAssign = (transporter: Transporter) => {
    if (selectedOrder) {
      setOrders(prev => prev.map(o => o.id === selectedOrder.id ? { 
        ...o, 
        status: 'TRANSPORTER_ASSIGNED',
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
           <h2 className="text-2xl font-black text-slate-900 tracking-tight">Orders Management</h2>
           <p className="text-xs font-medium text-slate-400 mt-1">Manage delivery operations and partner coordination</p>
        </div>
        {isAdmin && (
          <button
            onClick={() => setIsPanelOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-white text-sm font-bold rounded-2xl shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-0.5 transition-all"
          >
            <Plus className="w-5 h-5" />
            Create Manual Order
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
              <option key={key} value={key}>{config.label}</option>
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
                  <tr key={order.id} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex flex-col gap-1">
                        <Link to={`/orders/${order.id}`} className="text-sm font-black text-slate-900 hover:text-primary transition-colors">
                          {order.id}
                        </Link>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-500">{order.customerName}</span>
                          <span className={`px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-wider ${
                            order.type === 'SYSTEM' ? 'bg-indigo-50 text-indigo-500' : 'bg-orange-50 text-orange-500'
                          }`}>
                            {order.type}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                           <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                           <span className="text-xs font-bold text-slate-700">{order.pickupLocation}</span>
                        </div>
                        <div className="flex items-center gap-2">
                           <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                           <span className="text-xs font-bold text-slate-500">{order.deliveryLocation}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="text-sm font-black text-slate-900">{order.quantity}</span>
                        <span className="text-[10px] font-bold text-slate-400 italic">{order.product}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      {order.assignedTransporterName ? (
                        <div className="flex flex-col gap-0.5">
                          <span className="text-xs font-bold text-slate-700">{order.assignedTransporterName}</span>
                          <span className="text-[10px] text-slate-400 font-medium">{order.assignedTransporterId}</span>
                        </div>
                      ) : (
                        <span className="text-[10px] font-bold text-slate-300 italic">Unassigned</span>
                      )}
                    </td>
                    <td className="px-8 py-6">
                      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider border ${config.color}`}>
                        <StatusIcon className="w-3.5 h-3.5" />
                        {config.label}
                      </div>
                      {order.status === 'REJECTED' && (
                        <div className="mt-2 space-y-1">
                          <div className="flex items-center gap-1.5 text-[9px] font-black text-red-500 uppercase tracking-wider">
                            <XCircle className="w-3 h-3" />
                            Rejected by {order.assignedTransporterName || 'Transporter'}
                          </div>
                          {order.rejectionReason && (
                            <div className="flex items-center gap-1.5 text-[9px] font-bold text-red-400 italic ml-4">
                              "{order.rejectionReason}"
                            </div>
                          )}
                        </div>
                      )}
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {isAdmin && (
                          <>
                            {(order.status === 'WAITING_FOR_APPROVAL' || order.status === 'REJECTED') && (
                              <button 
                                onClick={() => {
                                  setSelectedOrder(order);
                                  setIsAssignModalOpen(true);
                                }}
                                className="px-3 py-1.5 bg-primary text-white text-[10px] font-black rounded-lg hover:bg-primary/90 transition-all uppercase flex items-center gap-1.5"
                              >
                                <UserPlus className="w-3 h-3" />
                                {order.status === 'REJECTED' ? 'Reassign' : 'Assign'}
                              </button>
                            )}
                          </>
                        )}
                        
                        {isTransporter && order.status === 'TRANSPORTER_ASSIGNED' && (
                          <>
                            <button 
                              onClick={() => {
                                setSelectedOrder(order);
                                setIsSchedulePanelOpen(true);
                              }}
                              className="px-3 py-1.5 bg-indigo-50 text-indigo-600 text-[10px] font-black rounded-lg hover:bg-indigo-100 transition-colors uppercase"
                            >
                              Accept
                            </button>
                            <button 
                              onClick={() => handleReject(order.id)}
                              className="px-3 py-1.5 bg-red-50 text-red-600 text-[10px] font-black rounded-lg hover:bg-red-100 transition-colors uppercase"
                            >
                              Reject
                            </button>
                          </>
                        )}

                        {isLoadingManager && order.status === 'AT_GATE' && (
                          <Link 
                            to="/loading" 
                            className="px-3 py-1.5 bg-blue-600 text-white text-[10px] font-black rounded-lg hover:bg-blue-700 shadow-lg shadow-blue-900/20 transition-all uppercase flex items-center gap-1.5"
                          >
                            <Container className="w-3.5 h-3.5" />
                            Start Loading
                          </Link>
                        )}

                        <button className="p-2 text-slate-400 hover:text-primary hover:bg-slate-50 rounded-xl transition-all">
                           <MoreHorizontal className="w-4 h-4" />
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

      {/* Side Panel for New Order */}
      <SidePanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        title="Create New Order"
      >
        <OrderForm onClose={() => setIsPanelOpen(false)} hideTitle />
      </SidePanel>

      {/* Transporter Assignment Modal */}
      <OrderAssignModal
        isOpen={isAssignModalOpen}
        onClose={() => {
          setIsAssignModalOpen(false);
          setSelectedOrder(null);
        }}
        onAssign={handleAssign}
        currentTransporterId={selectedOrder?.assignedTransporterId}
      />

      <SidePanel
        isOpen={isSchedulePanelOpen}
        onClose={() => {
          setIsSchedulePanelOpen(false);
          setSelectedOrder(null);
          setActiveTab('SCHEDULE');
        }}
        title={activeTab === 'SCHEDULE' ? 'Schedule Pickup Information' : 'Associated Documents'}
      >
        <div className="flex flex-col h-full">
          {/* Tab Headers */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl mb-6">
            <button 
              onClick={() => setActiveTab('SCHEDULE')}
              className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${
                activeTab === 'SCHEDULE' ? 'bg-white text-primary shadow-sm' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              Pickup Schedule
            </button>
            <button 
              onClick={() => setActiveTab('DOCUMENTS')}
              className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${
                activeTab === 'DOCUMENTS' ? 'bg-white text-primary shadow-sm' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              Documents
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto pr-1">
            {selectedOrder && (
              <>
                {activeTab === 'SCHEDULE' ? (
                  <OrderScheduleForm 
                    order={selectedOrder} 
                    onSubmit={handleScheduleSubmit}
                    onCancel={() => {
                      setIsSchedulePanelOpen(false);
                      setSelectedOrder(null);
                    }}
                  />
                ) : (
                  <OrderDocumentsTab orderId={selectedOrder.id} />
                )}
              </>
            )}
          </div>
        </div>
      </SidePanel>
    </div>
  );
}
