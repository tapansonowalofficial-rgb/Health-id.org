import { motion } from 'framer-motion';
import { Download, Printer, Shield } from 'lucide-react';

export default function PhysicalCardGenerator({ userData }) {
  return (
    <div className="space-y-6">
      <div className="p-1 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-[24px]">
        {/* The Printable Card Face */}
        <div className="bg-[#050505] p-6 rounded-[22px] aspect-[1.58/1] relative overflow-hidden">
          <div className="flex justify-between items-start border-b border-white/10 pb-4 mb-4">
            <div>
              <h2 className="text-white font-bold tracking-tighter italic">HEALTH-ID</h2>
              <p className="text-[8px] text-cyan-400 tracking-widest uppercase">Global Access Token</p>
            </div>
            <Shield className="text-cyan-500" size={16} />
          </div>

          <div className="flex gap-4">
            <div className="h-20 w-20 bg-white p-1 rounded-lg">
              {/* Replace with actual QR logic */}
              <div className="w-full h-full bg-black flex items-center justify-center">
                 <p className="text-[6px] text-center">SECURE QR</p>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-lg font-bold tracking-tight">{userData.name}</p>
              <p className="text-[10px] text-gray-400 font-mono italic">ID: {userData.id}</p>
              <div className="mt-2 flex gap-2">
                <span className="bg-red-500/20 text-red-500 text-[8px] px-2 py-0.5 rounded border border-red-500/20">B+: {userData.bloodType}</span>
                <span className="bg-cyan-500/20 text-cyan-500 text-[8px] px-2 py-0.5 rounded border border-cyan-500/20">ALLERGY: {userData.allergy}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button className="flex items-center justify-center gap-2 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all">
          <Download size={14} /> Save PDF
        </button>
        <button className="flex items-center justify-center gap-2 py-4 bg-cyan-600/20 border border-cyan-500/40 text-cyan-400 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-cyan-500 hover:text-black transition-all">
          <Printer size={14} /> Print Card
        </button>
      </div>
    </div>
  );
}
