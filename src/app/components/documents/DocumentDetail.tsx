import { Link, useParams } from 'react-router';
import { ArrowLeft, Download, Printer, QrCode } from 'lucide-react';

export function DocumentDetail() {
  const { id } = useParams();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/documents" className="p-2 hover:bg-muted rounded transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h2>Document: {id}</h2>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-border rounded hover:bg-muted transition-colors">
            <Download className="w-4 h-4" />
            Download
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-border rounded hover:bg-muted transition-colors">
            <Printer className="w-4 h-4" />
            Print
          </button>
        </div>
      </div>

      {/* Printable Document */}
      <div className="max-w-4xl mx-auto bg-card border border-border rounded">
        <div className="p-8 space-y-6">
          {/* Header */}
          <div className="border-b-2 border-border pb-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="mb-2">DELIVERY NOTE</h3>
                <div className="text-sm text-muted-foreground">LES Terminal Operations</div>
                <div className="text-sm text-muted-foreground">Industrial Zone, North Sector</div>
              </div>
              <div className="text-right">
                <div className="font-medium mb-2">{id}</div>
                <div className="text-sm text-muted-foreground">Date: 2026-04-23</div>
                <div className="text-sm text-muted-foreground">Time: 10:30</div>
              </div>
            </div>
          </div>

          {/* Trip Info */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="mb-3">Trip Information</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Trip ID:</span>
                  <span className="font-medium">TRP-1045</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Order ID:</span>
                  <span className="font-medium">ORD-2401</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Customer:</span>
                  <span className="font-medium">ABC Logistics</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="mb-3">Transporter Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Company:</span>
                  <span className="font-medium">Swift Transport</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Vehicle:</span>
                  <span className="font-medium">TRK-445</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Driver:</span>
                  <span className="font-medium">John Smith</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div>
            <h4 className="mb-3">Product Details</h4>
            <table className="w-full text-sm">
              <thead className="border-b border-border">
                <tr>
                  <th className="text-left py-2">Product</th>
                  <th className="text-right py-2">Quantity</th>
                  <th className="text-right py-2">Unit</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="py-3">Steel Coils</td>
                  <td className="text-right py-3">25</td>
                  <td className="text-right py-3">MT</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* QR Code */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 bg-muted rounded flex items-center justify-center">
                <QrCode className="w-16 h-16 text-muted-foreground" />
              </div>
              <div className="text-xs text-muted-foreground">
                Scan for verification<br />
                Document ID: {id}
              </div>
            </div>
          </div>

          {/* Signatures */}
          <div className="grid grid-cols-3 gap-6 pt-6 border-t-2 border-border">
            <div>
              <div className="text-sm text-muted-foreground mb-2">Loaded By</div>
              <div className="h-16 border-b border-border mb-2"></div>
              <div className="text-xs text-muted-foreground">Operator Signature</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-2">Received By</div>
              <div className="h-16 border-b border-border mb-2"></div>
              <div className="text-xs text-muted-foreground">Driver Signature</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-2">Authorized By</div>
              <div className="h-16 border-b border-border mb-2"></div>
              <div className="text-xs text-muted-foreground">Supervisor Signature</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
