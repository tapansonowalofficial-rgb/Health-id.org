import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Mail, Lock, UserPlus, ArrowRight } from 'lucide-react';

export default function AuthContainer() {
  const [mode, setMode] = useState('login'); // login | register | forgot

  return (
    <div className="min-h-screen bg-[#020202] flex items-center justify-center p-6 font-sans">
      {/* Background Orbs */}
      <div className="fixed top-[-20%] right-[-10%] w-96 h-96 bg-cyan-600/10 blur-[100px] rounded-full" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white/5 border border-white/10 backdrop-blur-3xl rounded-[40px] p-8 shadow-2xl relative overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {mode === 'login' && <LoginForm setMode={setMode} key="login" />}
          {mode === 'register' && <RegisterForm setMode={setMode} key="register" />}
          {mode === 'forgot' && <ForgotForm setMode={setMode} key="forgot" />}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

const LoginForm = ({ setMode }) => (
  <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }}>
    <div className="text-center mb-8">
      <div className="h-16 w-16 bg-cyan-500/20 border border-cyan-500/50 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
        <ShieldCheck className="text-cyan-400" size={32} />
      </div>
      <h2 className="text-2xl font-bold tracking-tight">Identity Verification</h2>
      <p className="text-gray-500 text-xs mt-2 uppercase tracking-widest">Health-ID Secure Portal</p>
    </div>

    <div className="space-y-4">
      <div className="relative group">
        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-400 transition-colors" size={18} />
        <input type="email" placeholder="Access Email" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all" />
      </div>
      
      <div className="relative group">
        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-400 transition-colors" size={18} />
        <input type="password" placeholder="Encryption Key" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all" />
      </div>

      <button className="w-full bg-gradient-to-r from-cyan-600 to-blue-700 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all mt-6 group">
        Establish Connection <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
      </button>
    </div>

    <div className="mt-8 flex justify-between text-[10px] font-bold uppercase tracking-widest text-gray-500">
      <button onClick={() => setMode('register')} className="hover:text-cyan-400">Initialize New ID</button>
      <button onClick={() => setMode('forgot')} className="hover:text-cyan-400">Key Recovery</button>
    </div>
  </motion.div>
);
