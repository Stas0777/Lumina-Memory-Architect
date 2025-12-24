
import React from 'react';
import { SavedAddress } from '../types';

interface AddressListProps {
  addresses: SavedAddress[];
  onToggleActive: (idx: number) => void;
  onRemove: (idx: number) => void;
}

const AddressList: React.FC<AddressListProps> = ({ addresses, onToggleActive, onRemove }) => {
  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar mono text-xs">
      <table className="w-full text-left">
        <thead className="bg-[#1a1a21] sticky top-0">
          <tr>
            <th className="p-2 text-slate-500 border-b border-slate-800 w-12 text-center">Active</th>
            <th className="p-2 text-slate-500 border-b border-slate-800">Description</th>
            <th className="p-2 text-slate-500 border-b border-slate-800">Address</th>
            <th className="p-2 text-slate-500 border-b border-slate-800">Type</th>
            <th className="p-2 text-slate-500 border-b border-slate-800">Value</th>
            <th className="p-2 text-slate-500 border-b border-slate-800 w-12">Action</th>
          </tr>
        </thead>
        <tbody>
          {addresses.map((res, i) => (
            <tr key={i} className="hover:bg-white/5 transition-colors border-b border-slate-800/50">
              <td className="p-2 text-center">
                <input 
                  type="checkbox" 
                  checked={res.active} 
                  onChange={() => onToggleActive(i)}
                  className="rounded bg-slate-800 border-slate-700 text-blue-600 focus:ring-0 w-3 h-3"
                />
              </td>
              <td className="p-2 text-slate-300 italic">{res.description}</td>
              <td className="p-2 text-blue-400">{res.address}</td>
              <td className="p-2 text-slate-400">{res.type}</td>
              <td className="p-2">
                <input 
                  type="text" 
                  defaultValue={res.value} 
                  className="bg-slate-900 border border-slate-800 rounded px-1 w-20 text-emerald-400 focus:border-blue-500 outline-none"
                />
              </td>
              <td className="p-2">
                <button 
                  onClick={() => onRemove(i)}
                  className="text-slate-600 hover:text-red-500 transition-colors"
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
          {addresses.length === 0 && (
            <tr>
              <td colSpan={6} className="p-8 text-center text-slate-600 italic">
                No saved addresses. Double-click a scan result to add it here.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AddressList;
