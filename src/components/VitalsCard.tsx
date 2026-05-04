"use client";
import { motion } from 'framer-motion';
import { Activity, Droplets } from 'lucide-react';

interface VitalsProps {
  label: string;
  value: string;
  unit: string;
  type: 'heart' | 'oxygen';
}

export default function VitalsCard({ label, value, unit, type }: VitalsProps) {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="bg-white/5 border border-white/10 backdrop-blur-md p-4 rounded-2xl relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-2 opacity-20">
        {type === 'heart' ? <Activity color="#ff4d4d" /> : <Droplets color="#00e5ff" />}
      </div>
      <p className="text-[10px] font-mono text-slate-400 tracking-widest uppercase">{label}</p>
      <div className="flex items-baseline gap-1 mt-2">
        <span className="text-3xl font-orbitron font-bold">{value}</span>
        <span className="text-xs text-cyan opacity-70">{unit}</span>
      </div>
      <div className="w-full h-1 bg-white/5 mt-4 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: '70%' }}
          className={`h-full ${type === 'heart' ? 'bg-red-500' : 'bg-cyan'}`}
        />
      </div>
    </motion.div>
  );
}
