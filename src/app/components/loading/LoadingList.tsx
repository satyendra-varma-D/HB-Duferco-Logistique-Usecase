import { Link } from 'react-router';
import { 
  Search, Package, Activity, Clock, 
  CheckCircle, AlertCircle, Fuel, Users 
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';

const loadingQueue = [
  { id: 'TRP-1045', product: 'Diesel', planned: '5000', bay: 'Bay 3', status: 'waiting', operator: 'Unassigned', progress: 0 },
  { id: 'TRP-1044', product: 'Petrol', planned: '12000', bay: 'Bay 1', status: 'loading', operator: 'Mike Johnson', progress: 65 },
  { id: 'TRP-1046', product: 'Diesel', planned: '8000', bay: 'Bay 5', status: 'waiting', operator: 'Unassigned', progress: 0 },
  { id: 'TRP-1047', product: 'Kerosene', planned: '6000', bay: 'Bay 2', status: 'loading', operator: 'Sarah Williams', progress: 30 },
];

const bayStatus = [
  { id: 'Bay 1', status: 'Occupied', vehicle: 'TRK-445', color: 'bg-primary' },
  { id: 'Bay 2', status: 'Occupied', vehicle: 'TRK-332', color: 'bg-primary' },
  { id: 'Bay 3', status: 'Available', vehicle: '-', color: 'bg-green-500' },
  { id: 'Bay 4', status: 'Maintenance', vehicle: '-', color: 'bg-red-500' },
  { id: 'Bay 5', status: 'Available', vehicle: '-', color: 'bg-green-500' },
];

const performanceData = [
  { time: '08:00', liters: 4500 },
  { time: '10:00', liters: 7800 },
  { time: '12:00', liters: 6200 },
  { time: '14:00', liters: 12000 },
  { time: '16:00', liters: 9500 },
  { time: '18:00', liters: 5000 },
];

const statusColors = {
  waiting: 'bg-amber-50 text-amber-600 border-amber-200',
  loading: 'bg-primary/5 text-primary border-primary/20',
};

export function LoadingList() {
  return (
    <div className="space-y-6 pb-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">Loading Operations</h2>
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 bg-white px-3 py-1.5 rounded-lg border border-slate-100 shadow-sm">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Live System Monitoring
        </div>
      </div>

      {/* KPI & Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Active Loadings', value: '8', icon: Activity, color: 'text-primary' },
          { label: 'Avg. Loading Time', value: '24 min', icon: Clock, color: 'text-amber-500' },
          { label: 'Total Liters (Today)', value: '145k', icon: Fuel, color: 'text-green-500' },
          { label: 'Operator Efficiency', value: '94%', icon: Users, color: 'text-blue-500' },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className={`p-2.5 rounded-xl bg-slate-50 ${kpi.color}`}>
              <kpi.icon className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{kpi.label}</div>
              <div className="text-lg font-bold text-slate-900">{kpi.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bay Status Grid */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-bold text-slate-900">Bay Occupancy Monitor</h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                <div className="w-2 h-2 rounded-full bg-green-500" /> Available
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                <div className="w-2 h-2 rounded-full bg-primary" /> Occupied
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {bayStatus.map((bay) => (
              <div key={bay.id} className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 flex flex-col items-center text-center group hover:bg-white hover:shadow-md transition-all">
                <div className="text-xs font-bold text-slate-900 mb-3">{bay.id}</div>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 text-white ${bay.color} shadow-lg shadow-current/20`}>
                  <Fuel className="w-5 h-5" />
                </div>
                <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">{bay.status}</div>
                <div className="text-xs font-bold text-slate-900">{bay.vehicle}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Throughput Chart */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col">
          <h3 className="text-base font-bold text-slate-900 mb-6">Loading Performance</h3>
          <div className="flex-1 h-[150px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="colorLiters" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0066FF" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#0066FF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="time" hide />
                <YAxis hide />
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-slate-900 text-white px-2 py-1 rounded text-[10px] font-bold shadow-lg">
                          {payload[0].value.toLocaleString()} L
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area type="monotone" dataKey="liters" stroke="#0066FF" fillOpacity={1} fill="url(#colorLiters)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
            <div className="text-[10px] font-bold text-slate-400 uppercase">Peak Throughput</div>
            <div className="text-xs font-bold text-primary">12,000 L/hr</div>
          </div>
        </div>
      </div>

      {/* Main Table Section */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h3 className="text-base font-bold text-slate-900">Loading Queue</h3>
          <div className="flex flex-wrap gap-3">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder="Search Trip ID..."
                className="pl-9 pr-4 py-2 bg-slate-50 border border-transparent rounded-xl outline-none focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all text-xs w-48"
              />
            </div>
            <select className="px-3 py-2 bg-slate-50 border border-transparent rounded-xl outline-none focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all text-xs font-medium text-slate-600">
              <option>All Bays</option>
              {bayStatus.map(b => <option key={b.id}>{b.id}</option>)}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                <th className="pb-4 px-2">Trip ID</th>
                <th className="pb-4 px-2">Product</th>
                <th className="pb-4 px-2">Planned Qty (L)</th>
                <th className="pb-4 px-2">Bay</th>
                <th className="pb-4 px-2">Operator</th>
                <th className="pb-4 px-2">Progress</th>
                <th className="pb-4 px-2">Status</th>
                <th className="pb-4 px-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loadingQueue.map((item) => (
                <tr key={item.id} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-2">
                    <Link to={`/loading/${item.id}`} className="text-xs font-bold text-primary hover:underline">
                      {item.id}
                    </Link>
                  </td>
                  <td className="py-4 px-2 text-xs font-medium text-slate-700">{item.product}</td>
                  <td className="py-4 px-2 text-xs font-bold text-slate-900">{Number(item.planned).toLocaleString()}</td>
                  <td className="py-4 px-2 text-xs font-medium text-slate-600">{item.bay}</td>
                  <td className="py-4 px-2">
                     <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500 uppercase">
                          {item.operator[0]}
                        </div>
                        <span className="text-xs text-slate-600">{item.operator}</span>
                     </div>
                  </td>
                  <td className="py-4 px-2 w-32">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary transition-all duration-500" 
                          style={{ width: `${item.progress}%` }} 
                        />
                      </div>
                      <span className="text-[10px] font-bold text-slate-400">{item.progress}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-2">
                    <span className={`px-2.5 py-1 rounded-lg text-[9px] font-bold border ${statusColors[item.status as keyof typeof statusColors]}`}>
                      {item.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-4 px-2 text-right">
                    <Link
                      to={`/loading/${item.id}/execute`}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                        item.status === 'loading' 
                          ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                          : 'bg-slate-100 text-slate-600 hover:bg-primary hover:text-white'
                      }`}
                    >
                      {item.status === 'loading' ? 'Complete' : 'Start'}
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
