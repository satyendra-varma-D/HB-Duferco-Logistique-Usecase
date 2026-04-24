import { BarChart3, Download, Calendar } from 'lucide-react';

const reportTypes = [
  { name: 'Daily Operations Summary', desc: 'Overview of all trips, loading, and gate activities' },
  { name: 'Monthly Performance Report', desc: 'KPIs, delays, and efficiency metrics' },
  { name: 'Transporter Performance', desc: 'Analysis by transporter company' },
  { name: 'Product Volume Report', desc: 'Breakdown by product type and quantity' },
  { name: 'Variance Analysis', desc: 'Loading planned vs actual quantities' },
  { name: 'Gate Activity Log', desc: 'Check-in and check-out records' },
];

export function Reports() {
  return (
    <div className="space-y-6">
      <div>
        <h2>Reports & Analytics</h2>
      </div>

      {/* Report Generator */}
      <div className="bg-card border border-border rounded">
        <div className="px-4 py-3 border-b border-border">
          <h3>Generate Report</h3>
        </div>
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm mb-2">Report Type</label>
              <select className="w-full px-3 py-2 bg-input border border-border rounded outline-none focus:ring-2 ring-ring">
                <option>Select Report Type</option>
                {reportTypes.map((type) => (
                  <option key={type.name} value={type.name}>{type.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm mb-2">Start Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="date"
                  defaultValue="2026-04-01"
                  className="w-full pl-9 pr-3 py-2 bg-input border border-border rounded outline-none focus:ring-2 ring-ring"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm mb-2">End Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="date"
                  defaultValue="2026-04-23"
                  className="w-full pl-9 pr-3 py-2 bg-input border border-border rounded outline-none focus:ring-2 ring-ring"
                />
              </div>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors">
            <BarChart3 className="w-4 h-4" />
            Generate Report
          </button>
        </div>
      </div>

      {/* Available Reports */}
      <div className="bg-card border border-border rounded">
        <div className="px-4 py-3 border-b border-border">
          <h3>Available Report Types</h3>
        </div>
        <div className="divide-y divide-border">
          {reportTypes.map((report) => (
            <div key={report.name} className="p-4 hover:bg-muted/30 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded bg-muted">
                    <BarChart3 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium mb-1">{report.name}</div>
                    <div className="text-sm text-muted-foreground">{report.desc}</div>
                  </div>
                </div>
                <button className="flex items-center gap-2 px-3 py-1.5 text-sm border border-border rounded hover:bg-muted transition-colors">
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
