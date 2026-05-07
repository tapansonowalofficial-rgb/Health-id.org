"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Shield, QrCode, FileText, User, Bell } from 'lucide-react';

const BentoCard = ({ title, icon: Icon, children, className = "" }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.02 }}
    className={`bg-[#1A1A1A] border border-white/10 rounded-3xl p-6 hover:border-blue-500/50 transition-colors shadow-2xl ${className}`}
  >
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-gray-400 font-medium text-sm flex items-center gap-2">
        <Icon size={18} className="text-blue-500" /> {title}
      </h3>
    </div>
    {children}
  </motion.div>
);

export default function HealthDashboard() {
  return (
    <main className="min-h-screen bg-[#0D0D0D] text-white p-6 md:p-12 font-sans">
      {/* Header */}
      <header className="max-w-7xl mx-auto flex justify-between items-center mb-12">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter">NEURAL HEALTH ID</h1>
          <p className="text-gray-500">Secure. Decentralized. Intelligent.</p>
        </div>
        <div className="flex gap-4">
          <button className="bg-white/5 p-3 rounded-full border border-white/10 hover:bg-white/10">
            <Bell size={20} />
          </button>
          <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 border-2 border-white/20" />
        </div>
      </header>

      {/* Bento Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Main Neural ID Card */}
        <BentoCard title="Digital Identity" icon={Shield} className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A]">
          <div className="flex flex-col justify-between h-full py-4">
            <div>
              <p className="text-4xl font-mono tracking-widest text-blue-500 mb-2">HID-2026-99X</p>
              <p className="text-gray-400">Tapan Sonowal</p>
            </div>
            <div className="mt-8 p-4 bg-white/[0.03] rounded-2xl border border-white/5 backdrop-blur-md">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">ENCRYPTION STATUS</span>
                <span className="text-xs text-green-500 font-bold">SHA-256 ACTIVE</span>
              </div>
            </div>
          </div>
        </BentoCard>

        {/* QR Access Card */}
        <BentoCard title="Quick Access" icon={QrCode} className="md:col-span-1">
          <div className="flex justify-center items-center py-6">
            <div className="w-24 h-24 bg-white p-2 rounded-xl">
              <div className="w-full h-full bg-black rounded-lg" /> {/* Placeholder for QR */}
            </div>
          </div>
        </BentoCard>

        {/* Vitals Card */}
        <BentoCard title="Real-time Vitals" icon={Activity} className="md:col-span-1">
          <div className="mt-2">
            <span className="text-3xl font-bold">72</span>
            <span className="text-gray-500 ml-2 text-sm">BPM</span>
            <div className="w-full bg-white/5 h-1.5 rounded-full mt-4 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "70%" }}
                className="bg-blue-500 h-full" 
              />
            </div>
          </div>
        </BentoCard>

        {/* Medical History List */}
        <BentoCard title="Recent Records" icon={FileText} className="md:col-span-2">
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                    <FileText size={16} className="text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Lab Report #{i}042</p>
                    <p className="text-xs text-gray-500">May 2026 • Apollo Clinic</p>
                  </div>
                </div>
                <button className="text-xs font-bold text-blue-500">VIEW</button>
              </div>
            ))}
          </div>
        </BentoCard>
      </div>
    </main>
  );
}
