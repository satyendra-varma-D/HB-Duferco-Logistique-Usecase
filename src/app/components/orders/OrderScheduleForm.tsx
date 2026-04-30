import { useState } from 'react';
import { Truck, User, Clock, Calendar, Package, Save, AlertCircle } from 'lucide-react';
import { Order } from '../../types/order';

interface OrderScheduleFormProps {
  order: Order;
  onSubmit: (scheduleData: {
    truckNumber: string;
    driverName: string;
    pickupTimeSlot: string;
    pickupQuantity: string;
  }) => void;
  onCancel: () => void;
}

export function OrderScheduleForm({ order, onSubmit, onCancel }: OrderScheduleFormProps) {
  const [formData, setFormData] = useState({
    truckNumber: '',
    driverName: '',
    pickupDate: '',
    pickupTime: '',
    pickupQuantity: order.quantity.replace(/[^0-9.]/g, ''),
  });

  const [error, setError] = useState<string | null>(null);
  const maxQuantity = parseFloat(order.quantity.replace(/[^0-9.]/g, ''));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredQuantity = parseFloat(formData.pickupQuantity);

    if (enteredQuantity > maxQuantity) {
      setError(`Quantity cannot exceed the total order volume (${order.quantity})`);
      return;
    }

    setError(null);
    onSubmit({
      truckNumber: formData.truckNumber,
      driverName: formData.driverName,
      pickupTimeSlot: `${formData.pickupDate} ${formData.pickupTime}`,
      pickupQuantity: `${formData.pickupQuantity} MT`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-indigo-50 border border-indigo-100 p-5 rounded-[24px]">
        <h4 className="text-xs font-black text-indigo-900 uppercase tracking-widest mb-1">Order Summary</h4>
        <div className="flex justify-between items-end">
          <div>
            <div className="text-lg font-black text-indigo-900">{order.id}</div>
            <div className="text-xs font-bold text-indigo-600">{order.customerName}</div>
          </div>
          <div className="text-right">
            <div className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Total Quantity</div>
            <div className="text-lg font-black text-indigo-900">{order.quantity}</div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1 flex items-center gap-2">
              <Truck className="w-3.5 h-3.5" />
              Truck Number
            </label>
            <input
              type="text"
              required
              placeholder="e.g. TN-45-AX-1234"
              value={formData.truckNumber}
              onChange={(e) => setFormData({ ...formData, truckNumber: e.target.value })}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all text-sm font-bold shadow-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1 flex items-center gap-2">
              <User className="w-3.5 h-3.5" />
              Driver Name
            </label>
            <input
              type="text"
              required
              placeholder="Enter driver's full name"
              value={formData.driverName}
              onChange={(e) => setFormData({ ...formData, driverName: e.target.value })}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all text-sm font-bold shadow-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1 flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5" />
                Pickup Date
              </label>
              <input
                type="date"
                required
                value={formData.pickupDate}
                onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all text-sm font-bold shadow-sm"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5" />
                Time Slot
              </label>
              <input
                type="time"
                required
                value={formData.pickupTime}
                onChange={(e) => setFormData({ ...formData, pickupTime: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all text-sm font-bold shadow-sm"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1 flex items-center gap-2">
              <Package className="w-3.5 h-3.5" />
              Pickup Quantity (MT)
            </label>
            <input
              type="number"
              required
              value={formData.pickupQuantity}
              onChange={(e) => {
                setFormData({ ...formData, pickupQuantity: e.target.value });
                if (error) setError(null);
              }}
              className={`w-full px-4 py-3 bg-slate-50 border rounded-2xl outline-none focus:bg-white focus:ring-4 transition-all text-sm font-bold shadow-sm ${
                error 
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500/5' 
                  : 'border-slate-100 focus:border-primary/20 focus:ring-primary/5'
              }`}
            />
            {error && (
              <div className="flex items-center gap-1.5 mt-2 px-1 text-[10px] font-black text-red-500 uppercase tracking-widest animate-in slide-in-from-top-1 duration-200">
                <AlertCircle className="w-3 h-3" />
                {error}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 pt-6 sticky bottom-0 bg-white border-t border-slate-50">
          <button
            type="submit"
            disabled={!!error}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 text-white text-sm font-black rounded-2xl shadow-lg transition-all uppercase tracking-wider ${
              error ? 'bg-slate-300 shadow-none cursor-not-allowed' : 'bg-primary shadow-primary/20 hover:shadow-xl hover:-translate-y-0.5'
            }`}
          >
            <Save className="w-5 h-5" />
            Submit Schedule
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-4 border-2 border-slate-100 text-slate-600 text-sm font-black rounded-2xl hover:bg-slate-50 transition-all uppercase tracking-wider"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
