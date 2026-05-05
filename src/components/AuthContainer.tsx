"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, UserPlus, Fingerprint, ArrowRight } from 'lucide-react';

export default function AuthContainer() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#00000a] p-4 font-rajdhani">
      {/* Dynamic Background Glow */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,229,255,0.1),transparent_50%)]" />

      <motion.div 
        layout
        className="relative z-10 w-full max-w-md overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)]"
      >
        <AnimatePresence mode="wait">
          {isLogin ? (
            <motion.div
              key="login"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <header className="mb-8 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-cyan/30 bg-cyan/10">
                  <Fingerprint className="text-cyan animate-pulse" size={32} />
                </div>
                <h1 className="font-orbitron text-2xl font-black tracking-tighter text-white">ACCESS NEURAL LINK</h1>
                <p className="text-xs font-mono uppercase tracking-widest text-cyan/60">Identify yourself to proceed</p>
              </header>

              <div className="space-y-4">
                <InputGroup type="email" placeholder="NEURAL EMAIL" />
                <InputGroup type="password" placeholder="SECURITY KEY" />
                
                <button className="group relative w-full overflow-hidden rounded-xl bg-cyan py-4 font-orbitron text-sm font-bold text-black transition-all hover:bg-neon">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    INITIALIZE AUTH <ArrowRight size={16} />
                  </span>
                </button>
              </div>

              <p className="mt-8 text-center text-sm text-slate-400">
                New to the network? 
                <button onClick={() => setIsLogin(false)} className="ml-2 text-cyan hover:underline font-bold">CREATE IDENTITY</button>
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="signup"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <header className="mb-8 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-neon/30 bg-neon/10">
                  <UserPlus className="text-neon" size={32} />
                </div>
                <h1 className="font-orbitron text-2xl font-black tracking-tighter text-white">CREATE IDENTITY</h1>
                <p className="text-xs font-mono uppercase tracking-widest text-neon/60">Establish your digital health twin</p>
              </header>

              <div className="space-y-4">
                <InputGroup type="text" placeholder="FULL LEGAL NAME" />
                <InputGroup type="email" placeholder="NEURAL EMAIL" />
                <div className="grid grid-cols-2 gap-4">
                    <InputGroup type="text" placeholder="AGE" />
                    <InputGroup type="text" placeholder="BLOOD TYPE" />
                </div>
                
                <button className="group relative w-full overflow-hidden rounded-xl bg-neon py-4 font-orbitron text-sm font-bold text-black transition-all hover:bg-cyan">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    ESTABLISH LINK <ShieldCheck size={16} />
                  </span>
                </button>
              </div>

              <p className="mt-8 text-center text-sm text-slate-400">
                Already registered? 
                <button onClick={() => setIsLogin(true)} className="ml-2 text-neon hover:underline font-bold">LOG IN</button>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function InputGroup({ type, placeholder }: { type: string; placeholder: string }) {
  return (
    <div className="relative group">
      <input 
        type={type} 
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/10 bg-void/50 p-4 font-mono text-xs text-white outline-none transition-all focus:border-cyan/50 focus:bg-cyan/5 placeholder:text-white/20"
      />
      <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-cyan transition-all duration-300 group-focus-within:w-full" />
    </div>
  );
}
