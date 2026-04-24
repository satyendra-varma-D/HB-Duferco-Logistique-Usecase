import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import {
  LayoutDashboard, Package, Truck, DoorOpen, Container,
  MapPin, FileText, BarChart3, Search, Bell, User,
  Menu, ChevronLeft, ChevronDown, Settings, HelpCircle,
  Plus, Grid, Filter, RotateCw, Download, Eye, Copy, Command,
  LogOut, Shield, Terminal
} from 'lucide-react';

export function RootLayout() {
  const { user, logout } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['Operations', 'Intelligence', 'System']);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navGroups = [
    {
      title: 'Dashboard',
      items: [{ path: '/', label: 'Dashboard', icon: LayoutDashboard, roles: ['ADMIN', 'TRANSPORTER', 'TERMINAL_MANAGER', 'LOADING_MANAGER'] }]
    },
    {
      title: 'Operations',
      items: [
        { path: '/orders', label: 'Orders', icon: Package, roles: ['ADMIN', 'TRANSPORTER'] },
        { path: '/gate', label: 'Gate Control', icon: DoorOpen, roles: ['ADMIN', 'TERMINAL_MANAGER'] },
        { path: '/loading', label: 'Loading', icon: Container, roles: ['ADMIN', 'LOADING_MANAGER'] },
      ]
    },
    {
      title: 'Intelligence',
      items: [
        { path: '/tracking', label: 'Tracking', icon: MapPin, roles: ['ADMIN', 'TRANSPORTER'] },
        { path: '/documents', label: 'Documents', icon: FileText, roles: ['ADMIN'] },
        { path: '/reports', label: 'Reports', icon: BarChart3, roles: ['ADMIN'] },
      ]
    },
    {
      title: 'System',
      items: [
        { path: '/settings', label: 'Settings', icon: Settings, roles: ['ADMIN'] },
        { path: '/help', label: 'Help Center', icon: HelpCircle, roles: ['ADMIN', 'TRANSPORTER', 'TERMINAL_MANAGER', 'LOADING_MANAGER'] },
      ]
    }
  ];

  const toggleGroup = (title: string) => {
    setExpandedGroups(prev => 
      prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]
    );
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const filteredNavGroups = navGroups.map(group => ({
    ...group,
    items: group.items.filter(item => item.roles.includes(user?.role || ''))
  })).filter(group => group.items.length > 0);

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'ADMIN': return <Shield className="w-4 h-4 text-primary" />;
      case 'TRANSPORTER': return <Truck className="w-4 h-4 text-blue-500" />;
      case 'TERMINAL_MANAGER': return <Terminal className="w-4 h-4 text-orange-500" />;
      case 'LOADING_MANAGER': return <Container className="w-4 h-4 text-green-500" />;
      default: return <User className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="h-screen flex bg-[#F9FBFC] font-sans text-slate-900">
      {/* Sidebar */}
      <aside
        className={`bg-white border-r border-slate-200 flex flex-col transition-all duration-300 shadow-sm z-30 ${
          sidebarCollapsed ? 'w-20' : 'w-72'
        }`}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#0047AB] rounded-tr-2xl rounded-bl-2xl flex items-center justify-center shadow-lg shadow-blue-900/20 relative overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 6H20V18H4V6Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M4 14C8 14 10 12 14 12C18 12 20 14 20 14" stroke="#FF8C00" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M8 9H16" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
               </svg>
            </div>
            <div className="flex flex-col">
               <span className="text-sm font-black tracking-tighter text-slate-900 leading-none uppercase">DUFERCO</span>
               <div className="h-0.5 w-full bg-gradient-to-r from-orange-500 to-transparent my-0.5 rounded-full" />
               <span className="text-[10px] font-bold tracking-[0.2em] text-slate-400 leading-none uppercase">LOGISTIQUE</span>
            </div>
          </div>
          <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="p-1.5 hover:bg-slate-50 rounded-lg transition-colors text-slate-400">
             <Menu className="w-4 h-4" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-4 overflow-y-auto custom-scrollbar">
          {filteredNavGroups.map((group) => (
            <div key={group.title} className="space-y-1.5">
              {!sidebarCollapsed && (
                <button 
                  onClick={() => toggleGroup(group.title)}
                  className="w-full flex items-center justify-between px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors"
                >
                  {group.title}
                  <ChevronDown className={`w-3 h-3 transition-transform ${expandedGroups.includes(group.title) ? '' : '-rotate-90'}`} />
                </button>
              )}
              {(sidebarCollapsed || expandedGroups.includes(group.title)) && (
                <div className="space-y-0.5">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path ||
                      (item.path !== '/' && location.pathname.startsWith(item.path));

                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center gap-3.5 px-4 py-2.5 rounded-xl transition-all duration-200 group ${
                          isActive
                            ? 'bg-[#EEF4FF] text-primary border-l-4 border-primary'
                            : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                        }`}
                      >
                        <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-primary' : 'group-hover:text-primary'}`} />
                        {!sidebarCollapsed && <span className="text-[14.5px] font-semibold tracking-tight">{item.label}</span>}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Sidebar Footer / Profile */}
        <div className="p-4 border-t border-slate-100">
          <div className="relative">
            <button 
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className={`w-full flex items-center gap-4 p-3 rounded-2xl transition-all ${sidebarCollapsed ? 'justify-center' : 'hover:bg-slate-50'}`}
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-base overflow-hidden border border-primary/20">
                  {user?.avatar ? <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" /> : user?.name.charAt(0)}
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100">
                  {getRoleIcon(user?.role || '')}
                </div>
              </div>
              {!sidebarCollapsed && (
                <div className="flex-1 min-w-0 text-left">
                  <div className="text-sm font-bold text-slate-900 truncate">{user?.name}</div>
                  <div className="text-[11px] text-slate-400 truncate font-medium">{user?.role.replace('_', ' ')}</div>
                </div>
              )}
              {!sidebarCollapsed && <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />}
            </button>

            {/* Profile Dropup Menu */}
            {showProfileMenu && !sidebarCollapsed && (
              <div className="absolute bottom-full left-0 w-full mb-2 bg-white border border-slate-100 rounded-2xl shadow-2xl overflow-hidden py-2 z-50">
                <div className="px-4 py-2 border-b border-slate-50 mb-1">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Account</div>
                  <div className="text-[11px] text-slate-500 font-medium truncate mt-1">{user?.email}</div>
                </div>
                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors">
                  <User className="w-4 h-4" />
                  My Profile
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors">
                  <Settings className="w-4 h-4" />
                  Settings
                </button>
                <div className="h-px bg-slate-50 my-1" />
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-4 flex-1 max-w-2xl">
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder="Search orders, tracking, documents..."
                className="w-full h-10 pl-11 pr-16 bg-slate-50 border border-slate-100 rounded-lg outline-none focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all text-sm"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 px-1.5 py-0.5 bg-slate-200/50 rounded text-[10px] font-bold text-slate-400">
                 <Command className="w-2.5 h-2.5" /> K
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 pr-4 border-r border-slate-100 mr-2">
               {[Grid, Filter, RotateCw, Download, Eye, Copy].map((BtnIcon, i) => (
                  <button key={i} className="p-2 text-slate-400 hover:text-primary hover:bg-slate-50 rounded-lg transition-all">
                     <BtnIcon className="w-4 h-4" />
                  </button>
               ))}
            </div>
            {user?.role === 'ADMIN' && (
              <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-0.5 transition-all mr-4">
                <Plus className="w-4 h-4" />
                Quick Create
              </button>
            )}
            <button className="relative p-2 text-slate-400 hover:text-primary transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-[8px] font-bold text-white flex items-center justify-center rounded-full border-2 border-white">
                3
              </span>
            </button>
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px] font-bold ml-2 overflow-hidden">
               {user?.avatar ? <img src={user.avatar} alt={user.name} /> : user?.name.charAt(0)}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-[#F9FBFC]">
           <div className="p-8 max-w-[1600px] mx-auto">
              <Outlet />
           </div>
        </main>
      </div>
    </div>
  );
}
