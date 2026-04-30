import { Link, useParams, useNavigate } from 'react-router';
import { ArrowLeft, Save } from 'lucide-react';

export function TripForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id && id !== 'new');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/trips');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/trips" className="p-2 hover:bg-muted rounded transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h2>{isEdit ? `Edit Trip: ${id}` : 'Create New Trip'}</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-3xl">
        <div className="bg-card border border-border rounded">
          <div className="px-4 py-3 border-b border-border">
            <h3>Trip Information</h3>
          </div>
          <div className="p-4 space-y-4">
            <div>
              <label className="block text-sm mb-2">Link to Order *</label>
              <select
                required
                defaultValue={isEdit ? 'ORD-2401' : ''}
                className="w-full px-3 py-2 bg-input border border-border rounded outline-none focus:ring-2 ring-ring"
              >
                <option value="">Select Order</option>
                <option value="ORD-2401">ORD-2401 - ABC Logistics - Steel Coils 25 MT</option>
                <option value="ORD-2402">ORD-2402 - XYZ Transport - Steel Bars 18 MT</option>
                <option value="ORD-2403">ORD-2403 - Global Freight - Steel Plates 30 MT</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-2">Quantity (MT) *</label>
                <input
                  type="number"
                  required
                  defaultValue={isEdit ? '25' : ''}
                  className="w-full px-3 py-2 bg-input border border-border rounded outline-none focus:ring-2 ring-ring"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Scheduled Date *</label>
                <input
                  type="datetime-local"
                  required
                  defaultValue={isEdit ? '2026-04-23T08:30' : ''}
                  className="w-full px-3 py-2 bg-input border border-border rounded outline-none focus:ring-2 ring-ring"
                />
              </div>
            </div>

            <div className="border-t border-border pt-4 mt-4">
              <h4 className="mb-4">Transporter Details</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-2">Transporter Company *</label>
                  <select
                    required
                    defaultValue={isEdit ? 'swift' : ''}
                    className="w-full px-3 py-2 bg-input border border-border rounded outline-none focus:ring-2 ring-ring"
                  >
                    <option value="">Select Transporter</option>
                    <option value="swift">Swift Transport</option>
                    <option value="quick">Quick Haul</option>
                    <option value="metro">Metro Logistics</option>
                    <option value="fast">Fast Freight</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-2">Driver Name *</label>
                    <input
                      type="text"
                      required
                      defaultValue={isEdit ? 'John Smith' : ''}
                      className="w-full px-3 py-2 bg-input border border-border rounded outline-none focus:ring-2 ring-ring"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Driver Contact *</label>
                    <input
                      type="tel"
                      required
                      defaultValue={isEdit ? '+1 555 0123' : ''}
                      className="w-full px-3 py-2 bg-input border border-border rounded outline-none focus:ring-2 ring-ring"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-2">Vehicle ID *</label>
                    <input
                      type="text"
                      required
                      defaultValue={isEdit ? 'TRK-445' : ''}
                      className="w-full px-3 py-2 bg-input border border-border rounded outline-none focus:ring-2 ring-ring"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">License Plate *</label>
                    <input
                      type="text"
                      required
                      defaultValue={isEdit ? 'ABC-1234' : ''}
                      className="w-full px-3 py-2 bg-input border border-border rounded outline-none focus:ring-2 ring-ring"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm mb-2">Notes</label>
              <textarea
                rows={3}
                className="w-full px-3 py-2 bg-input border border-border rounded outline-none focus:ring-2 ring-ring resize-none"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-6">
          <button
            type="submit"
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
          >
            <Save className="w-4 h-4" />
            {isEdit ? 'Update Trip' : 'Create Trip'}
          </button>
          <Link
            to="/trips"
            className="px-4 py-2 border border-border rounded hover:bg-muted transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
