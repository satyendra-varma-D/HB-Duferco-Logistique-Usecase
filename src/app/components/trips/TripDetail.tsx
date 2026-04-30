import { Link, useParams } from 'react-router';
import { ArrowLeft, Edit, CheckCircle, Clock, Circle } from 'lucide-react';

const timelineSteps = [
  { id: 1, label: 'Waiting Approval', status: 'completed', time: '2026-04-23 08:30' },
  { id: 2, label: 'Accepted', status: 'completed', time: '2026-04-23 09:15' },
  { id: 3, label: 'Gate-In', status: 'completed', time: '2026-04-23 10:00' },
  { id: 4, label: 'Loading', status: 'active', time: '2026-04-23 10:30' },
  { id: 5, label: 'Gate-Out', status: 'pending', time: null },
  { id: 6, label: 'In Transit', status: 'pending', time: null },
  { id: 7, label: 'Delivered', status: 'pending', time: null },
];

export function TripDetail() {
  const { id } = useParams();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/trips" className="p-2 hover:bg-muted rounded transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h2>Trip: {id}</h2>
            <div className="text-sm text-muted-foreground mt-1">
              H. Essers • 1-ABC-234
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to={`/trips/${id}/edit`}
            className="flex items-center gap-2 px-4 py-2 border border-border rounded hover:bg-muted transition-colors"
          >
            <Edit className="w-4 h-4" />
            Edit Trip
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Left: Summary */}
        <div className="space-y-4">
          <div className="bg-card border border-border rounded">
            <div className="px-4 py-3 border-b border-border">
              <h3>Trip Summary</h3>
            </div>
            <div className="p-4 space-y-3">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Order ID</div>
                <Link to="/orders/ORD-BE-1001" className="text-primary hover:underline">
                  ORD-BE-1001
                </Link>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Customer</div>
                <div className="font-medium">ArcelorMittal Gent</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Product</div>
                <div className="font-medium">Steel Coils</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Quantity</div>
                <div className="font-medium">25 MT</div>
              </div>
              <div className="border-t border-border pt-3">
                <div className="text-sm text-muted-foreground mb-1">From</div>
                <div className="font-medium">Antwerp Port Terminal, Bay 3</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">To</div>
                <div className="font-medium">ArcelorMittal Gent</div>
              </div>
              <div className="border-t border-border pt-3">
                <div className="text-sm text-muted-foreground mb-1">Transporter</div>
                <div className="font-medium">H. Essers</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Driver</div>
                <div className="font-medium">Jean Dupont</div>
                <div className="text-sm text-muted-foreground">+32 470 12 34 56</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Vehicle</div>
                <div className="font-medium">1-ABC-234</div>
                <div className="text-sm text-muted-foreground">Type: Flatbed</div>
              </div>
            </div>
          </div>
        </div>

        {/* Center: Timeline */}
        <div className="col-span-2 space-y-4">
          <div className="bg-card border border-border rounded">
            <div className="px-4 py-3 border-b border-border">
              <h3>Trip Progress</h3>
            </div>
            <div className="p-6">
              <div className="relative">
                {timelineSteps.map((step, index) => {
                  const isLast = index === timelineSteps.length - 1;
                  return (
                    <div key={step.id} className="relative pb-8 last:pb-0">
                      {!isLast && (
                        <div
                          className={`absolute left-[11px] top-6 w-0.5 h-full ${
                            step.status === 'completed' ? 'bg-[#10B981]' : 'bg-border'
                          }`}
                        />
                      )}
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                            step.status === 'completed'
                              ? 'bg-[#10B981] text-white'
                              : step.status === 'active'
                              ? 'bg-primary text-white'
                              : 'bg-muted border-2 border-border'
                          }`}
                        >
                          {step.status === 'completed' && <CheckCircle className="w-4 h-4" />}
                          {step.status === 'active' && <Clock className="w-4 h-4" />}
                          {step.status === 'pending' && <Circle className="w-3 h-3" />}
                        </div>
                        <div className="flex-1 pt-0.5">
                          <div className={`font-medium ${step.status === 'pending' ? 'text-muted-foreground' : ''}`}>
                            {step.label}
                          </div>
                          {step.time && (
                            <div className="text-sm text-muted-foreground mt-1">
                              {step.time}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Context Actions */}
          <div className="bg-card border border-border rounded">
            <div className="px-4 py-3 border-b border-border">
              <h3>Actions</h3>
            </div>
            <div className="p-4 flex flex-wrap gap-2">
              <Link
                to={`/loading/${id}/execute`}
                className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
              >
                Complete Loading
              </Link>
              <Link
                to={`/gate?trip=${id}`}
                className="px-4 py-2 border border-border rounded hover:bg-muted transition-colors"
              >
                Process Gate-Out
              </Link>
              <Link
                to={`/documents?trip=${id}`}
                className="px-4 py-2 border border-border rounded hover:bg-muted transition-colors"
              >
                View Documents
              </Link>
              <button className="px-4 py-2 border border-[#EF4444] text-[#EF4444] rounded hover:bg-[#EF4444]/10 transition-colors">
                Report Issue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
