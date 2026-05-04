"use client";

import React, { useState } from "react";

const RECORDS = [
  {
    id: 1,
    type: "LAB",
    title: "Lipid Panel",
    date: "2024-10-24",
    status: "VERIFIED",
  },
  {
    id: 2,
    type: "RX",
    title: "Medication",
    date: "2024-11-12",
    status: "ACTIVE",
  },
];

export default function NeuralVault() {
  const [filter, setFilter] = useState("ALL");

  const filtered = RECORDS.filter(
    (r) => filter === "ALL" || r.type === filter
  );

  return (
    <div className="p-6 bg-black/30 rounded-2xl">
      <h3 className="text-white mb-4">Secure Vault</h3>

      <div className="flex gap-2 mb-4">
        {["ALL", "LAB", "RX"].map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className="px-3 py-1 bg-gray-700 rounded"
          >
            {t}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map((r) => (
          <div
            key={r.id}
            className="p-3 bg-black/40 rounded"
          >
            <p className="text-white">{r.title}</p>
            <p className="text-gray-400 text-xs">{r.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}