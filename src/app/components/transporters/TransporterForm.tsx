import { useState } from 'react';
import {
  Building2, Mail, Phone, MapPin,
  Truck, Star, AlertCircle, Save, X
} from 'lucide-react';

interface TransporterFormProps {
  initialData?: any;
  onClose: () => void;
}

export function TransporterForm({ initialData, onClose }: TransporterFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    location: initialData?.location || '',
    fleetSize: initialData?.fleetSize || '',
    rating: initialData?.rating || '4.5',
    status: initialData?.status || 'ACTIVE'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate save
    alert(`Transporter ${formData.name} saved successfully!`);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pb-20">
      <div className="space-y-6">
        {/* Company Identity */}
        <div className="space-y-4">
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Business Identity</h4>
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-900 uppercase tracking-widest px-1">Company Name</label>
              <div className="relative group">
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-primary transition-colors" />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Swift Transport NV"
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all text-xs font-bold"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-4 pt-4">
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Communication Details</h4>
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-900 uppercase tracking-widest px-1">Official Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-primary transition-colors" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="contact@company.com"
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all text-xs font-bold"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-900 uppercase tracking-widest px-1">Phone Number</label>
              <div className="relative group">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-primary transition-colors" />
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+32 0 000 0000"
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all text-xs font-bold"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Location & Fleet */}
        <div className="space-y-4 pt-4">
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Logistics Capacity</h4>
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-900 uppercase tracking-widest px-1">HQ Location</label>
              <div className="relative group">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-primary transition-colors" />
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="City, Country"
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all text-xs font-bold"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-900 uppercase tracking-widest px-1">Fleet Size</label>
                <div className="relative group">
                  <Truck className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-primary transition-colors" />
                  <input
                    type="number"
                    required
                    value={formData.fleetSize}
                    onChange={(e) => setFormData({ ...formData, fleetSize: e.target.value })}
                    placeholder="Vehicles"
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all text-xs font-bold"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-900 uppercase tracking-widest px-1">Initial Rating</label>
                <div className="relative group">
                  <Star className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-primary transition-colors" />
                  <select
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all text-xs font-bold appearance-none"
                  >
                    {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}.0 Stars</option>)}
                    <option value="4.5">4.5 Stars</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="space-y-4 pt-4">
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Operational Status</h4>
          <div className="flex gap-3">
            {['ACTIVE', 'INACTIVE'].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setFormData({ ...formData, status: s })}
                className={`flex-1 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all ${formData.status === s
                  ? 'bg-slate-900 border-slate-900 text-white shadow-lg'
                  : 'bg-white border-slate-100 text-slate-400 hover:bg-slate-50'
                  }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 left-0 right-0 bg-white border-t border-slate-100 p-6 -mx-6 -mb-6 flex items-center gap-4 z-20 mt-12">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 py-4 bg-slate-50 text-slate-400 text-[10px] font-black rounded-2xl hover:bg-slate-100 transition-all uppercase tracking-widest"
        >
          Discard Changes
        </button>
        <button
          type="submit"
          className="flex-[2] px-8 py-4 bg-primary text-white text-[10px] font-black rounded-2xl shadow-xl shadow-primary/20 hover:shadow-2xl hover:-translate-y-0.5 transition-all uppercase tracking-widest flex items-center justify-center gap-3"
        >
          <Save className="w-4 h-4" />
          {initialData ? 'Update Transporter' : 'Register Transporter'}
        </button>
      </div>
    </form>
  );
}
