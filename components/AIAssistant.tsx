
import React, { useState } from 'react';
import { getCheatAdvice } from '../services/geminiService';

interface AIAssistantProps {
  gameName: string;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ gameName }) => {
  const [goal, setGoal] = useState('');
  const [advice, setAdvice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
        <h1 className="text-3xl font-black text-white">Reverse Engineering Consultant</h1>
        <p className="text-slate-400 text-lg">Ask for expert advice on finding memory addresses, identifying data structures, or bypassing anti-cheats.</p>
      </div>

      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-xl blur opacity-25 group-focus-within:opacity-50 transition duration-1000"></div>
        <div className="relative bg-[#121216] border border-slate-700 rounded-xl overflow-hidden shadow-2xl">
          <textarea
            className="w-full h-32 bg-transparent p-6 text-lg outline-none resize-none placeholder-slate-600"
            placeholder={`Example: How do I find the health value in ${gameName}? It's a percentage bar...`}
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />
          <div className="p-4 bg-slate-900/50 border-t border-slate-800 flex justify-between items-center">
            <span className="text-xs text-slate-500">Powered by Gemini AI Engine v3.5</span>
            <button 
              disabled={loading || !goal.trim()}
              className="bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/30 px-6 py-2 rounded-lg font-bold transition-all flex items-center gap-2"
            >
              {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-paper-plane"></i>}
              {loading ? 'Analyzing...' : 'Analyze Scenario'}
            </button>
          </div>
        </div>
      </form>

      {advice && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <i className="fa-solid fa-quote-right text-6xl"></i>
            </div>
            <h3 className="text-xs font-bold uppercase text-blue-500 tracking-widest mb-4 flex items-center gap-2">
              <i className="fa-solid fa-microchip"></i>
              System Analysis & Recommendation
            </h3>
            <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed space-y-4">
              {advice.split('\n').map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-slate-800 flex gap-4">
              <button className="text-xs bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg font-bold flex items-center gap-2 transition-colors">
                <i className="fa-solid fa-copy"></i> Copy as Script
              </button>
              <button className="text-xs bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg font-bold flex items-center gap-2 transition-colors">
                <i className="fa-solid fa-bookmark"></i> Save to Reference
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;
