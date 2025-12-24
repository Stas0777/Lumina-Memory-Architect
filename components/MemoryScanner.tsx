
import React, { useState } from 'react';
import { MemoryDataType, ScanType } from '../types';

interface MemoryScannerProps {
  onScan: (value: string, type: MemoryDataType, scanType: ScanType) => void;
  isScanning: boolean;
  resultsCount: number;
}

const MemoryScanner: React.FC<MemoryScannerProps> = ({ onScan, isScanning, resultsCount }) => {
  const [value, setValue] = useState('');
  const [dataType, setDataType] = useState<MemoryDataType>(MemoryDataType.FOUR_BYTES);
  const [scanType, setScanType] = useState<ScanType>(ScanType.EXACT_VALUE);

  const handleScanClick = () => {
    onScan(value, dataType, scanType);
  };

  return (
    <div className="w-80 bg-[#121216] border border-slate-800 rounded-lg flex flex-col p-4 gap-4">
      <div className="space-y-1">
        <label className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Search Value</label>
        <div className="relative">
          <input 
            type="text" 
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm focus:border-blue-500 outline-none mono"
            placeholder="0"
          />
          <div className="absolute right-2 top-2 text-[10px] text-slate-500 font-bold uppercase">Dec</div>
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Scan Type</label>
        <select 
          value={scanType}
          onChange={(e) => setScanType(e.target.value as ScanType)}
          className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm focus:border-blue-500 outline-none appearance-none"
        >
          {Object.values(ScanType).map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      <div className="space-y-1">
        <label className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Value Type</label>
        <select 
          value={dataType}
          onChange={(e) => setDataType(e.target.value as MemoryDataType)}
          className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm focus:border-blue-500 outline-none appearance-none"
        >
          {Object.values(MemoryDataType).map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-2">
        <button 
          onClick={handleScanClick}
          disabled={isScanning}
          className={`col-span-1 p-2 rounded text-sm font-bold flex items-center justify-center gap-2 transition-all ${isScanning ? 'bg-blue-600/50' : 'bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/10'}`}
        >
          {isScanning ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-play"></i>}
          {resultsCount === 0 ? 'First Scan' : 'Next Scan'}
        </button>
        <button className="col-span-1 bg-slate-800 hover:bg-slate-700 p-2 rounded text-sm font-bold flex items-center justify-center gap-2">
          <i className="fa-solid fa-rotate-left"></i>
          New Scan
        </button>
      </div>

      <div className="border-t border-slate-800 pt-4 mt-2 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-slate-500 uppercase font-bold">Memory Region</span>
          <span className="text-[10px] text-emerald-500 font-bold">ALL WRITABLE</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-slate-500 uppercase font-bold">Alignment</span>
          <span className="text-[10px] text-slate-300 mono">4 Bytes</span>
        </div>
      </div>
    </div>
  );
};

export default MemoryScanner;
