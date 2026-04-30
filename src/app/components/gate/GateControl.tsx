import { useState } from 'react';
import { useSearchParams } from 'react-router';
import { 
  ScanLine, LogIn, LogOut, ShieldCheck, 
  Truck, User, Package, Clock, MapPin, 
  AlertCircle, CheckCircle2, QrCode, Key,
  ExternalLink, UserCheck, ArrowLeft, MoreHorizontal,
  ChevronRight, Search, Filter, Download,
  MoreVertical, ChevronDown, CheckSquare, Plus,
  FileCheck, Shield, ClipboardCheck, Camera
} from 'lucide-react';

type Mode = 'checkin' | 'checkout';
type View = 'LISTING' | 'SCANNING';

const mockInsideTrucks = [
  { id: 'ORD-BE-1001', truck: '1-ABC-234', driver: 'Jean Dupont', inTime: '24 Apr, 10:45 AM', bay: 'Antwerp Bay 3', status: 'IN_TERMINAL', product: 'Steel Coils', quantity: '25 MT', transporter: 'H. Essers' },
  { id: 'ORD-BE-1002', truck: '2-XYZ-789', driver: 'Marc De Smet', inTime: '24 Apr, 11:15 AM', bay: 'Antwerp Bay 1', status: 'IN_TERMINAL', product: 'Steel Bars', quantity: '18 MT', transporter: 'Van Moer Logistics' },
  { id: 'ORD-BE-1003', truck: 'BE-TK-9087', driver: 'Thomas Vermeulen', inTime: '24 Apr, 11:30 AM', bay: 'Ghent Bay 4', status: 'IN_TERMINAL', product: 'Steel Coils', quantity: '30 MT', transporter: 'Sitra Group' },
  { id: 'ORD-BE-1006', truck: '1-DEF-456', driver: 'Lucas Peeters', inTime: '24 Apr, 12:10 PM', bay: 'Zeebrugge Bay 2', status: 'LOADED', product: 'Steel Plates', quantity: '40 MT', transporter: 'Transport Gheys' },
  { id: 'ORD-BE-1009', truck: '2-GHI-123', driver: 'Marc Vermeulen', inTime: '24 Apr, 12:45 PM', bay: 'Brussels Bay 5', status: 'IN_TERMINAL', product: 'Steel Coils', quantity: '20 MT', transporter: 'Katoen Natie' },
  { id: 'ORD-BE-1012', truck: '1-JKL-789', driver: 'Jean Peeters', inTime: '24 Apr, 01:05 PM', bay: 'Antwerp Bay 1', status: 'DISPATCHED', product: 'Steel Bars', quantity: '15 MT', transporter: 'H. Essers' },
];

export function GateControl() {
  const [searchParams] = useSearchParams();
  const initialAction = searchParams.get('action') === 'scan' ? 'SCANNING' : 'LISTING';
  const initialMode = (searchParams.get('mode') as Mode) || 'checkin';

  const [view, setView] = useState<View>(initialAction);
  const [mode, setMode] = useState<Mode>(initialMode);
  const [passId, setPassId] = useState(searchParams.get('tripId') || '');
  const [pin, setPin] = useState('');
  const [orderData, setOrderData] = useState<any>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [areaFilter, setAreaFilter] = useState('All Areas');

  // Checklist State for Exit
  const [checklist, setChecklist] = useState({
    documentsVerified: false,
    securitySealIntact: false,
    weightMatched: false
  });
  const [imageUploaded, setImageUploaded] = useState(false);

  const filteredTrucks = mockInsideTrucks.filter(t => {
    const matchesSearch = 
      t.truck.toLowerCase().includes(searchQuery.toLowerCase()) || 
      t.driver.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.transporter.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'All Status' || t.status === statusFilter;
    const matchesArea = areaFilter === 'All Areas' || t.bay.toLowerCase().includes(areaFilter.toLowerCase());

    return matchesSearch && matchesStatus && matchesArea;
  });

  const handleVerify = () => {
    setIsVerifying(true);
    setError('');
    
    setTimeout(() => {
      if (passId === 'ORD-BE-1001' || pin === '8842') {
        const baseData = {
          id: 'ORD-BE-1001',
          truck: '1-ABC-234',
          driver: 'Jean Dupont',
          product: 'Steel Coils',
          quantity: '25 MT',
          transporter: 'H. Essers',
          bay: 'Antwerp Bay 3'
        };

        if (mode === 'checkin') {
          setOrderData({ ...baseData, status: 'TRIP_SCHEDULED' });
        } else {
          setOrderData({ 
            ...baseData, 
            status: 'LOADED',
            loadedQuantity: '25 MT',
            loadingManager: 'Mike Johnson',
            loadingTime: '24 Apr, 11:45 AM'
          });
        }
      } else {
        setError('Invalid Pass ID or PIN. Please verify with the driver.');
      }
      setIsVerifying(false);
    }, 1000);
  };

  const handleAction = () => {
    if (mode === 'checkout') {
      if (!checklist.documentsVerified || !checklist.securitySealIntact || !checklist.weightMatched) {
        alert('Please complete all verification checklist items before authorizing the exit.');
        return;
      }
      if (!imageUploaded) {
        alert('Gate/Seal verification image is required before exit.');
        return;
      }
    }

    setOrderData(null);
    setPassId('');
    setPin('');
    setChecklist({ documentsVerified: false, securitySealIntact: false, weightMatched: false });
    setImageUploaded(false);
    setView('LISTING');
  };

  if (view === 'SCANNING') {
    return (
      <div className="w-full space-y-8 animate-in fade-in duration-500 pb-12">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => { setView('LISTING'); setOrderData(null); }}
            className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-primary transition-all shadow-sm"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              {mode === 'checkin' ? 'Entry Check-In' : 'Exit Check-Out'}
            </h2>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Verification & Authorization</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                  <QrCode className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-black text-slate-900 tracking-tight">Identity Verification</h3>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Pass ID / Scan Code</label>
                  <div className="relative group">
                    <ScanLine className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-primary transition-colors" />
                    <input 
                      type="text"
                      value={passId}
                      onChange={(e) => setPassId(e.target.value.toUpperCase())}
                      placeholder="SCAN OR ENTER PASS ID"
                      autoComplete="off"
                      spellCheck={false}
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 ring-primary/20 focus:bg-white transition-all text-sm font-black tracking-widest placeholder:text-slate-300"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="h-px flex-1 bg-slate-100" />
                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">OR</span>
                  <div className="h-px flex-1 bg-slate-100" />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Digital Pass PIN</label>
                  <div className="relative group">
                    <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-primary transition-colors" />
                    <input 
                      type="password"
                      maxLength={4}
                      value={pin}
                      onChange={(e) => setPin(e.target.value)}
                      placeholder="4-DIGIT PIN"
                      autoComplete="new-password"
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 ring-primary/20 focus:bg-white transition-all text-sm font-black tracking-[0.5em] placeholder:text-slate-300 placeholder:tracking-normal"
                    />
                  </div>
                </div>

                {error && (
                  <div className="flex gap-3 p-4 bg-red-50 border border-red-100 rounded-2xl">
                    <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                    <p className="text-[11px] font-bold text-red-900 leading-relaxed">{error}</p>
                  </div>
                )}

                <button 
                  onClick={handleVerify}
                  disabled={isVerifying || (!passId && !pin)}
                  className="w-full py-4 bg-primary text-white text-xs font-black rounded-2xl shadow-xl shadow-primary/20 hover:shadow-2xl hover:-translate-y-0.5 disabled:opacity-50 disabled:translate-y-0 transition-all uppercase tracking-[0.2em]"
                >
                  {isVerifying ? 'Verifying Credentials...' : 'Verify Access'}
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            {orderData ? (
              <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm relative overflow-hidden animate-in zoom-in-95 duration-500 h-full">
                <div className="absolute top-0 right-0 p-10 opacity-[0.03]">
                  <ShieldCheck className="w-64 h-64" />
                </div>

                <div className="relative z-10 space-y-10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-16 h-16 rounded-[24px] flex items-center justify-center border shadow-inner ${
                        mode === 'checkin' ? 'bg-green-50 text-green-500 border-green-100' : 'bg-indigo-50 text-indigo-500 border-indigo-100'
                      }`}>
                        {mode === 'checkin' ? <CheckCircle2 className="w-8 h-8" /> : <Package className="w-8 h-8" />}
                      </div>
                      <div>
                        <h3 className="text-2xl font-black text-slate-900 tracking-tight">{mode === 'checkin' ? 'Entry Authorized' : 'Exit Authorized'}</h3>
                        <p className="text-sm font-bold text-slate-400">ID: {orderData.id}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-10">
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                          <Truck className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Vehicle</p>
                          <p className="text-base font-black text-slate-900">{orderData.truck}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                          <User className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Driver</p>
                          <p className="text-base font-black text-slate-900">{orderData.driver}</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-6">
                      {mode === 'checkout' ? (
                        <>
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-500">
                              <Package className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Loaded Quantity</p>
                              <p className="text-base font-black text-slate-900">{orderData.loadedQuantity}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-500">
                              <UserCheck className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Loaded By</p>
                              <p className="text-base font-black text-slate-900">{orderData.loadingManager}</p>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                              <Package className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Product</p>
                              <p className="text-base font-black text-slate-900">{orderData.product}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                              <MapPin className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Designated Area</p>
                              <p className="text-base font-black text-slate-900">{orderData.bay}</p>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {mode === 'checkout' && (
                    <div className="space-y-3 pt-6 border-t border-slate-50">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-[16px] bg-green-50 flex items-center justify-center text-green-500 border border-green-100 shadow-inner">
                          <ClipboardCheck className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-black text-slate-900 tracking-tight">Exit Safety & Verification</h4>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Complete all checks before exit</p>
                        </div>
                      </div>
                      {[
                        { id: 'documentsVerified', label: 'Have exit documents and shipping manifests been verified?', icon: FileCheck },
                        { id: 'securitySealIntact', label: 'Is the security seal intact and recorded?', icon: ShieldCheck },
                        { id: 'weightMatched', label: 'Does the exit weight match the loaded quantity?', icon: MapPin },
                      ].map((item) => {
                        const isChecked = checklist[item.id as keyof typeof checklist];
                        return (
                          <div
                             key={item.id}
                             className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                                isChecked
                                ? 'bg-green-50/50 border-green-100'
                                : 'bg-slate-50/50 border-slate-100'
                             }`}
                          >
                             <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                                   isChecked ? 'bg-green-100 text-green-600' : 'bg-white border border-slate-200 text-slate-400'
                                }`}>
                                   {isChecked ? <CheckCircle2 className="w-5 h-5" /> : <item.icon className="w-5 h-5" />}
                                </div>
                                <span className={`text-xs font-black uppercase tracking-tight ${isChecked ? 'text-green-700' : 'text-slate-600'}`}>
                                   {item.label}
                                </span>
                             </div>
                             
                             <div className="flex items-center gap-2">
                                <button
                                   type="button"
                                   onClick={() => setChecklist(prev => ({ ...prev, [item.id]: true }))}
                                   className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                      isChecked 
                                      ? 'bg-green-500 text-white shadow-md shadow-green-500/20' 
                                      : 'bg-white border border-slate-200 text-slate-400 hover:border-green-200 hover:text-green-500'
                                   }`}
                                >
                                   Yes
                                </button>
                                <button
                                   type="button"
                                   onClick={() => setChecklist(prev => ({ ...prev, [item.id]: false }))}
                                   className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                      !isChecked 
                                      ? 'bg-red-500 text-white shadow-md shadow-red-500/20' 
                                      : 'bg-white border border-slate-200 text-slate-400 hover:border-red-200 hover:text-red-500'
                                   }`}
                                >
                                   No
                                </button>
                             </div>
                          </div>
                        );
                      })}
                      
                      <div className="pt-4">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 block mb-3">Gate/Seal Verification Image</label>
                         <label
                            className={`w-full py-[1.05rem] border-2 border-dashed rounded-2xl flex items-center justify-center gap-3 cursor-pointer transition-all ${
                               imageUploaded 
                               ? 'bg-green-50 border-green-200 text-green-600' 
                               : 'bg-slate-50 border-slate-200 text-slate-400 hover:border-primary/20 hover:text-primary'
                            }`}
                         >
                            <input 
                               type="file" 
                               className="hidden" 
                               accept="image/*"
                               onChange={(e) => {
                                   if (e.target.files && e.target.files.length > 0) {
                                       setImageUploaded(true);
                                   }
                               }}
                            />
                            {imageUploaded ? (
                               <>
                                  <CheckCircle2 className="w-5 h-5" />
                                  <span className="text-[10px] font-black uppercase tracking-widest">Image Uploaded Successfully</span>
                               </>
                            ) : (
                               <>
                                  <Camera className="w-5 h-5" />
                                  <span className="text-[10px] font-black uppercase tracking-widest">Upload Verification Photo</span>
                               </>
                            )}
                         </label>
                      </div>
                    </div>
                  )}

                  <div className="pt-10 border-t border-slate-50">
                    <button 
                      onClick={handleAction}
                      className={`w-full py-5 text-white text-sm font-black rounded-3xl shadow-xl transition-all uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:shadow-2xl hover:-translate-y-1 ${
                        mode === 'checkin' ? 'bg-[#0047AB] shadow-blue-900/20' : 'bg-green-600 shadow-green-900/20'
                      }`}
                    >
                      {mode === 'checkin' ? <><LogIn className="w-6 h-6" /> Complete Entry</> : <><LogOut className="w-6 h-6" /> Complete Exit</>}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[40px] flex flex-col items-center justify-center p-20 text-center h-full">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-6 animate-pulse">
                  <ShieldCheck className="w-10 h-10 text-slate-200" />
                </div>
                <h4 className="text-lg font-black text-slate-400 tracking-tight tracking-widest">Awaiting Verification</h4>
                <p className="text-xs font-bold text-slate-300 max-w-xs mt-2 uppercase tracking-widest">
                  Scan pass or enter PIN to authorize {mode === 'checkin' ? 'entry' : 'exit'}.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h2 className="text-2xl font-black text-slate-900 tracking-tight">Gate Control</h2>
           <p className="text-xs font-medium text-slate-400 mt-1">Terminal Access & Vehicle Verification</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => { setView('SCANNING'); setMode('checkin'); }}
            className="flex items-center gap-2 px-6 py-3 bg-[#0047AB] text-white text-sm font-bold rounded-2xl shadow-lg shadow-blue-900/20 hover:shadow-xl hover:-translate-y-0.5 transition-all"
          >
            <LogIn className="w-5 h-5" />
            Entry Check-In
          </button>
          <button
            onClick={() => { setView('SCANNING'); setMode('checkout'); }}
            className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-slate-50 text-slate-900 text-sm font-bold rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
          >
            <LogOut className="w-5 h-5" />
            Exit Check-Out
          </button>
        </div>
      </div>

      {/* Proper Listing Filter Section */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <div className="relative group md:col-span-2 lg:col-span-2">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search Truck Number, Driver, or Transporter..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all text-xs font-bold"
            />
          </div>
          <div className="relative">
             <select 
               value={statusFilter}
               onChange={(e) => setStatusFilter(e.target.value)}
               className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all text-xs font-bold text-slate-600 appearance-none"
             >
               <option>All Status</option>
               <option value="IN_TERMINAL">In Terminal</option>
               <option value="LOADED">Loaded</option>
               <option value="DISPATCHED">Dispatched</option>
             </select>
             <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
          <div className="relative">
             <select 
               value={areaFilter}
               onChange={(e) => setAreaFilter(e.target.value)}
               className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all text-xs font-bold text-slate-600 appearance-none"
             >
               <option>All Areas</option>
               <option>Antwerp</option>
               <option>Ghent</option>
               <option>Zeebrugge</option>
               <option>Brussels</option>
             </select>
             <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
          <button className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-slate-50 text-slate-500 font-bold rounded-2xl hover:bg-slate-50 transition-all text-xs">
            <Filter className="w-4 h-4" />
            Advanced Filters
          </button>
        </div>
      </div>

      {/* High Density Table Card - Optimized */}
      <div className="bg-white border border-slate-100 rounded-[40px] shadow-sm overflow-hidden mb-10">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[1000px]">
            <thead>
              <tr className="bg-slate-50/20">
                <th className="pl-10 pr-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Vehicle & Order</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Load Details</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Transporter Info</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Operational Status</th>
                <th className="pl-6 pr-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredTrucks.map((truck) => (
                <tr key={truck.id} className="hover:bg-slate-50/50 transition-all group">
                  <td className="pl-10 pr-6 py-5">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                          <Truck className="w-5 h-5" />
                       </div>
                       <div>
                          <div className="text-sm font-black text-slate-900">{truck.truck}</div>
                          <div className="flex items-center gap-2 mt-0.5">
                             <span className="text-[10px] font-black text-primary/70 uppercase tracking-widest">{truck.id}</span>
                             <span className="w-1 h-1 rounded-full bg-slate-300" />
                             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">System Order</span>
                          </div>
                       </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-center">
                       <div className="text-sm font-black text-slate-900">{truck.quantity}</div>
                       <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5 italic">{truck.product}</div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-xs font-black text-slate-900">{truck.transporter}</div>
                    <div className="flex items-center gap-1.5 mt-1">
                       <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[8px] font-bold text-slate-500">
                          {truck.driver.charAt(0)}
                       </div>
                       <span className="text-[11px] font-bold text-slate-500">{truck.driver}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                       <div className="flex flex-col items-start">
                          <span className={`px-2.5 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border ${
                            truck.status === 'LOADED' ? 'bg-green-50 text-green-600 border-green-100' :
                            truck.status === 'IN_TERMINAL' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                            truck.status === 'DISPATCHED' ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-50 text-slate-500 border-slate-100'
                          }`}>
                            {truck.status.replace('_', ' ')}
                          </span>
                          <span className="text-[9px] font-bold text-slate-400 mt-1">{truck.bay}</span>
                       </div>
                    </div>
                  </td>
                  <td className="pl-6 pr-10 py-5 text-right">
                    <button className="p-2 hover:bg-white rounded-xl hover:shadow-sm border border-transparent hover:border-slate-100 transition-all text-slate-400 hover:text-primary">
                       <MoreHorizontal className="w-5 h-5" />
                    </button>
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
