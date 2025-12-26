import React, { useState, useEffect } from 'react';
import { getCheatAdvice } from '../services/adviceService';

interface AIAssistantProps {
  gameName: string;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ gameName }) => {
  const [goal, setGoal] = useState('');
  const [advice, setAdvice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isCloudEnabled, setIsCloudEnabled] = useState(false);

  useEffect(() => {
    const apiKey = (typeof process !== 'undefined' && process.env) ? process.env.API_KEY : null;
    setIsCloudEnabled(!!(apiKey && apiKey !== "undefined"));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!goal.trim()) return;
    
    setLoading(true);
    const result = await getCheatAdvice(gameName, goal);
    setAdvice(result);
    setLoading(false);
  };

  return (
    <div className="flex-1 flex flex-col gap-6 p-10 max-w-4xl mx-auto overflow-y-auto custom-scrollbar">
      <div className="flex flex-col items-center text-center gap-4">
        <div className="w-20 h-20 rounded-full bg-blue-600/10 border border-blue-500 flex items-center justify-center text-blue-500 text-3xl shadow-[0_0_30px_rgba(59,130,246,0.2)]">
          <i className="fa-solid fa-brain"></i>
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-black text-white">Neural Architect Consultant</h1>
          <div className="flex justify-center">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${isCloudEnabled ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400' : 'bg-blue-500/10 border-blue-500/50 text-blue-400'}`}>
              <i className={`fa-solid ${isCloudEnabled ? 'fa-cloud' : 'fa-microchip'} mr-1.5`}></i>
              {isCloudEnabled ? 'CLOUD NEURAL ANALYSIS ACTIVE' : 'LOCAL HEURISTIC ENGINE ACTIVE'}
            </span>
          </div>
        </div>
        <p className="text-slate-400 text-lg">Input your goal to receive scanning patterns and memory structure advice.</p>
      </div>

      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-xl blur opacity-25 group-focus-within:opacity-50 transition duration-1000"></div>
        <div className="relative bg-[#121216] border border-slate-700 rounded-xl overflow-hidden shadow-2xl">
          <textarea
            className="w-full h-32 bg-transparent p-6 text-lg outline-none resize-none placeholder-slate-600"
            placeholder={`Example: Finding health in ${gameName}...`}
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />
          <div className="p-4 bg-slate-900/50 border-t border-slate-800 flex justify-between items-center">
            <span className="text-xs text-slate-500 uppercase tracking-widest font-bold">
              {isCloudEnabled ? 'Hybrid Engine v3.5' : 'Local Logic v1.2'}
            </span>
            <button 
              disabled={loading || !goal.trim()}
              className="bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/30 px-6 py-2 rounded-lg font-bold transition-all flex items-center gap-2"
            >
              {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-bolt"></i>}
              {loading ? 'Consulting...' : 'Get Patterns'}
            </button>
          </div>
        </div>
      </form>

      {advice && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 relative overflow-hidden">
            <h3 className="text-xs font-bold uppercase text-blue-500 tracking-widest mb-4 flex items-center gap-2">
              <i className="fa-solid fa-terminal"></i>
              Recommended Scanning Strategy
            </h3>
            <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed space-y-4 font-medium">
              {advice.split('\n').map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;