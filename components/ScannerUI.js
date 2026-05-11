import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Scan, CheckCircle } from 'lucide-react';

export default function ScannerUI() {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);

  const handleScan = () => {
    setScanning(true);
    // Simulate AI processing delay
    setTimeout(() => {
      setResult({ med: "Amoxicillin", dose: "500mg" });
      setScanning(false);
    }, 3000);
  };

  return (
    <div className="p-6 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl relative overflow-hidden">
      {/* Animated Scanning Line */}
      {scanning && (
        <motion.div 
          initial={{ top: 0 }}
          animate={{ top: '100%' }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 right-0 h-1 bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)] z-20"
        />
      )}

      <div className="flex flex-col items-center gap-4">
        <div className={`p-8 rounded-full border-2 border-dashed ${scanning ? 'border-cyan-400 animate-pulse' : 'border-white/20'}`}>
          <Scan size={48} className={scanning ? 'text-cyan-400' : 'text-gray-500'} />
        </div>
        
        <button 
          onClick={handleScan}
          className="w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-700 rounded-2xl font-bold tracking-widest uppercase text-xs"
        >
          {scanning ? "Analyzing Data..." : "Scan Prescription"}
        </button>

        {result && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded-xl w-full">
            <div className="flex items-center gap-2 text-green-400 mb-1">
              <CheckCircle size={14} />
              <span className="text-[10px] font-bold uppercase">Medication Detected</span>
            </div>
            <p className="text-sm font-bold text-white">{result.med} — {result.dose}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
