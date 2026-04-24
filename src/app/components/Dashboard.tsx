import { Link } from 'react-router';
import { 
  TrendingUp, Clock, AlertTriangle, CheckCircle, 
  Package, Truck, UserPlus, ArrowUpRight, ArrowDownRight,
  Plus, Download, MapPin, Container, ArrowRight
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Cell, LineChart, Line
} from 'recharts';
import { useAuth } from '../contexts/AuthContext';

const kpis = [
  { label: 'Active Orders', value: '42', change: '+8%', icon: Package, color: 'bg-blue-500/10 text-blue-500' },
  { label: 'Pending Approval', value: '12', change: '+2', icon: Clock, color: 'bg-amber-500/10 text-amber-500' },
  { label: 'Vehicles En-route', value: '28', change: '+5%', icon: Truck, color: 'bg-indigo-500/10 text-indigo-500' },
  { label: 'Delivery Efficiency', value: '94%', change: '+1.2%', icon: CheckCircle, color: 'bg-green-500/10 text-green-500' },
];

const chartData = [
  { name: 'Mon', orders: 24, efficiency: 92 },
  { name: 'Tue', orders: 32, efficiency: 88 },
  { name: 'Wed', orders: 28, efficiency: 95 },
  { name: 'Thu', orders: 45, efficiency: 94 },
  { name: 'Fri', orders: 38, efficiency: 91 },
  { name: 'Sat', orders: 20, efficiency: 96 },
  { name: 'Sun', orders: 15, efficiency: 98 },
];

const pendingApprovals = [
  { id: 'ORD-2403', customer: 'Global Freight', product: 'Diesel', quantity: '20,000 L', priority: 'High' },
  { id: 'ORD-2407', customer: 'Nexus Energy', product: 'Petrol', quantity: '15,000 L', priority: 'Medium' },
  { id: 'ORD-2408', customer: 'Horizon Oil', product: 'Kerosene', quantity: '5,000 L', priority: 'Low' },
];

const fleetStatus = [
  { vehicle: 'TN-45-A-1234', driver: 'Robert Fox', status: 'Loading', location: 'Terminal A' },
  { vehicle: 'TN-45-B-5678', driver: 'Jenny Wilson', status: 'En-route', location: 'Highway 101' },
  { vehicle: 'TN-45-C-9012', driver: 'Guy Hawkins', status: 'Unloading', location: 'City Depot' },
];

export function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-6 pb-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
           <h1 className="text-3xl font-black text-slate-900 tracking-tight">Dashboard Overview</h1>
           <p className="text-sm font-medium text-slate-400 mt-1">Welcome back, {user?.name}. Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-100 text-slate-600 text-xs font-bold rounded-xl shadow-sm hover:bg-slate-50 transition-all">
             <Download className="w-4 h-4" />
             Export Report
          </button>
          {user?.role === 'ADMIN' && (
            <Link to="/orders/new" className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-xs font-bold rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-0.5 transition-all">
              <Plus className="w-4 h-4" />
              New Order
            </Link>
          )}
        </div>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100 flex items-center justify-between group hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300 ${kpi.color}`}>
                <kpi.icon className="w-6 h-6" />
              </div>
              <div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{kpi.label}</div>
                <div className="text-2xl font-black text-slate-900 leading-none">{kpi.value}</div>
              </div>
            </div>
            <div className={`px-2 py-1 rounded-lg text-[10px] font-black flex items-center gap-0.5 bg-green-50 text-green-500`}>
              <ArrowUpRight className="w-3 h-3" />
              {kpi.change}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart Section */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[40px] shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Order Volume</div>
              <div className="text-2xl font-black text-slate-900 tracking-tight">Weekly Performance</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                 <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Orders</span>
              </div>
              <div className="flex items-center gap-2">
                 <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Efficiency</span>
              </div>
            </div>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94A3B8', fontSize: 11, fontWeight: 700 }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94A3B8', fontSize: 11, fontWeight: 700 }}
                />
                <Tooltip 
                  cursor={{ fill: '#F8FAFC' }}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="orders" fill="#0066FF" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pending Approvals Section */}
        <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-black text-slate-900 tracking-tight">Pending Approvals</h3>
            <button className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {pendingApprovals.map((order) => (
              <div key={order.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 group hover:border-primary/20 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black text-slate-900">{order.id}</span>
                  <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${
                    order.priority === 'High' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'
                  }`}>
                    {order.priority} Priority
                  </span>
                </div>
                <div className="text-[11px] font-bold text-slate-500">{order.customer}</div>
                <div className="flex items-center justify-between mt-3">
                   <div className="text-[10px] font-black text-slate-900">{order.quantity} <span className="text-slate-400 font-bold">• {order.product}</span></div>
                   <button className="p-1.5 bg-white rounded-lg border border-slate-100 text-primary hover:bg-primary hover:text-white transition-all shadow-sm">
                      <ArrowRight className="w-3.5 h-3.5" />
                   </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Fleet Status Section */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[40px] shadow-sm border border-slate-100">
          <h3 className="text-lg font-black text-slate-900 tracking-tight mb-6">Live Fleet Status</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-slate-400 text-[10px] font-black uppercase tracking-widest border-b border-slate-50">
                  <th className="pb-4 px-2">Vehicle ID</th>
                  <th className="pb-4 px-2">Operator</th>
                  <th className="pb-4 px-2">Current Status</th>
                  <th className="pb-4 px-2">Location</th>
                  <th className="pb-4 px-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {fleetStatus.map((fleet) => (
                  <tr key={fleet.vehicle} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-500">
                          <Truck className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-black text-slate-900">{fleet.vehicle}</span>
                      </div>
                    </td>
                    <td className="py-4 px-2 text-xs font-bold text-slate-500">{fleet.driver}</td>
                    <td className="py-4 px-2">
                      <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                        fleet.status === 'En-route' ? 'bg-blue-50 text-blue-500' : 'bg-amber-50 text-amber-500'
                      }`}>
                        {fleet.status}
                      </span>
                    </td>
                    <td className="py-4 px-2">
                       <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                          <MapPin className="w-3.5 h-3.5 text-slate-300" />
                          {fleet.location}
                       </div>
                    </td>
                    <td className="py-4 px-2 text-right">
                       <button className="p-2 text-slate-400 hover:text-primary hover:bg-white rounded-xl transition-all shadow-sm">
                          <Container className="w-4 h-4" />
                       </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Logistics Optimization Promo */}
        <div className="bg-primary rounded-[40px] p-8 text-white relative overflow-hidden flex flex-col justify-between group">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-24 -mt-24 blur-3xl group-hover:bg-white/20 transition-all duration-700" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24 blur-3xl group-hover:bg-white/20 transition-all duration-700" />
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-[9px] font-black tracking-widest uppercase mb-6">
              Intelligence AI
            </div>
            <h2 className="text-2xl font-black leading-tight mb-4 tracking-tight">
              Route Optimization Engine is Active
            </h2>
            <p className="text-white/70 text-xs font-medium leading-relaxed">
              Our AI has analyzed today's orders and suggested 4 route optimizations to save 12% in fuel costs.
            </p>
          </div>

          <button className="relative z-10 w-full bg-white text-primary text-xs font-black py-4 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 mt-8 uppercase tracking-widest">
            Apply Optimizations
          </button>
        </div>
      </div>
    </div>
  );
}
