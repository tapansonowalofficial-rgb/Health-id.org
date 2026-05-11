import { motion } from 'framer-motion';
import { ShieldAlert, MapPin, PhoneCall, BellRing } from 'lucide-react';

export default function GuardianDashboard({ childData }) {
  // Logic: Only show red theme if alert is active
  const isEmergency = childData.alertActive;

  return (
    <div className="space-y-6">
      <header className="flex items-center gap-3 mb-8">
        <div className="h-12 w-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
          <ShieldAlert className="text-cyan-400" />
        </div>
        <div>
          <h2 className="text-lg font-bold tracking-tighter">Guardian Nexus</h2>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest">Monitoring: {childData.name}</p>
        </div>
      </header>

      {/* Emergency Status Card */}
      <motion.div 
        animate={isEmergency ? { scale: [1, 1.02, 1] } : {}}
        transition={{ repeat: Infinity, duration: 2 }}
        className={`p-6 rounded-[32px] border ${isEmergency ? 'bg-red-500/10 border-red-500/50' : 'bg-white/5 border-white/10'} backdrop-blur-3xl`}
      >
        <div className="flex justify-between items-start mb-6">
          <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-tighter ${isEmergency ? 'bg-red-500 text-white' : 'bg-green-500/20 text-green-400'}`}>
            {isEmergency ? 'Action Required' : 'Status: Stable'}
          </span>
          <BellRing size={18} className={isEmergency ? 'text-red-500 animate-bounce' : 'text-gray-600'} />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <p className="text-3xl font-bold tracking-tighter">{childData.lastHeartRate} <span className="text-sm font-light text-gray-400 uppercase">BPM</span></p>
            <div className="text-right">
              <p className="text-[10px] text-gray-500 uppercase">Last Med Dose</p>
              <p className={isEmergency ? 'text-red-400 font-bold' : 'text-white'}>{childData.lastMedStatus}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Action Matrix */}
      <div className="grid grid-cols-2 gap-4">
        <button className="flex flex-col items-center justify-center p-6 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-all group">
          <MapPin className="text-cyan-400 mb-2 group-hover:scale-110 transition-transform" />
          <span className="text-[10px] font-bold uppercase">Track Location</span>
        </button>
        <button className="flex flex-col items-center justify-center p-6 bg-red-500/10 border border-red-500/20 rounded-3xl hover:bg-red-500/20 transition-all group">
          <PhoneCall className="text-red-500 mb-2 group-hover:scale-110 transition-transform" />
          <span className="text-[10px] font-bold uppercase">Emergency Call</span>
        </button>
      </div>
    </div>
  );
}
