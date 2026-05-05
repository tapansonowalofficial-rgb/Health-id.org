"use client";
import { useAuth } from '@/components/auth/AuthProvider';
import BiometricCard from '@/components/BiometricCard';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <main className="min-h-screen bg-[#00000a] text-white p-8">
      <header className="mb-12">
        <p className="text-neon text-[10px] font-mono animate-pulse">● NEURAL LINK ACTIVE</p>
        <h1 className="text-4xl font-orbitron font-black tracking-tighter">
          {user?.displayName || "OPERATOR"}
        </h1>
        <p className="text-white/40 font-mono text-xs uppercase">UID: {user?.uid.slice(0, 8)}...</p>
      </header>

      {/* Grid and AI Sections as previously designed */}
    </main>
  );
}
