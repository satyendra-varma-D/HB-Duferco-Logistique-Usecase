import { useState } from 'react';
import { ScanLine, LogIn, LogOut } from 'lucide-react';

type Mode = 'checkin' | 'checkout';

export function GateControl() {
  const [mode, setMode] = useState<Mode>('checkin');
  const [tripId, setTripId] = useState('');
  const [tripData, setTripData] = useState<any>(null);

  const handleScan = () => {
    if (tripId) {
      setTripData({
        tripId: tripId,
        vehicle: 'TRK-445',
        driver: 'John Smith',
        product: 'Diesel',
        quantity: '5,000 L',
        transporter: 'Swift Transport',
      });
    }
  };

  const handleCheckIn = () => {
    alert(`Trip ${tripId} checked in successfully!`);
    setTripId('');
    setTripData(null);
  };

  const handleCheckOut = () => {
    alert(`Trip ${tripId} checked out successfully!`);
    setTripId('');
    setTripData(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h2>Gate Control</h2>
        <div className="text-sm text-muted-foreground">
          {new Date().toLocaleString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </div>
      </div>

      {/* Mode Selector */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => setMode('checkin')}
          className={`flex items-center justify-center gap-3 p-4 border-2 rounded transition-colors ${
            mode === 'checkin'
              ? 'border-primary bg-primary/10 text-primary'
              : 'border-border hover:bg-muted'
          }`}
        >
          <LogIn className="w-6 h-6" />
          <span className="font-medium">Gate Check-In</span>
        </button>
        <button
          onClick={() => setMode('checkout')}
          className={`flex items-center justify-center gap-3 p-4 border-2 rounded transition-colors ${
            mode === 'checkout'
              ? 'border-primary bg-primary/10 text-primary'
              : 'border-border hover:bg-muted'
          }`}
        >
          <LogOut className="w-6 h-6" />
          <span className="font-medium">Gate Check-Out</span>
        </button>
      </div>

      {/* Input Section */}
      <div className="bg-card border-2 border-border rounded-lg">
        <div className="px-6 py-4 border-b border-border">
          <h3>{mode === 'checkin' ? 'Check-In Process' : 'Check-Out Process'}</h3>
        </div>
        <div className="p-6 space-y-6">
          {/* Scan Input */}
          <div>
            <label className="block text-sm mb-3">Trip ID / Scan Document</label>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <ScanLine className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground" />
                <input
                  type="text"
                  value={tripId}
                  onChange={(e) => setTripId(e.target.value)}
                  placeholder="Enter or scan Trip ID..."
                  className="w-full pl-14 pr-4 py-4 bg-input border-2 border-border rounded-lg outline-none focus:ring-2 ring-ring text-lg"
                  onKeyDown={(e) => e.key === 'Enter' && handleScan()}
                />
              </div>
              <button
                onClick={handleScan}
                className="px-8 py-4 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors font-medium"
              >
                Scan
              </button>
            </div>
          </div>

          {/* Auto-filled Data */}
          {tripData && (
            <div className="border-t-2 border-border pt-6 space-y-4">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-sm text-muted-foreground mb-2">Trip ID</div>
                  <div className="text-lg font-medium">{tripData.tripId}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-2">Transporter</div>
                  <div className="text-lg font-medium">{tripData.transporter}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-2">Vehicle</div>
                  <div className="text-lg font-medium">{tripData.vehicle}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-2">Driver</div>
                  <div className="text-lg font-medium">{tripData.driver}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-2">Product</div>
                  <div className="text-lg font-medium">{tripData.product}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-2">Quantity</div>
                  <div className="text-lg font-medium">{tripData.quantity}</div>
                </div>
              </div>

              {mode === 'checkin' && (
                <div>
                  <label className="block text-sm mb-2">Gate Selection</label>
                  <select className="w-full px-4 py-3 bg-input border-2 border-border rounded-lg outline-none focus:ring-2 ring-ring text-lg">
                    <option>Gate A - Entry Bay 1</option>
                    <option>Gate A - Entry Bay 2</option>
                    <option>Gate B - Entry Bay 1</option>
                    <option>Gate C - Entry Bay 1</option>
                  </select>
                </div>
              )}

              {/* Large Action Button */}
              <button
                onClick={mode === 'checkin' ? handleCheckIn : handleCheckOut}
                className={`w-full py-6 rounded-lg font-medium text-lg transition-colors ${
                  mode === 'checkin'
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                    : 'bg-[#10B981] text-white hover:bg-[#10B981]/90'
                }`}
              >
                {mode === 'checkin' ? (
                  <span className="flex items-center justify-center gap-3">
                    <LogIn className="w-6 h-6" />
                    Confirm Check-In
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-3">
                    <LogOut className="w-6 h-6" />
                    Approve Exit
                  </span>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-card border border-border rounded">
        <div className="px-4 py-3 border-b border-border">
          <h3>Recent Gate Activity</h3>
        </div>
        <div className="divide-y divide-border">
          {[
            { id: 'TRP-1045', action: 'Check-In', gate: 'Gate A-1', time: '10:00' },
            { id: 'TRP-1044', action: 'Check-Out', gate: 'Gate B-2', time: '09:45' },
            { id: 'TRP-1043', action: 'Check-In', gate: 'Gate A-2', time: '09:30' },
          ].map((activity) => (
            <div key={activity.id} className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-4">
                <div
                  className={`p-2 rounded ${
                    activity.action === 'Check-In' ? 'bg-primary/10 text-primary' : 'bg-[#10B981]/10 text-[#10B981]'
                  }`}
                >
                  {activity.action === 'Check-In' ? <LogIn className="w-5 h-5" /> : <LogOut className="w-5 h-5" />}
                </div>
                <div>
                  <div className="font-medium">{activity.id}</div>
                  <div className="text-sm text-muted-foreground">{activity.gate}</div>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">{activity.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
