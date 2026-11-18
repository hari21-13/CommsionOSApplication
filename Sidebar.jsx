import React from 'react';
import { 
  LayoutDashboard, Users, Calculator, BarChart3, FileText, Award, 
  CreditCard, ShieldCheck, Database, Settings, HelpCircle, Activity 
} from 'lucide-react';

const MODULES = [
  { id: 1, name: 'Dashboard', icon: LayoutDashboard },
  { id: 2, name: 'Client & Admin Auth', icon: ShieldCheck },
  { id: 3, name: 'Excel Import/Export', icon: Database },
  { id: 4, name: 'Financial Breakdowns', icon: Calculator },
  { id: 5, name: 'Visual Analytics', icon: BarChart3 },
  { id: 6, name: 'PDF Invoice Gen', icon: FileText },
  { id: 7, name: 'Certificate Generator', icon: Award },
  { id: 8, name: 'Razorpay Gateway', icon: CreditCard },
  { id: 9, name: 'PhonePe & GPay', icon: CreditCard },
  { id: 10, name: 'User Management', icon: Users },
  { id: 11, name: 'System Logs', icon: Activity },
  { id: 12, name: 'Subscriptions & Scanner', icon: Settings },
];

export default function Sidebar({ activeModule, setActiveModule }) {
  return (
    <aside className="w-64 bg-black border-r border-red-900/50 flex flex-col h-screen fixed left-0 top-0 text-white shadow-2xl z-50">
      {/* App Branding */}
      <div className="p-6 border-b border-red-900/40 flex items-center space-x-3 bg-gradient-to-r from-red-950/40 to-black">
        <div className="w-9 h-9 rounded-lg bg-red-600 flex items-center justify-center font-bold text-lg shadow-lg shadow-red-600/50">
          C
        </div>
        <div>
          <h1 className="font-extrabold tracking-wider text-red-500">CommissionOS</h1>
          <p className="text-xs text-zinc-400">Alpha Auron Enterprise</p>
        </div>
      </div>

      {/* 12 Modules Navigation List */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1.5 custom-scrollbar">
        <div className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-red-400">
          Navigation Modules (1-12)
        </div>
        {MODULES.map((mod) => {
          const Icon = mod.icon;
          const isActive = activeModule === mod.id;
          return (
            <button
              key={mod.id}
              onClick={() => setActiveModule(mod.id)}
              className={`w-full flex items-center space-x-3 px-3.5 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-red-600 text-white shadow-md shadow-red-900/50 border-l-4 border-white'
                  : 'text-zinc-300 hover:bg-red-950/30 hover:text-red-400'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-red-500'}`} />
              <span className="truncate">
                {mod.id}. {mod.name}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Footer User Info */}
      <div className="p-4 border-t border-red-900/40 bg-zinc-950 text-xs text-zinc-400 flex items-center justify-between">
        <div>
          <p className="font-semibold text-zinc-200">Kattamanchi Harika</p>
          <p className="text-[10px] text-red-400">Full Stack Associate</p>
        </div>
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
      </div>
    </aside>
  );
}