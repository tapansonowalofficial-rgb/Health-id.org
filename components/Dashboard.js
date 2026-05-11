import { motion } from 'framer-motion';
import { Heart, Droplet, Thermometer } from 'lucide-react';

export default function Dashboard({ setAlert }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      
      {/* Interactive Glass Card: Live Vitals */}
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
        <div className="relative bg-black/40 border border-white/10 backdrop-blur-xl p-6 rounded-3xl">
          <div className="flex justify-between items-center mb-6">
            <span className="text-xs font-semibold text-cyan-400 tracking-widest uppercase">Live Activity</span>
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <Vital icon={<Heart className="text-red-500" />} label="BPM" value="72" color="red" />
            <Vital icon={<Droplet className="text-blue-500" />} label="SpO2" value="98%" color="blue" />
            <Vital icon={<Thermometer className="text-orange-500" />} label="Temp" value="36.6" color="orange" />
          </div>
        </div>
      </div>

      {/* Smart Medication Alert Logic Section */}
      <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-md">
        <h3 className="text-sm font-medium mb-4">Current Medication</h3>
        <div className="flex items-center justify-between bg-white/5 p-4 rounded-2xl border border-white/5">
          <div>
            <p className="text-sm font-bold">Amoxicillin 500mg</p>
            <p className="text-[10px] text-gray-400 italic">Next dose: 2:00 PM</p>
          </div>
          <button 
            onClick={() => setAlert(true)}
            className="px-4 py-2 bg-cyan-600/20 border border-cyan-500/50 rounded-xl text-xs text-cyan-400 hover:bg-cyan-500 hover:text-black transition-all"
          >
            Confirm Dose
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function Vital({ icon, label, value, color }) {
  return (
    <div className="text-center">
      <div className="flex justify-center mb-2">{icon}</div>
      <p className="text-xl font-bold">{value}</p>
      <p className="text-[9px] text-gray-400 uppercase tracking-tighter">{label}</p>
    </div>
  );
}
