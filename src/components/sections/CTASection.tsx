"use client";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { WaitlistForm } from "@/components/ui/WaitlistForm";

export function CTASection() {
  const { ref, inView } = useInView();

  return (
    <section
      ref={ref}
      className="py-24 lg:py-32 px-5"
      aria-labelledby="cta-heading"
    >
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          {/* Glow card */}
          <div
            className="relative rounded-3xl p-10 md:p-16 overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(59,130,246,0.08) 0%, rgba(99,102,241,0.06) 50%, rgba(139,92,246,0.08) 100%)",
              border: "1px solid rgba(59,130,246,0.15)",
              boxShadow: "0 0 80px rgba(59,130,246,0.12), 0 0 0 1px rgba(255,255,255,0.04)",
            }}
          >
            {/* Background glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              aria-hidden="true"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.12) 0%, transparent 70%)",
              }}
            />

            <div className="relative z-10">
              <div className="text-5xl mb-5" role="img" aria-label="">
                🚚
              </div>
              <h2
                id="cta-heading"
                className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4"
              >
                Stop guessing.
                <br />
                <span className="gradient-text">Start knowing.</span>
              </h2>
              <p className="text-lg text-slate-400 mb-8 max-w-xl mx-auto">
                Join thousands of renters who are done with furniture returns, stressed moves, and
                couches stuck in stairwells.
              </p>

              <WaitlistForm />

              <div className="mt-8 flex items-center justify-center gap-6 text-xs text-slate-600">
                <span className="flex items-center gap-1.5">
                  <span className="text-green-500" aria-hidden="true">✓</span> Free during beta
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-green-500" aria-hidden="true">✓</span> No credit card
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-green-500" aria-hidden="true">✓</span> Founding member pricing
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
