import BiometricCard from '@/components/BiometricCard';
import { maskID } from '@/lib/security';

export default function Dashboard() {
  const mockUser = { name: "TAPAN SONOWAL", id: "998100124567" };

  return (
    <main className="min-h-screen bg-[#00000a] text-white p-8 font-rajdhani">
      {/* HUD HEADER */}
      <div className="mb-12 border-l-2 border-cyan pl-6">
        <p className="text-neon text-[10px] font-mono mb-1 animate-pulse">● SYSTEM LIVE</p>
        <h1 className="text-4xl font-orbitron font-black tracking-tighter">{mockUser.name}</h1>
        <p className="text-white/40 font-mono text-xs">HID: {maskID(mockUser.id)}</p>
      </div>

      {/* BIOMETRIC GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <BiometricCard label="Heart Rate" value="72" unit="BPM" />
        <BiometricCard label="Oxygen Sat" value="99" unit="%" />
        <BiometricCard label="Neural Load" value="14" unit="ms" />
      </div>

      {/* AI INSIGHT SECTION */}
      <div className="mt-12 p-8 rounded-3xl bg-gradient-to-br from-cyan/5 to-transparent border border-white/5">
        <h3 className="font-orbitron text-xs text-cyan tracking-widest mb-4">NEURAL CORE ANALYSIS</h3>
        <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">
          Current heart rate variability indicates optimal parasympathetic tone. 
          Med-Scan suggests maintaining current hydration levels for the next 4 hours.
        </p>
      </div>
    </main>
  );
}
