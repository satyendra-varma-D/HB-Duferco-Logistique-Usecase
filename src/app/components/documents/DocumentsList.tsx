import { Link } from 'react-router';
import { Search, Filter, FileText } from 'lucide-react';

const documents = [
  { id: 'DOC-5001', tripId: 'TRP-1045', type: 'Delivery Note', status: 'generated', date: '2026-04-23 10:30' },
  { id: 'DOC-5002', tripId: 'TRP-1044', type: 'Loading Certificate', status: 'signed', date: '2026-04-23 09:45' },
  { id: 'DOC-5003', tripId: 'TRP-1043', type: 'Gate Pass', status: 'generated', date: '2026-04-23 08:15' },
  { id: 'DOC-5004', tripId: 'TRP-1042', type: 'Delivery Note', status: 'delivered', date: '2026-04-22 16:30' },
  { id: 'DOC-5005', tripId: 'TRP-1041', type: 'Loading Certificate', status: 'signed', date: '2026-04-22 14:20' },
];

const statusColors = {
  generated: 'bg-[#3B82F6]/10 text-[#3B82F6] border-[#3B82F6]/20',
  signed: 'bg-primary/10 text-primary border-primary/20',
  delivered: 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20',
};

export function DocumentsList() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2>Document Management</h2>
      </div>

      {/* Filters */}
      <div className="bg-card border border-border rounded p-4">
        <div className="grid grid-cols-4 gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search Document / Trip ID..."
              className="w-full pl-9 pr-3 py-2 bg-input border border-border rounded outline-none focus:ring-2 ring-ring"
            />
          </div>
          <select className="px-3 py-2 bg-input border border-border rounded outline-none focus:ring-2 ring-ring">
            <option>All Types</option>
            <option>Delivery Note</option>
            <option>Loading Certificate</option>
            <option>Gate Pass</option>
          </select>
          <select className="px-3 py-2 bg-input border border-border rounded outline-none focus:ring-2 ring-ring">
            <option>All Status</option>
            <option>Generated</option>
            <option>Signed</option>
            <option>Delivered</option>
          </select>
          <button className="flex items-center justify-center gap-2 px-3 py-2 border border-border rounded hover:bg-muted transition-colors">
            <Filter className="w-4 h-4" />
            More Filters
          </button>
        </div>
      </div>

      {/* Documents Table */}
      <div className="bg-card border border-border rounded overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="text-left px-4 py-3 text-sm font-medium">Document ID</th>
              <th className="text-left px-4 py-3 text-sm font-medium">Trip ID</th>
              <th className="text-left px-4 py-3 text-sm font-medium">Type</th>
              <th className="text-left px-4 py-3 text-sm font-medium">Generated</th>
              <th className="text-left px-4 py-3 text-sm font-medium">Status</th>
              <th className="text-left px-4 py-3 text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {documents.map((doc) => (
              <tr key={doc.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    <Link to={`/documents/${doc.id}`} className="text-primary hover:underline">
                      {doc.id}
                    </Link>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <Link to={`/trips/${doc.tripId}`} className="text-primary hover:underline">
                    {doc.tripId}
                  </Link>
                </td>
                <td className="px-4 py-3">{doc.type}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{doc.date}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-1 rounded text-xs border ${statusColors[doc.status as keyof typeof statusColors]}`}>
                    {doc.status.toUpperCase()}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <Link
                    to={`/documents/${doc.id}`}
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
  );
}
