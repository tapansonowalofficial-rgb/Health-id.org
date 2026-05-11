const RegisterForm = ({ setMode }) => (
  <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }}>
    <h2 className="text-xl font-bold mb-1">Create Health Ecosystem</h2>
    <p className="text-xs text-gray-500 mb-6 uppercase tracking-widest">Step 01: Secure Registration</p>

    <div className="space-y-3">
      <input type="text" placeholder="Full Legal Name" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm" />
      <input type="email" placeholder="Secure Email" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm" />
      
      <div className="pt-4 border-t border-white/5 mt-4">
        <p className="text-[10px] text-cyan-400 font-bold uppercase mb-3">Parent/Guardian Link (Fail-Safe)</p>
        <input type="tel" placeholder="Parent Emergency Mobile" className="w-full bg-white/10 border border-cyan-500/20 rounded-xl p-4 text-sm text-cyan-100 placeholder:text-cyan-900/50 shadow-[inset_0_0_10px_rgba(6,182,212,0.05)]" />
      </div>

      <button className="w-full py-4 bg-white text-black font-bold rounded-2xl mt-4 hover:bg-cyan-400 transition-colors">
        Deploy Account
      </button>
      
      <button onClick={() => setMode('login')} className="w-full text-center text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-4">
        Already Encrypted? Log In
      </button>
    </div>
  </motion.div>
);
