import React from 'react';
import { Process } from '../types';

interface HeaderProps {
  selectedProcess: Process | null;
  onOpenSelector: () => void;
}

const Header: React.FC<HeaderProps> = ({ selectedProcess, onOpenSelector }) => {
  return (
    <header className="h-16 border-b border-slate-800/50 bg-[#121216]/80 backdrop-blur-md flex items-center justify-between px-6 z-10">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="text-xl font-black tracking-tighter text-white">LUMINA</span>
          <span className="px-1.5 py-0.5 rounded bg-blue-600 text-[10px] font-bold">STABLE</span>
        </div>

        <div className="h-6 w-px bg-slate-800"></div>

        <button 
          onClick={onOpenSelector}
          className={`flex items-center gap-3 px-3 py-1.5 rounded-lg border transition-all ${
            selectedProcess 
              ? 'border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/10' 
              : 'border-slate-700 bg-slate-800/50 hover:border-blue-500/50'
          }`}
        >
          <div className={`w-2 h-2 rounded-full ${selectedProcess ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-slate-600'}`}></div>
          <span className="text-sm font-medium">
            {selectedProcess ? `${selectedProcess.name} (${selectedProcess.pid})` : 'Attach Process...'}
          </span>
          <i className="fa-solid fa-chevron-down text-[10px] text-slate-500"></i>
        </button>
      </div>

      <div className="flex items-center gap-4 text-xs font-medium text-slate-400">
        <div className="hidden md:flex items-center gap-4 mr-4">
           <span className="flex items-center gap-1.5 text-[9px] text-emerald-500 font-bold bg-emerald-500/5 border border-emerald-500/20 px-2 py-0.5 rounded">
             <i className="fa-solid fa-shield-halved"></i> LOCAL SECURE
           </span>
        </div>
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-microchip text-blue-500"></i>
          <span>CPU: 4.2%</span>
        </div>
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-memory text-emerald-500"></i>
          <span>RAM: 1.2 GB</span>
        </div>
      </div>
    </header>
  );
};

export default Header;