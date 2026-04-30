import { useState } from 'react';
import { 
  Truck, Plus, Search, Filter, MoreHorizontal, 
  Edit, Trash2, Star, Phone, Mail, MapPin, 
  ExternalLink, CheckCircle2, ChevronRight
} from 'lucide-react';
import { SidePanel } from '../ui/SidePanel';
import { TransporterForm } from './TransporterForm';

interface Transporter {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  fleetSize: number;
  rating: number;
  status: 'ACTIVE' | 'INACTIVE';
  joinedDate: string;
}

const initialTransporters: Transporter[] = [
  {
    id: 'T-BE-001',
    name: 'H. Essers',
    email: 'ops@essers.com',
    phone: '+32 89 32 32 32',
    location: 'Genk, Belgium',
    fleetSize: 120,
    rating: 4.8,
    status: 'ACTIVE',
    joinedDate: '2025-01-15'
  },
  {
    id: 'T-BE-002',
    name: 'Van Moer Logistics',
    email: 'dispatch@vanmoer.com',
    phone: '+32 3 253 23 23',
    location: 'Zwijndrecht, Belgium',
    fleetSize: 85,
    rating: 4.5,
    status: 'ACTIVE',
    joinedDate: '2025-03-10'
  },
  {
    id: 'T-BE-003',
    name: 'Katoen Natie',
    email: 'info@katoennatie.com',
    phone: '+32 3 221 68 11',
    location: 'Antwerp, Belgium',
    fleetSize: 200,
    rating: 4.9,
    status: 'ACTIVE',
    joinedDate: '2024-11-20'
  },
  {
    id: 'T-BE-004',
    name: 'Transport Gheys',
    email: 'support@gheys.com',
    phone: '+32 14 56 22 11',
    location: 'Mol, Belgium',
    fleetSize: 60,
    rating: 4.2,
    status: 'ACTIVE',
    joinedDate: '2025-05-02'
  },
  {
    id: 'T-BE-005',
    name: 'Sitra Group',
    email: 'planning@sitra.com',
    phone: '+32 57 22 99 99',
    location: 'Ypres, Belgium',
    fleetSize: 95,
    rating: 4.6,
    status: 'ACTIVE',
    joinedDate: '2025-06-15'
  }
];

export function TransportersList() {
  const [transporters, setTransporters] = useState<Transporter[]>(initialTransporters);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedTransporter, setSelectedTransporter] = useState<Transporter | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');

  const filteredTransporters = transporters.filter(t => {
    const matchesSearch = 
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'All Status' || t.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleAdd = () => {
    setSelectedTransporter(null);
    setIsPanelOpen(true);
  };

  const handleEdit = (transporter: Transporter) => {
    setSelectedTransporter(transporter);
    setIsPanelOpen(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
           <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Transporters Network</h2>
           <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">Manage your logistics transporters and fleet performance</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-white text-xs font-black rounded-2xl shadow-xl shadow-primary/20 hover:shadow-2xl hover:-translate-y-0.5 transition-all uppercase tracking-widest"
        >
          <Plus className="w-4 h-4" />
          Add New Transporter
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
         {[
           { label: 'Total Transporters', value: transporters.length, icon: Truck, color: 'text-blue-500', bg: 'bg-blue-50' },
           { label: 'Active Fleets', value: transporters.filter(t => t.status === 'ACTIVE').length, icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50' },
           { label: 'Avg Rating', value: '4.7', icon: Star, color: 'text-amber-500', bg: 'bg-amber-50' },
           { label: 'Total Vehicles', value: transporters.reduce((acc, t) => acc + t.fleetSize, 0), icon: ExternalLink, color: 'text-indigo-500', bg: 'bg-indigo-50' },
         ].map((stat, i) => (
           <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
                 <stat.icon className="w-6 h-6" />
              </div>
              <div>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                 <p className="text-xl font-black text-slate-900">{stat.value}</p>
              </div>
           </div>
         ))}
      </div>

      {/* Main Content */}
      <div className="bg-white border border-slate-100 rounded-[32px] overflow-hidden shadow-sm">
        {/* Table Header / Filters */}
         <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
           <div className="relative group flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder="Search by name, location or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-primary/20 transition-all text-xs font-bold"
              />
           </div>
           <div className="flex items-center gap-3">
              <div className="relative">
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white text-xs font-bold text-slate-600 appearance-none min-w-[140px]"
                >
                  <option>All Status</option>
                  <option value="ACTIVE">Active</option>
                  <option value="INACTIVE">Inactive</option>
                </select>
                <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none rotate-90" />
              </div>
              <button className="p-3 border border-slate-100 rounded-2xl hover:bg-slate-50 text-slate-400 transition-all">
                <Filter className="w-4 h-4" />
              </button>
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-400 text-[10px] font-black uppercase tracking-widest border-b border-slate-50">
                <th className="px-8 py-5">Transporter Name</th>
                <th className="px-8 py-5">Contact Details</th>
                <th className="px-8 py-5">Location</th>
                <th className="px-8 py-5">Fleet & Rating</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredTransporters.map((transporter) => (
                <tr key={transporter.id} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-primary group-hover:bg-primary/10 transition-colors">
                          <Truck className="w-6 h-6" />
                       </div>
                       <div>
                          <div className="text-sm font-black text-slate-900 leading-tight">{transporter.name}</div>
                          <div className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">{transporter.id}</div>
                       </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="space-y-1.5">
                       <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                          <Mail className="w-3.5 h-3.5 text-slate-300" />
                          {transporter.email}
                       </div>
                       <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-400">
                          <Phone className="w-3.5 h-3.5 text-slate-300" />
                          {transporter.phone}
                       </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                       <MapPin className="w-3.5 h-3.5 text-slate-300" />
                       {transporter.location}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="space-y-2">
                       <div className="flex items-center gap-2">
                          <span className="text-xs font-black text-slate-900">{transporter.fleetSize}</span>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Vehicles</span>
                       </div>
                       <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                          <span className="text-xs font-black text-slate-900">{transporter.rating}</span>
                       </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                      transporter.status === 'ACTIVE' 
                        ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                        : 'bg-slate-50 text-slate-400 border-slate-200'
                    }`}>
                      {transporter.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                       <button 
                         onClick={() => handleEdit(transporter)}
                         className="p-2.5 text-slate-400 hover:text-primary hover:bg-white rounded-xl shadow-sm border border-transparent hover:border-slate-100 transition-all"
                       >
                          <Edit className="w-4 h-4" />
                       </button>
                       <button className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-white rounded-xl shadow-sm border border-transparent hover:border-slate-100 transition-all">
                          <Trash2 className="w-4 h-4" />
                       </button>
                       <button className="p-2.5 text-slate-400 hover:text-slate-900 hover:bg-white rounded-xl shadow-sm border border-transparent hover:border-slate-100 transition-all">
                          <MoreHorizontal className="w-4 h-4" />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <SidePanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        title={selectedTransporter ? 'Edit Transporter' : 'Add New Transporter'}
      >
        <TransporterForm 
          initialData={selectedTransporter} 
          onClose={() => setIsPanelOpen(false)} 
        />
      </SidePanel>
    </div>
  );
}
