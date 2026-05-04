"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import React, { useEffect, useState } from "react";
import QRCode from "qrcode";

type UserData = {
  name: string;
  hid: string;
  bloodType: string;
  emergencyPhone: string;
};

export default function NeuralIdentityCard({ userData }: { userData: UserData }) {
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  // 3D Tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);

  useEffect(() => {
    const generateQR = async () => {
      try {
        const secureData = `https://health-id.in/emergency/${userData.hid}`;

        const url = await QRCode.toDataURL(secureData, {
          color: {
            dark: "#00e5ff",
            light: "#00000000",
          },
          margin: 1,
        });

        setQrCodeUrl(url);
      } catch (err) {
        console.error("QR generation failed:", err);
      }
    };

    if (userData?.hid) generateQR();
  }, [userData]);

  return (
    <div className="flex items-center justify-center perspective-1000 p-6">
      <motion.div
        style={{ x, y, rotateX, rotateY }}
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        className="relative w-full max-w-[380px] h-[220px] rounded-2xl bg-gradient-to-br from-cyan-900/30 via-cyan-500/10 to-purple-500/10 border border-white/20 backdrop-blur-3xl p-6 shadow-[0_20px_50px_rgba(0,229,255,0.2)] overflow-hidden cursor-grab active:cursor-grabbing"
      >
        {/* Scanline */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent animate-[scan_3s_linear_infinite]" />

        <div className="relative z-10 flex justify-between h-full">
          {/* LEFT */}
          <div className="flex flex-col justify-between">
            <div>
              <span className="text-[10px] text-cyan-300 uppercase font-mono">
                Neural Health Identity
              </span>
              <h2 className="text-2xl font-bold text-white">
                {userData.name}
              </h2>
              <p className="text-cyan-400 text-xs">{userData.hid}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[8px] text-gray-400 uppercase">Blood</p>
                <p className="text-red-400 font-bold">
                  {userData.bloodType}
                </p>
              </div>
              <div>
                <p className="text-[8px] text-gray-400 uppercase">Status</p>
                <p className="text-green-400 font-bold">VERIFIED</p>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col items-end justify-between">
            <div className="p-2 bg-black/40 rounded-xl border border-cyan-400/30">
              {qrCodeUrl && (
                <img
                  src={qrCodeUrl}
                  alt="QR"
                  className="w-20 h-20"
                />
              )}
            </div>

            <div className="text-right">
              <p className="text-[8px] text-gray-400 uppercase">
                Emergency
              </p>
              <p className="text-white text-xs">
                {userData.emergencyPhone}
              </p>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes scan {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100%); }
          }
          .perspective-1000 { perspective: 1000px; }
        `}</style>
      </motion.div>
    </div>
  );
}