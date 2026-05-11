import { motion } from 'framer-motion';
import { Calendar, Video, ShieldCheck } from 'lucide-react';

const doctors = [
  { id: 1, name: "Dr. Aryan Sharma", spec: "Cardiologist", rating: "4.9" },
  { id: 2, name: "Dr. Sarah Ahmed", spec: "Neurologist", rating: "5.0" }
];

export default function DoctorPortal() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold tracking-tighter italic">Appointment Nexus</h2>
      
      {doctors.map((doc) => (
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-xl relative group"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-cyan-400 text-[10px] uppercase tracking-widest font-bold">Specialist</p>
              <h3 className="text-lg font-bold">{doc.name}</h3>
              <p className="text-gray-400 text-xs">{doc.spec}</p>
            </div>
            <div className="bg-cyan-500/10 p-3 rounded-2xl border border-cyan-500/20">
              <ShieldCheck className="text-cyan-400" size={20} />
            </div>
          </div>

          <button className="w-full py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2">
            <Calendar size={14} /> Schedule Consultation
          </button>
        </motion.div>
      ))}
    </div>
  );
}
