import { Link, useParams, useNavigate } from 'react-router';
import { ArrowLeft, Save, X, Info } from 'lucide-react';
import { OrderType } from '../../types/order';

interface OrderFormProps {
  onClose?: () => void;
  hideTitle?: boolean;
}

export function OrderForm({ onClose, hideTitle }: OrderFormProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id && id !== 'new');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onClose) {
      onClose();
    } else {
      navigate('/orders');
    }
  };

  return (
    <div className="space-y-6">
      {!hideTitle && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/orders" className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
              <ArrowLeft className="w-5 h-5 text-slate-500" />
            </Link>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              {isEdit ? `Edit Order: ${id}` : 'Create Manual Order'}
            </h2>
          </div>
        </div>
      )}

      <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl flex gap-3">
        <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
        <p className="text-xs font-medium text-blue-700 leading-relaxed">
          Orders created here are marked as <span className="font-bold">MANUAL</span>. System-generated orders (API/EDT) are automatically ingested and displayed in the main list.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">Customer Name *</label>
              <input
                type="text"
                required
                placeholder="Enter customer name"
                defaultValue={isEdit ? 'ABC Logistics' : ''}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all text-sm font-bold shadow-sm"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">Contact Number *</label>
              <input
                type="tel"
                required
                placeholder="+1 234..."
                defaultValue={isEdit ? '+1 234 567 8900' : ''}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all text-sm font-bold shadow-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">Product *</label>
              <select
                required
                defaultValue={isEdit ? 'diesel' : ''}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all text-sm font-bold appearance-none shadow-sm"
              >
                <option value="">Select Product</option>
                <option value="diesel">Diesel</option>
                <option value="petrol">Petrol</option>
                <option value="kerosene">Kerosene</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">Quantity (Liters) *</label>
              <input
                type="number"
                required
                placeholder="0.00"
                defaultValue={isEdit ? '15000' : ''}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all text-sm font-bold shadow-sm"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">Delivery Deadline *</label>
            <input
              type="datetime-local"
              required
              defaultValue={isEdit ? '2026-04-25T18:00' : ''}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all text-sm font-bold shadow-sm"
            />
          </div>

          <div className="pt-4 border-t border-slate-100">
            <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-widest mb-4 px-1">Logistics Routes</h4>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">Pickup Location *</label>
                <input
                  type="text"
                  required
                  defaultValue={isEdit ? 'Terminal A, Bay 3' : ''}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all text-sm font-bold shadow-sm"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">Delivery Location *</label>
                <input
                  type="text"
                  required
                  defaultValue={isEdit ? 'ABC Logistics Depot' : ''}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all text-sm font-bold shadow-sm"
                />
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">Special Instructions</label>
            <textarea
              rows={3}
              placeholder="Any specific requirements..."
              defaultValue={isEdit ? 'Handle with care. Ensure proper sealing.' : ''}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all text-sm font-bold resize-none shadow-sm"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 pt-6 sticky bottom-0 bg-white border-t border-slate-50">
          <button
            type="submit"
            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-primary text-white text-sm font-black rounded-2xl shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-0.5 transition-all uppercase tracking-wider"
          >
            <Save className="w-5 h-5" />
            {isEdit ? 'Update Order' : 'Create Order'}
          </button>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-4 border-2 border-slate-100 text-slate-600 text-sm font-black rounded-2xl hover:bg-slate-50 transition-all uppercase tracking-wider"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
