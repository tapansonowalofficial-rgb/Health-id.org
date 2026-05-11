import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Activity, Bell, Camera, User, Zap } from 'lucide-react';
import Dashboard from './components/Dashboard';
import AIOracle from './components/AIOracle';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [alertTriggered, setAlertTriggered] = useState(false);

  // Logic: Escalation Alert for Parents
  useEffect(() => {
    let timer;
    if (alertTriggered) {
      timer = setTimeout(() => {
        alert("CRITICAL: User unresponsive. Notifying linked parent/ICE...");
        // Here you would trigger an API call to Twilio/Firebase
      }, 15000); // 15s for demo, normally 15m
    }
    return () => clearTimeout(timer);
  }, [alertTriggered]);

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-hidden font-sans selection:bg-cyan-500">
      {/* Background Deep Space Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-900/20 blur-[120px] rounded-full" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/20 blur-[120px] rounded-full" />

      {/* Main Content Area */}
      <main className="relative z-10 pb-24 max-w-lg mx-auto px-6 pt-12">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tighter italic">HEALTH-ID</h1>
            <p className="text-[10px] text-cyan-400 tracking-widest uppercase">Omniscience v1.0</p>
          </div>
          <div className="h-10 w-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center backdrop-blur-md">
            <User size={18} className="text-cyan-400" />
          </div>
        </header>

        {activeTab === 'dashboard' ? <Dashboard setAlert={setAlertTriggered} /> : <AIOracle />}
      </main>

      {/* Dsingr-Style Floating Dock */}
      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-white/5 border border-white/10 backdrop-blur-2xl px-6 py-4 rounded-3xl flex gap-8 items-center shadow-2xl">
        <NavIcon icon={<Activity />} active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
        <NavIcon icon={<Camera />} />
        <NavIcon icon={<Zap />} active={activeTab === 'ai'} onClick={() => setActiveTab('ai')} />
        <NavIcon icon={<Bell />} />
      </nav>
    </div>
  );
}

function NavIcon({ icon, active, onClick }) {
  return (
    <button onClick={onClick} className={`transition-all duration-300 ${active ? 'text-cyan-400 scale-125' : 'text-gray-500'}`}>
      {icon}
    </button>
  );
}
