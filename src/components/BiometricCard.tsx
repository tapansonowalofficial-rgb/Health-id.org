"use client";
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';

export default function BiometricCard({ label, value, unit }: { label: string, value: string, unit: string }) {
  return (
    <motion.div 
      whileHover={{ y: -5, borderColor: '#00e5ff' }}
      className="p-6 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl transition-colors"
    >
      <div className="flex justify-between items-start opacity-50 mb-4">
        <span className="text-[10px] font-mono tracking-[0.3em] uppercase">{label}</span>
        <Activity size={14} className="text-cyan" />
      </div>
      <div className="flex items-baseline gap-2">
        <h2 className="text-4xl font-orbitron font-bold">{value}</h2>
        <span className="text-xs text-cyan/70 font-mono">{unit}</span>
      </div>
      {/* Animated Waveform pulse */}
      <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div 
          animate={{ x: [-100, 100] }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="h-full w-1/3 bg-gradient-to-r from-transparent via-cyan to-transparent"
        />
      </div>
    </motion.div>
  );
}
