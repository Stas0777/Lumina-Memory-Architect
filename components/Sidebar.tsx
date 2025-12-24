
import React from 'react';

interface SidebarProps {
  activeTab: 'scan' | 'debugger' | 'ai' | 'distro';
  setActiveTab: (tab: 'scan' | 'debugger' | 'ai' | 'distro') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <aside className="w-16 flex flex-col items-center py-6 bg-[#0a0a0c] border-right border-slate-800/50 z-20">
      <div className="mb-10 text-blue-500 text-2xl">
        <i className="fa-solid fa-cube glow-border rounded p-1"></i>
      </div>
      
      <nav className="flex flex-col gap-6 flex-1">
        <NavItem 
          icon="fa-search" 
          active={activeTab === 'scan'} 
          onClick={() => setActiveTab('scan')} 
          label="Memory Scanner" 
        />
        <NavItem 
          icon="fa-bug" 
          active={activeTab === 'debugger'} 
          onClick={() => setActiveTab('debugger')} 
          label="Debugger" 
        />
        <NavItem 
          icon="fa-robot" 
          active={activeTab === 'ai'} 
          onClick={() => setActiveTab('ai')} 
          label="AI Assistant" 
        />
        <NavItem 
          icon="fa-box-open" 
          active={activeTab === 'distro'} 
          onClick={() => setActiveTab('distro')} 
          label="Distribution" 
        />
      </nav>

      <div className="mt-auto flex flex-col gap-6">
        <NavItem icon="fa-cog" active={false} onClick={() => {}} label="Settings" />
        <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold border border-slate-700">
          JD
        </div>
      </div>
    </aside>
  );
};

const NavItem = ({ icon, active, onClick, label }: { icon: string, active: boolean, onClick: () => void, label: string }) => (
  <button 
    onClick={onClick}
    className={`group relative p-3 rounded-xl transition-all duration-300 ${active ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'}`}
    title={label}
  >
    <i className={`fa-solid ${icon} text-lg`}></i>
    <span className="absolute left-16 ml-2 px-2 py-1 bg-slate-900 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-slate-700 pointer-events-none uppercase tracking-widest font-bold">
      {label}
    </span>
  </button>
);

export default Sidebar;
