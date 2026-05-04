import VitalsCard from '@/components/VitalsCard';
import { maskData } from '@/lib/security';

export default function DashboardPage() {
  const user = { name: "Tapan Sonowal", id: "123456789012" };

  return (
    <div className="min-h-screen bg-[#00000a] text-white p-6 font-rajdhani">
      {/* HUD Header */}
      <header className="mb-10 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-orbitron tracking-tighter uppercase font-black">
            {user.name}
          </h1>
          <p className="font-mono text-xs text-cyan opacity-60">
            ID: {maskData(user.id)}
          </p>
        </div>
        <div className="h-12 w-12 rounded-full border border-neon animate-pulse flex items-center justify-center">
          <div className="h-8 w-8 rounded-full bg-neon/20 blur-sm" />
        </div>
      </header>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <VitalsCard label="Heart Rate" value="72" unit="BPM" type="heart" />
        <VitalsCard label="Blood Oxygen" value="98" unit="%" type="oxygen" />
      </div>

      {/* Neural AI Section */}
      <section className="mt-8 p-6 rounded-3xl bg-gradient-to-br from-cyan/10 to-transparent border border-cyan/20">
        <h3 className="text-xs font-orbitron text-cyan mb-4 tracking-[0.2em]">NEURAL CORE INSIGHT</h3>
        <p className="text-slate-300 leading-relaxed text-sm">
          Biometric patterns indicate optimal recovery. Neural Link suggests 
          increasing hydration by 15% due to detected local temperature spikes.
        </p>
      </section>
    </div>
  );
}
