
import React, { useState, useEffect, useCallback } from 'react';
import { MemoryDataType, ScanType, MemoryAddress, Process, SavedAddress } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import MemoryScanner from './components/MemoryScanner';
import ProcessSelector from './components/ProcessSelector';
import AddressList from './components/AddressList';
import AIAssistant from './components/AIAssistant';
import DistributionPortal from './components/DistributionPortal';

const App: React.FC = () => {
  const [selectedProcess, setSelectedProcess] = useState<Process | null>(null);
  const [showProcessSelector, setShowProcessSelector] = useState(false);
  const [scanResults, setScanResults] = useState<MemoryAddress[]>([]);
  const [savedAddresses, setSavedAddresses] = useState<SavedAddress[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [activeTab, setActiveTab] = useState<'scan' | 'debugger' | 'ai' | 'distro'>('scan');

  // Simulate process list
  const mockProcesses: Process[] = [
    { pid: 1420, name: 'Cyberpunk2077.exe', user: 'user', cpu: 45.2, mem: 12400 },
    { pid: 2101, name: 'EldenRing.exe', user: 'user', cpu: 32.1, mem: 8200 },
    { pid: 882, name: 'Stray.x64', user: 'root', cpu: 12.5, mem: 4100 },
    { pid: 5502, name: 'Chrome', user: 'user', cpu: 5.4, mem: 2100 },
    { pid: 443, name: 'Discord', user: 'user', cpu: 1.2, mem: 850 },
  ];

  const handleProcessSelect = (proc: Process) => {
    setSelectedProcess(proc);
    setShowProcessSelector(false);
    setScanResults([]); // Reset on new process
  };

  const performScan = (value: string, type: MemoryDataType, scanType: ScanType) => {
    if (!selectedProcess) return;
    
    setIsScanning(true);
    // Simulate API call to memory scanning engine
    setTimeout(() => {
      const newResults: MemoryAddress[] = [];
      const count = scanResults.length === 0 ? 500 : Math.max(1, Math.floor(scanResults.length * 0.2));
      
      for (let i = 0; i < count; i++) {
        const addr = (Math.random() * 0xFFFFFFFF).toString(16).toUpperCase().padStart(8, '0');
        newResults.push({
          address: `0x${addr}`,
          value: value || Math.floor(Math.random() * 100).toString(),
          previousValue: (parseInt(value) - 5).toString(),
          type: type
        });
      }
      setScanResults(newResults);
      setIsScanning(false);
    }, 800);
  };

  const addSavedAddress = (addr: MemoryAddress) => {
    const newSaved: SavedAddress = {
      ...addr,
      active: false,
      description: 'No description'
    };
    setSavedAddresses(prev => [...prev, newSaved]);
  };

  const toggleSavedActive = (index: number) => {
    setSavedAddresses(prev => prev.map((item, i) => i === index ? { ...item, active: !item.active } : item));
  };

  return (
    <div className="flex h-screen w-full bg-[#0a0a0c] text-slate-200 overflow-hidden">
      {/* Sidebar Navigation */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 flex flex-col min-w-0">
        <Header 
          selectedProcess={selectedProcess} 
          onOpenSelector={() => setShowProcessSelector(true)} 
        />

        <main className="flex-1 overflow-hidden flex gap-4 p-4">
          <div className="flex-1 flex flex-col gap-4 overflow-hidden">
            {activeTab === 'scan' && (
              <>
                <div className="flex gap-4 h-1/2 min-h-[400px]">
                  <MemoryScanner 
                    onScan={performScan} 
                    isScanning={isScanning} 
                    resultsCount={scanResults.length}
                  />
                  <div className="flex-1 bg-[#121216] border border-slate-800 rounded-lg flex flex-col overflow-hidden">
                    <div className="p-3 border-b border-slate-800 bg-slate-900/50 flex justify-between items-center">
                      <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Scan Results</h3>
                      <span className="text-xs text-slate-500 mono">{scanResults.length} addresses found</span>
                    </div>
                    <div className="flex-1 overflow-y-auto custom-scrollbar mono text-xs">
                      <table className="w-full text-left">
                        <thead className="bg-[#1a1a21] sticky top-0">
                          <tr>
                            <th className="p-2 text-slate-500 border-b border-slate-800">Address</th>
                            <th className="p-2 text-slate-500 border-b border-slate-800">Value</th>
                            <th className="p-2 text-slate-500 border-b border-slate-800">Previous</th>
                          </tr>
                        </thead>
                        <tbody>
                          {scanResults.map((res, i) => (
                            <tr 
                              key={i} 
                              className="hover:bg-blue-600/10 cursor-pointer transition-colors"
                              onDoubleClick={() => addSavedAddress(res)}
                            >
                              <td className="p-2 text-blue-400">{res.address}</td>
                              <td className="p-2 text-emerald-400">{res.value}</td>
                              <td className="p-2 text-slate-500">{res.previousValue}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {scanResults.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-full opacity-20 pointer-events-none p-10 text-center">
                          <i className="fa-solid fa-microchip text-4xl mb-4"></i>
                          <p>No results. Perform an initial scan to populate memory list.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="h-1/2 bg-[#121216] border border-slate-800 rounded-lg flex flex-col overflow-hidden">
                  <div className="p-3 border-b border-slate-800 bg-slate-900/50 flex justify-between items-center">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Address Table</h3>
                    <div className="flex gap-2">
                      <button className="text-[10px] bg-slate-800 hover:bg-slate-700 px-2 py-1 rounded">Clear All</button>
                      <button className="text-[10px] bg-blue-600 hover:bg-blue-500 px-2 py-1 rounded">Export List</button>
                    </div>
                  </div>
                  <AddressList 
                    addresses={savedAddresses} 
                    onToggleActive={toggleSavedActive}
                    onRemove={(idx) => setSavedAddresses(prev => prev.filter((_, i) => i !== idx))}
                  />
                </div>
              </>
            )}

            {activeTab === 'debugger' && (
              <div className="flex-1 flex flex-col items-center justify-center opacity-50">
                <i className="fa-solid fa-bug text-6xl mb-4 text-blue-500"></i>
                <h2 className="text-xl font-bold">Assembly Debugger</h2>
                <p>Attach to a process to see live CPU register values and disassembly.</p>
                <div className="mt-8 p-4 bg-slate-900 rounded border border-slate-800 w-full max-w-2xl mono text-sm leading-relaxed">
                   <div className="text-emerald-500">00401000 - 55                     - push rbp</div>
                   <div className="text-emerald-500">00401001 - 48 89 E5              - mov rbp,rsp</div>
                   <div className="text-emerald-500">00401004 - 48 83 EC 10           - sub rsp,10</div>
                   <div className="text-emerald-500">00401008 - C7 45 FC 00000000     - mov [rbp-04],00000000</div>
                   <div className="text-yellow-500 underline">0040100F - E8 FC010000           - call Lumina.main_loop</div>
                   <div className="text-emerald-500">00401014 - B8 00000000           - mov eax,00000000</div>
                </div>
              </div>
            )}

            {activeTab === 'ai' && (
              <AIAssistant gameName={selectedProcess?.name || "Target Application"} />
            )}

            {activeTab === 'distro' && (
              <DistributionPortal />
            )}
          </div>
        </main>
      </div>

      {showProcessSelector && (
        <ProcessSelector 
          processes={mockProcesses} 
          onSelect={handleProcessSelect} 
          onClose={() => setShowProcessSelector(false)} 
        />
      )}
    </div>
  );
};

export default App;
