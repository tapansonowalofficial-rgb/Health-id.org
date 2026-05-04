"use client";

import React, { useState, useEffect } from "react";

export default function NeuralSOS() {
  const [active, setActive] = useState(false);
  const [step, setStep] = useState(0);

  const steps = [
    "Locating hospital...",
    "Sending data...",
    "Notifying contacts...",
    "Help is on the way",
  ];

  useEffect(() => {
    if (!active) return;

    const interval = setInterval(() => {
      setStep((prev) => Math.min(prev + 1, steps.length - 1));
    }, 2000);

    return () => clearInterval(interval);
  }, [active]);

  return (
    <div className="p-6 bg-black/30 rounded-2xl text-center">
      <button
        onClick={() => {
          setActive(!active);
          setStep(0);
        }}
        className="w-24 h-24 rounded-full bg-red-600 text-white text-xl"
      >
        SOS
      </button>

      <div className="mt-4 text-white">
        {active && steps[step]}
      </div>
    </div>
  );
}