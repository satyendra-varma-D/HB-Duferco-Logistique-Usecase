import { Link } from 'react-router';
import { Plus, Search, Filter, Truck, MapPin, AlertCircle, Clock, CheckCircle } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const trips = [
  { id: 'TRP-1045', transporter: 'Swift Transport', from: 'Terminal A', to: 'ABC Depot', status: 'progress', vehicle: 'TRK-445', time: '2h 15m left' },
  { id: 'TRP-1044', transporter: 'Quick Haul', from: 'Terminal B', to: 'XYZ Warehouse', status: 'loading', vehicle: 'TRK-332', time: '45m left' },
  { id: 'TRP-1043', transporter: 'Metro Logistics', from: 'Terminal A', to: 'Global Station', status: 'waiting', vehicle: 'TRK-881', time: '-' },
  { id: 'TRP-1042', transporter: 'Fast Freight', from: 'Terminal C', to: 'Metro Hub', status: 'completed', vehicle: 'TRK-225', time: 'Done' },
  { id: 'TRP-1041', transporter: 'Express Cargo', from: 'Terminal A', to: 'Regional Center', status: 'issue', vehicle: 'TRK-667', time: 'Delayed' },
];

const statusData = [
  { name: 'In Transit', value: 12, color: '#0066FF' },
  { name: 'Loading', value: 8, color: '#3B82F6' },
  { name: 'Waiting', value: 5, color: '#F59E0B' },
  { name: 'Completed', value: 24, color: '#10B981' },
  { name: 'Issues', value: 2, color: '#EF4444' },
];

const statusColors = {
  waiting: 'bg-amber-50 text-amber-600 border-amber-200',
  approved: 'bg-blue-50 text-blue-600 border-blue-200',
  progress: 'bg-primary/5 text-primary border-primary/20',
  loading: 'bg-primary/5 text-primary border-primary/20',
  completed: 'bg-green-50 text-green-600 border-green-200',
  issue: 'bg-red-50 text-red-600 border-red-200',
};

export function TripsList() {
  return (
    <div className="space-y-6 pb-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">Trips Management</h2>
        <Link
          to="/trips/new"
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-bold rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-0.5 transition-all"
        >
          <Plus className="w-4 h-4" />
          New Trip
        </Link>
      </div>

      {/* Fleet Overview Row */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Total Active Trips', value: '25', icon: Truck, color: 'text-primary' },
            { label: 'On-Time Performance', value: '98.2%', icon: CheckCircle, color: 'text-green-500' },
            { label: 'Avg Transit Time', value: '4.2 hrs', icon: Clock, color: 'text-blue-500' },
          ].map((kpi) => (
            <div key={kpi.label} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
              <div className={`p-3 rounded-xl bg-slate-50 ${kpi.color}`}>
                <kpi.icon className="w-6 h-6" />
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{kpi.label}</div>
                <div className="text-xl font-bold text-slate-900">{kpi.value}</div>
              </div>
            </div>
          ))}
          
          <div className="md:col-span-3 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
             <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Recent Map Overview</h3>
                <span className="text-[10px] font-bold text-slate-400">5 Vehicles in Proximity</span>
             </div>
             <div className="h-32 bg-slate-50 rounded-2xl flex items-center justify-center border border-dashed border-slate-200">
                <div className="flex flex-col items-center gap-2 text-slate-400">
                   <MapPin className="w-6 h-6" />
                   <span className="text-xs font-medium">Tracking System Active</span>
                </div>
             </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center justify-center">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 w-full">Status Distribution</h3>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2 w-full">
             {statusData.map(s => (
                <div key={s.name} className="flex items-center gap-1.5">
                   <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: s.color }} />
                   <span className="text-[9px] font-bold text-slate-500 uppercase">{s.name}</span>
                </div>
             ))}
          </div>
        </div>
      </div>

      {/* Trips Table */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h3 className="text-base font-bold text-slate-900">Trip Inventory</h3>
          <div className="flex flex-wrap gap-3">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder="Search Trip ID / Vehicle..."
                className="pl-9 pr-4 py-2 bg-slate-50 border border-transparent rounded-xl outline-none focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all text-xs w-64"
              />
            </div>
            <button className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-transparent rounded-xl hover:bg-slate-100 transition-all text-xs font-bold text-slate-600">
              <Filter className="w-3.5 h-3.5" />
              Filters
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                <th className="pb-4 px-2">Trip ID</th>
                <th className="pb-4 px-2">Transporter</th>
                <th className="pb-4 px-2">Vehicle</th>
                <th className="pb-4 px-2">Route</th>
                <th className="pb-4 px-2">Time/ETA</th>
                <th className="pb-4 px-2">Status</th>
                <th className="pb-4 px-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {trips.map((trip) => (
                <tr key={trip.id} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-2">
                    <Link to={`/trips/${trip.id}`} className="text-xs font-bold text-primary hover:underline">
                      {trip.id}
                    </Link>
                  </td>
                  <td className="py-4 px-2 text-xs font-medium text-slate-700">{trip.transporter}</td>
                  <td className="py-4 px-2">
                    <div className="flex items-center gap-2">
                      <Truck className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-xs font-bold text-slate-900">{trip.vehicle}</span>
                    </div>
                  </td>
                  <td className="py-4 px-2">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-medium text-slate-600">{trip.from}</span>
                      <div className="w-4 h-px bg-slate-200" />
                      <span className="font-medium text-slate-600">{trip.to}</span>
                    </div>
                  </td>
                  <td className="py-4 px-2 text-xs font-medium text-slate-500 italic">{trip.time}</td>
                  <td className="py-4 px-2">
                    <span className={`px-2.5 py-1 rounded-lg text-[9px] font-bold border ${statusColors[trip.status as keyof typeof statusColors]}`}>
                      {trip.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-4 px-2 text-right">
                    <Link
                      to={`/trips/${trip.id}`}
                      className="text-[10px] font-bold text-primary hover:underline uppercase tracking-wider"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
