import { useState } from 'react';
import { X, Search, Star, Truck, Shield, Check } from 'lucide-react';
import { Transporter } from '../../types/order';

interface OrderAssignModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAssign: (transporter: Transporter) => void;
  currentTransporterId?: string;
}

const mockTransporters: Transporter[] = [
  { id: 'T-101', name: 'Global Logistics Solutions', email: 'contact@global-logistics.com', phone: '+1 800-456-7890', rating: 4.8, vehicles: 45 },
  { id: 'T-102', name: 'Express Freight Co.', email: 'ops@express-freight.com', phone: '+1 888-123-4567', rating: 4.5, vehicles: 28 },
  { id: 'T-103', name: 'Swift Roadways', email: 'swift@roadways.com', phone: '+1 855-999-0000', rating: 4.2, vehicles: 12 },
  { id: 'T-104', name: 'Prime Carriers', email: 'info@primecarriers.com', phone: '+1 877-333-4444', rating: 4.9, vehicles: 60 },
];

export function OrderAssignModal({ isOpen, onClose, onAssign, currentTransporterId }: OrderAssignModalProps) {
  const [search, setSearch] = useState('');
  
  if (!isOpen) return null;

  const filteredTransporters = mockTransporters.filter(t => 
    t.name.toLowerCase().includes(search.toLowerCase()) || 
    t.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-xl rounded-[32px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Assign Transporter</h3>
              <p className="text-sm font-medium text-slate-400 mt-1">Select a partner to handle this delivery</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name or ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all text-sm font-medium"
            />
          </div>

          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {filteredTransporters.map((t) => (
              <button
                key={t.id}
                onClick={() => onAssign(t)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all group ${
                  currentTransporterId === t.id
                    ? 'border-primary bg-primary/5'
                    : 'border-slate-50 bg-slate-50/50 hover:border-slate-200 hover:bg-white'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                  currentTransporterId === t.id ? 'bg-primary text-white' : 'bg-white text-slate-400 group-hover:text-primary shadow-sm border border-slate-100'
                }`}>
                  <Truck className="w-6 h-6" />
                </div>
                
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900">{t.name}</span>
                    {t.rating >= 4.8 && (
                      <div className="flex items-center gap-0.5 px-1.5 py-0.5 bg-amber-50 text-amber-600 rounded text-[9px] font-black uppercase tracking-wider">
                        <Shield className="w-2.5 h-2.5" /> Top Rated
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" /> {t.rating}
                    </div>
                    <div className="text-[10px] font-bold text-slate-400">•</div>
                    <div className="text-[10px] font-bold text-slate-400">{t.vehicles} Vehicles</div>
                    <div className="text-[10px] font-bold text-slate-400">•</div>
                    <div className="text-[10px] font-bold text-slate-400">{t.id}</div>
                  </div>
                </div>

                {currentTransporterId === t.id ? (
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20">
                    <Check className="w-4 h-4" />
                  </div>
                ) : (
                  <div className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-[11px] font-bold text-slate-600 opacity-0 group-hover:opacity-100 transition-all">
                    Assign
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <p className="text-[11px] text-slate-400 font-medium">Selected transporter will receive an immediate notification.</p>
          <button 
            onClick={onClose}
            className="px-6 py-2.5 text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
