import { Link, useParams } from 'react-router';
import { ArrowLeft } from 'lucide-react';

export function LoadingDetail() {
  const { id } = useParams();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/loading" className="p-2 hover:bg-muted rounded transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h2>Loading Details: {id}</h2>
        </div>
        <Link
          to={`/loading/${id}/execute`}
          className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
        >
          Execute Loading
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-4">
          <div className="bg-card border border-border rounded">
            <div className="px-4 py-3 border-b border-border">
              <h3>Trip Information</h3>
            </div>
            <div className="p-4 grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Trip ID</div>
                <Link to={`/trips/${id}`} className="text-primary hover:underline">
                  {id}
                </Link>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Vehicle</div>
                <div className="font-medium">TRK-445</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Driver</div>
                <div className="font-medium">John Smith</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Transporter</div>
                <div className="font-medium">Swift Transport</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Product</div>
                <div className="font-medium">Diesel</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Loading Bay</div>
                <div className="font-medium">Bay 3</div>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded">
            <div className="px-4 py-3 border-b border-border">
              <h3>Loading Quantities</h3>
            </div>
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted/50 p-4 rounded">
                  <div className="text-sm text-muted-foreground mb-2">Planned Quantity</div>
                  <div className="text-2xl font-medium">5,000 L</div>
                </div>
                <div className="bg-muted/50 p-4 rounded">
                  <div className="text-sm text-muted-foreground mb-2">Actual Quantity</div>
                  <div className="text-2xl font-medium text-primary">4,950 L</div>
                </div>
              </div>
              <div className="bg-[#F59E0B]/10 border border-[#F59E0B]/20 text-[#F59E0B] p-4 rounded">
                <div className="font-medium mb-1">Variance Detected</div>
                <div className="text-sm">Actual quantity is 50 L less than planned (-1.0%)</div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-card border border-border rounded">
            <div className="px-4 py-3 border-b border-border">
              <h3>Loading Status</h3>
            </div>
            <div className="p-4 space-y-3">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Status</div>
                <span className="inline-flex items-center px-2 py-1 rounded text-xs border bg-primary/10 text-primary border-primary/20">
                  LOADING
                </span>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Started At</div>
                <div className="font-medium">2026-04-23 10:30</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Operator</div>
                <div className="font-medium">Mike Johnson</div>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded">
            <div className="px-4 py-3 border-b border-border">
              <h3>Equipment</h3>
            </div>
            <div className="p-4 space-y-3">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Loading Arm</div>
                <div className="font-medium">ARM-03</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Meter Reading</div>
                <div className="font-medium">154,950 L</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
