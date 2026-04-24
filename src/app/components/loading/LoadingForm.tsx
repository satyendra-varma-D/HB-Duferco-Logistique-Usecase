import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router';
import { ArrowLeft, Save, AlertTriangle } from 'lucide-react';

export function LoadingForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [plannedQty] = useState(5000);
  const [actualQty, setActualQty] = useState('');
  const variance = actualQty ? ((Number(actualQty) - plannedQty) / plannedQty * 100) : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/loading/${id}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to={`/loading/${id}`} className="p-2 hover:bg-muted rounded transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h2>Execute Loading: {id}</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-3xl">
        <div className="bg-card border border-border rounded">
          <div className="px-4 py-3 border-b border-border">
            <h3>Loading Information</h3>
          </div>
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted/50 p-4 rounded">
                <div className="text-sm text-muted-foreground mb-2">Trip ID</div>
                <div className="text-lg font-medium">{id}</div>
              </div>
              <div className="bg-muted/50 p-4 rounded">
                <div className="text-sm text-muted-foreground mb-2">Product</div>
                <div className="text-lg font-medium">Diesel</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-2">Loading Bay *</label>
                <select
                  required
                  className="w-full px-3 py-2 bg-input border border-border rounded outline-none focus:ring-2 ring-ring"
                >
                  <option value="">Select Bay</option>
                  <option value="bay1">Bay 1</option>
                  <option value="bay2">Bay 2</option>
                  <option value="bay3" selected>Bay 3</option>
                  <option value="bay4">Bay 4</option>
                  <option value="bay5">Bay 5</option>
                </select>
              </div>
              <div>
                <label className="block text-sm mb-2">Loading Arm *</label>
                <select
                  required
                  className="w-full px-3 py-2 bg-input border border-border rounded outline-none focus:ring-2 ring-ring"
                >
                  <option value="">Select Arm</option>
                  <option value="arm01">ARM-01</option>
                  <option value="arm02">ARM-02</option>
                  <option value="arm03" selected>ARM-03</option>
                  <option value="arm04">ARM-04</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-2">Operator Name *</label>
                <input
                  type="text"
                  required
                  defaultValue="Mike Johnson"
                  className="w-full px-3 py-2 bg-input border border-border rounded outline-none focus:ring-2 ring-ring"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Start Time *</label>
                <input
                  type="datetime-local"
                  required
                  defaultValue="2026-04-23T10:30"
                  className="w-full px-3 py-2 bg-input border border-border rounded outline-none focus:ring-2 ring-ring"
                />
              </div>
            </div>

            <div className="border-t border-border pt-4 mt-4">
              <h4 className="mb-4">Quantity Recording</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-muted/50 p-4 rounded">
                  <div className="text-sm text-muted-foreground mb-2">Planned Quantity</div>
                  <div className="text-2xl font-medium">{plannedQty.toLocaleString()} L</div>
                </div>
                <div>
                  <label className="block text-sm mb-2">Actual Quantity (L) *</label>
                  <input
                    type="number"
                    required
                    value={actualQty}
                    onChange={(e) => setActualQty(e.target.value)}
                    placeholder="0"
                    className="w-full px-3 py-3 bg-input border border-border rounded outline-none focus:ring-2 ring-ring text-lg"
                  />
                </div>
                <div className="bg-muted/50 p-4 rounded">
                  <div className="text-sm text-muted-foreground mb-2">Variance</div>
                  <div className={`text-2xl font-medium ${variance !== 0 ? (variance > 0 ? 'text-[#10B981]' : 'text-[#EF4444]') : ''}`}>
                    {actualQty ? `${variance > 0 ? '+' : ''}${variance.toFixed(1)}%` : '--'}
                  </div>
                </div>
              </div>

              {actualQty && Math.abs(variance) > 2 && (
                <div className="bg-[#EF4444]/10 border border-[#EF4444]/20 text-[#EF4444] p-4 rounded flex items-start gap-3 mt-4">
                  <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium mb-1">High Variance Warning</div>
                    <div className="text-sm">
                      Variance exceeds acceptable threshold (±2%). Please verify the measurement before submitting.
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-2">Meter Start Reading</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 bg-input border border-border rounded outline-none focus:ring-2 ring-ring"
                  placeholder="150000"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Meter End Reading</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 bg-input border border-border rounded outline-none focus:ring-2 ring-ring"
                  placeholder="155000"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm mb-2">Loading Notes</label>
              <textarea
                rows={3}
                className="w-full px-3 py-2 bg-input border border-border rounded outline-none focus:ring-2 ring-ring resize-none"
                placeholder="Any observations or issues during loading..."
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
            Complete Loading
          </button>
          <Link
            to={`/loading/${id}`}
            className="px-4 py-2 border border-border rounded hover:bg-muted transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
