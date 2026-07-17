"use client";
import { motion } from "framer-motion";

const items = [
  {
    emoji: "🛋️",
    label: "Living room sofa",
    dims: "86\" × 38\" × 34\"",
    status: "fits",
    statusLabel: "Fits perfectly",
    color: "#22c55e",
    bg: "rgba(34,197,94,0.12)",
    border: "rgba(34,197,94,0.25)",
    icon: "✓",
  },
  {
    emoji: "🪑",
    label: "Dining table",
    dims: "72\" × 36\" × 30\"",
    status: "warning",
    statusLabel: "Tight doorway",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.12)",
    border: "rgba(245,158,11,0.25)",
    icon: "⚠",
  },
  {
    emoji: "🪞",
    label: "Tall dresser",
    dims: "32\" × 20\" × 60\"",
    status: "error",
    statusLabel: "Won't fit — 2\" too wide",
    color: "#ef4444",
    bg: "rgba(239,68,68,0.12)",
    border: "rgba(239,68,68,0.25)",
    icon: "✕",
  },
];

export function PhoneMockup() {
  return (
    <div className="relative flex justify-center items-center">
      {/* Glow behind phone */}
      <div
        className="absolute inset-0 blur-3xl opacity-30"
        style={{
          background: "radial-gradient(ellipse at center, #3b82f6 0%, #6366f1 40%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Phone frame */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        style={{
          animation: "float 6s ease-in-out infinite",
        }}
        className="relative z-10"
      >
        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-12px); }
          }
        `}</style>

        {/* Phone outer shell */}
        <div
          className="relative rounded-[44px] p-[3px]"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05))",
            boxShadow:
              "0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08), inset 0 0 0 1px rgba(255,255,255,0.05)",
            width: "280px",
          }}
        >
          {/* Phone body */}
          <div
            className="rounded-[42px] overflow-hidden"
            style={{ background: "#0a0f1e" }}
          >
            {/* Notch */}
            <div className="relative flex justify-center pt-3 pb-2 px-8" style={{ background: "#0a0f1e" }}>
              <div
                className="w-24 h-7 rounded-full flex items-center justify-center gap-2"
                style={{ background: "#050a14" }}
              >
                <div className="w-2 h-2 rounded-full" style={{ background: "#1e2a3a" }} />
                <div className="w-3 h-3 rounded-full" style={{ background: "#1a2535" }} />
              </div>
            </div>

            {/* Screen content */}
            <div className="px-4 pb-8 pt-1 space-y-1" style={{ minHeight: "480px" }}>
              {/* App header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest">Move Check</p>
                  <p className="text-sm font-semibold text-white">2BR Apartment · 847 sq ft</p>
                </div>
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #3b82f6, #6366f1)" }}
                >
                  <span className="text-xs text-white font-bold">AI</span>
                </div>
              </div>

              {/* Move score */}
              <div
                className="rounded-2xl p-3 mb-3"
                style={{
                  background: "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(99,102,241,0.1))",
                  border: "1px solid rgba(59,130,246,0.2)",
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[9px] text-blue-400 uppercase tracking-widest mb-0.5">Move Score</p>
                    <p className="text-2xl font-bold text-white">7<span className="text-sm text-slate-400">/10</span></p>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] text-slate-500">3 items checked</p>
                    <p className="text-[10px] text-yellow-400 mt-0.5">1 issue to resolve</p>
                  </div>
                </div>
                <div className="mt-2 h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: "70%",
                      background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
                    }}
                  />
                </div>
              </div>

              {/* Furniture items */}
              {items.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6 + i * 0.15, duration: 0.5 }}
                >
                  <div
                    className="rounded-2xl p-3"
                    style={{
                      background: item.bg,
                      border: `1px solid ${item.border}`,
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                        style={{ background: "rgba(255,255,255,0.05)" }}
                      >
                        {item.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-medium text-white truncate">{item.label}</p>
                        <p className="text-[9px] text-slate-500">{item.dims}</p>
                      </div>
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold"
                        style={{ background: item.bg, color: item.color, border: `1.5px solid ${item.color}` }}
                      >
                        {item.icon}
                      </div>
                    </div>
                    <div className="mt-2 flex items-center gap-1.5">
                      <div
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: item.color }}
                      />
                      <p className="text-[9px] font-medium" style={{ color: item.color }}>
                        {item.statusLabel}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Bottom CTA */}
              <div className="pt-2">
                <div
                  className="w-full rounded-xl py-2.5 text-center text-[11px] font-semibold text-white"
                  style={{ background: "linear-gradient(135deg, #3b82f6, #6366f1)" }}
                >
                  View Full Report →
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Phone shine effect */}
        <div
          className="absolute inset-0 rounded-[44px] pointer-events-none overflow-hidden"
          style={{ mixBlendMode: "screen" }}
          aria-hidden="true"
        >
          <div
            className="absolute top-0 left-0 w-1/2 h-full opacity-[0.03]"
            style={{
              background: "linear-gradient(105deg, white 0%, transparent 60%)",
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}
