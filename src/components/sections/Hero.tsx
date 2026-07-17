"use client";
import { motion } from "framer-motion";
import { PhoneMockup } from "@/components/ui/PhoneMockup";
import { WaitlistForm } from "@/components/ui/WaitlistForm";

const stats = [
  { value: "94%", label: "prediction accuracy" },
  { value: "< 60s", label: "to check all furniture" },
  { value: "2–4\"", label: "measurement precision" },
];

export function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 pb-16 px-5"
      aria-label="Hero"
    >
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div
          className="blob absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #3b82f6, transparent 70%)" }}
        />
        <div
          className="blob blob-delay-2 absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #8b5cf6, transparent 70%)" }}
        />
        <div
          className="blob blob-delay-4 absolute -bottom-20 left-1/3 w-[400px] h-[400px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #06b6d4, transparent 70%)" }}
        />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left column — copy */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 text-xs font-medium"
              style={{
                background: "rgba(59,130,246,0.1)",
                border: "1px solid rgba(59,130,246,0.25)",
                color: "#93c5fd",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              Now accepting early access signups
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-5"
            >
              Will your
              <br />
              <span className="gradient-text">furniture fit?</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-400 leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0"
            >
              Take pictures of your furniture. Our AI measures it and predicts whether everything
              fits in your new apartment — before the moving truck shows up.
            </motion.p>

            {/* Waitlist form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              id="waitlist"
              className="mb-10 lg:mb-0"
            >
              <WaitlistForm />
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="hidden lg:flex items-center gap-6 mt-10 pt-8 border-t border-white/[0.06]"
            >
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right column — phone mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex justify-center lg:justify-end"
          >
            <PhoneMockup />
          </motion.div>
        </div>

        {/* Mobile stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="lg:hidden flex items-center justify-center gap-8 mt-10 pt-8 border-t border-white/[0.06]"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
        <div className="flex flex-col items-center gap-1.5">
          <p className="text-xs text-slate-600 uppercase tracking-widest">Scroll</p>
          <div className="w-5 h-8 rounded-full border border-white/10 flex justify-center pt-1.5">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-1 rounded-full bg-blue-500"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
