
import React, { useState } from 'react';
import { Process } from '../types';

interface ProcessSelectorProps {
  processes: Process[];
  onSelect: (proc: Process) => void;
  onClose: () => void;
}

const ProcessSelector: React.FC<ProcessSelectorProps> = ({ processes, onSelect, onClose }) => {
  const [filter, setFilter] = useState('');

  const filtered = processes.filter(p => 
    p.name.toLowerCase().includes(filter.toLowerCase()) || 
    p.pid.toString().includes(filter)
  );

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#121216] border border-slate-800 rounded-xl w-full max-w-2xl flex flex-col max-h-[80vh] shadow-2xl overflow-hidden scanline-effect">
        <div className="p-4 border-b border-slate-800 bg-slate-900/50 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <i className="fa-solid fa-list-ul text-blue-500"></i>
            <h2 className="text-lg font-bold">Process List</h2>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
            <i className="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>

        <div className="p-4 bg-slate-900/30">
          <div className="relative">
            <i className="fa-solid fa-search absolute left-3 top-3 text-slate-500"></i>
            <input 
              type="text"
              autoFocus
              placeholder="Filter processes by name or PID..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 pl-10 pr-4 outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <table className="w-full text-left text-sm mono">
            <thead className="bg-[#1a1a21] sticky top-0 text-[10px] text-slate-500 uppercase font-bold tracking-wider">
              <tr>
                <th className="p-3 border-b border-slate-800">PID</th>
                <th className="p-3 border-b border-slate-800">Process Name</th>
                <th className="p-3 border-b border-slate-800">User</th>
                <th className="p-3 border-b border-slate-800">CPU%</th>
                <th className="p-3 border-b border-slate-800">MEM (MB)</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(proc => (
                <tr 
                  key={proc.pid} 
                  onClick={() => onSelect(proc)}
                  className="hover:bg-blue-600/10 cursor-pointer group transition-colors"
                >
                  <td className="p-3 border-b border-slate-800/50 text-slate-400 group-hover:text-blue-400">{proc.pid}</td>
                  <td className="p-3 border-b border-slate-800/50 font-bold group-hover:text-white">{proc.name}</td>
                  <td className="p-3 border-b border-slate-800/50 text-slate-500">{proc.user}</td>
                  <td className="p-3 border-b border-slate-800/50 text-slate-400">{proc.cpu}%</td>
                  <td className="p-3 border-b border-slate-800/50 text-slate-400">{proc.mem}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-10 text-center text-slate-500 italic">No processes found matching your filter.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-slate-900/50 border-t border-slate-800 flex justify-between">
          <button className="text-sm font-medium text-slate-400 hover:text-white flex items-center gap-2">
            <i className="fa-solid fa-sync"></i> Refresh List
          </button>
          <div className="flex gap-3">
            <button onClick={onClose} className="px-4 py-1.5 rounded-lg text-sm font-bold bg-slate-800 hover:bg-slate-700 transition-colors">Cancel</button>
            <button className="px-4 py-1.5 rounded-lg text-sm font-bold bg-blue-600 hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/20">Open File</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessSelector;
