import React, { useState } from 'react';
import { ShieldCheck, Save } from 'lucide-react';

export default function Settings({ user }) {
  const [parentPhone, setParentPhone] = useState(user.parentPhone);

  const updateGuardian = async () => {
    // Command the backend to update the Parent-Link
    const response = await fetch('/api/user/update-guardian', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: parentPhone })
    });
    
    if (response.ok) alert("Guardian Connection Updated.");
  };

  return (
    <div className="p-6 bg-white/5 border border-white/10 rounded-[32px] backdrop-blur-xl">
      <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-6">Guardian Configuration</h3>
      
      <div className="space-y-4">
        <label className="text-[10px] text-gray-500 uppercase font-bold">Emergency Contact Phone</label>
        <input 
          value={parentPhone}
          onChange={(e) => setParentPhone(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm focus:border-cyan-500"
        />
        
        <button 
          onClick={updateGuardian}
          className="w-full py-4 bg-cyan-600/20 border border-cyan-500/50 text-cyan-400 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-cyan-500 hover:text-black transition-all"
        >
          <Save size={16} /> Sync New Guardian
        </button>
      </div>
    </div>
  );
}
