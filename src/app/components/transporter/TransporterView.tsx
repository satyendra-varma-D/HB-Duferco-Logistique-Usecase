import { Link } from 'react-router';
import { Check, X, Clock } from 'lucide-react';

const pendingTrips = [
  { id: 'TRP-1048', customer: 'ABC Logistics', product: 'Diesel', quantity: '5000 L', pickup: 'Terminal A', delivery: 'ABC Depot', date: '2026-04-24' },
  { id: 'TRP-1049', customer: 'XYZ Transport', product: 'Petrol', quantity: '8000 L', pickup: 'Terminal B', delivery: 'XYZ Warehouse', date: '2026-04-24' },
  { id: 'TRP-1050', customer: 'Global Freight', product: 'Diesel', quantity: '12000 L', pickup: 'Terminal A', delivery: 'Global Station', date: '2026-04-25' },
];

const myTrips = [
  { id: 'TRP-1045', status: 'In Progress', stage: 'Loading', customer: 'ABC Logistics' },
  { id: 'TRP-1042', status: 'Completed', stage: 'Delivered', customer: 'Metro Cargo' },
  { id: 'TRP-1040', status: 'Approved', stage: 'Waiting', customer: 'Quick Ship Ltd' },
];

export function TransporterView() {
  const handleAccept = (tripId: string) => {
    alert(`Trip ${tripId} accepted!`);
  };

  const handleReject = (tripId: string) => {
    alert(`Trip ${tripId} rejected!`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2>Transporter Portal</h2>
        <div className="text-sm text-muted-foreground mt-1">Swift Transport</div>
      </div>

      {/* Pending Assignments */}
      <div className="bg-card border border-border rounded">
        <div className="px-4 py-3 border-b border-border flex items-center justify-between">
          <h3>Pending Trip Assignments</h3>
          <span className="text-sm text-muted-foreground">{pendingTrips.length} waiting for response</span>
        </div>
        <div className="divide-y divide-border">
          {pendingTrips.map((trip) => (
            <div key={trip.id} className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="font-medium mb-1">{trip.id}</div>
                  <div className="text-sm text-muted-foreground">{trip.customer}</div>
                </div>
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs border bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20">
                  <Clock className="w-3 h-3" />
                  PENDING
                </span>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-4 text-sm">
                <div>
                  <div className="text-muted-foreground mb-1">Product</div>
                  <div className="font-medium">{trip.product}</div>
                </div>
                <div>
                  <div className="text-muted-foreground mb-1">Quantity</div>
                  <div className="font-medium">{trip.quantity}</div>
                </div>
                <div>
                  <div className="text-muted-foreground mb-1">Pickup</div>
                  <div className="font-medium">{trip.pickup}</div>
                </div>
                <div>
                  <div className="text-muted-foreground mb-1">Delivery</div>
                  <div className="font-medium">{trip.delivery}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleAccept(trip.id)}
                  className="flex items-center gap-2 px-4 py-2 bg-[#10B981] text-white rounded hover:bg-[#10B981]/90 transition-colors"
                >
                  <Check className="w-4 h-4" />
                  Accept Trip
                </button>
                <button
                  onClick={() => handleReject(trip.id)}
                  className="flex items-center gap-2 px-4 py-2 border border-border rounded hover:bg-muted transition-colors"
                >
                  <X className="w-4 h-4" />
                  Reject
                </button>
                <Link
                  to={`/trips/${trip.id}`}
                  className="px-4 py-2 text-sm text-primary hover:underline"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* My Trips */}
      <div className="bg-card border border-border rounded">
        <div className="px-4 py-3 border-b border-border">
          <h3>My Trips</h3>
        </div>
        <div className="overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium">Trip ID</th>
                <th className="text-left px-4 py-3 text-sm font-medium">Customer</th>
                <th className="text-left px-4 py-3 text-sm font-medium">Current Stage</th>
                <th className="text-left px-4 py-3 text-sm font-medium">Status</th>
                <th className="text-left px-4 py-3 text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {myTrips.map((trip) => (
                <tr key={trip.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3">
                    <Link to={`/trips/${trip.id}`} className="text-primary hover:underline">
                      {trip.id}
                    </Link>
                  </td>
                  <td className="px-4 py-3">{trip.customer}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{trip.stage}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-1 rounded text-xs border ${
                      trip.status === 'Completed' ? 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20' :
                      trip.status === 'In Progress' ? 'bg-primary/10 text-primary border-primary/20' :
                      'bg-[#3B82F6]/10 text-[#3B82F6] border-[#3B82F6]/20'
                    }`}>
                      {trip.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      to={`/trips/${trip.id}`}
                      className="text-sm text-primary hover:underline"
                    >
                      View
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
