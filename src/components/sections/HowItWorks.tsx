"use client";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";

const steps = [
  {
    step: "01",
    icon: "📸",
    title: "Photograph your furniture",
    description:
      "Take a few photos of each piece from different angles. No measuring tape needed — our computer vision handles it.",
    detail: "Works with any smartphone camera",
  },
  {
    step: "02",
    icon: "🏠",
    title: "Tell us your new apartment",
    description:
      "Enter your new address, paste a Zillow link, or upload a floor plan PDF. We extract room dimensions automatically.",
    detail: "Supports Zillow, StreetEasy, Apartments.com",
  },
  {
    step: "03",
    icon: "🧠",
    title: "AI runs the numbers",
    description:
      "Our model calculates exact furniture dimensions, maps them to your floor plan, and simulates every doorway, hallway, and corner.",
    detail: "Results in under 60 seconds",
  },
  {
    step: "04",
    icon: "✅",
    title: "Move with confidence",
    description:
      "Get a full Move Report: what fits, what won't, tight spots to watch, and an optimal room layout — before the truck arrives.",
    detail: "Green, yellow, or red for every item",
  },
];

export function HowItWorks() {
  const { ref, inView } = useInView();

  return (
    <section
      id="how-it-works"
      ref={ref}
      className="py-24 lg:py-32 px-5"
      aria-labelledby="how-it-works-heading"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-3">
            Simple process
          </p>
          <h2
            id="how-it-works-heading"
            className="text-4xl md:text-5xl font-bold text-white tracking-tight"
          >
            From photos to plan
            <br />
            <span className="gradient-text">in minutes.</span>
          </h2>
          <p className="mt-4 text-lg text-slate-400 max-w-xl mx-auto">
            Four steps stand between you and knowing exactly what fits.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line — desktop */}
          <div
            className="hidden lg:block absolute top-16 left-0 right-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(59,130,246,0.3) 20%, rgba(99,102,241,0.3) 80%, transparent)",
            }}
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.12 }}
              >
                <div
                  className="group relative glass rounded-2xl p-6 h-full hover:border-white/[0.12] transition-all duration-300"
                  style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.2)" }}
                >
                  {/* Step number */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                      style={{
                        background: "linear-gradient(135deg, rgba(59,130,246,0.2), rgba(99,102,241,0.1))",
                        border: "1px solid rgba(59,130,246,0.3)",
                        color: "#93c5fd",
                      }}
                    >
                      {s.step}
                    </div>
                    <span className="text-2xl" role="img" aria-label="">
                      {s.icon}
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-white mb-2">{s.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-4">{s.description}</p>

                  <div
                    className="inline-flex items-center gap-1.5 text-xs rounded-full px-3 py-1"
                    style={{
                      background: "rgba(59,130,246,0.08)",
                      color: "#93c5fd",
                      border: "1px solid rgba(59,130,246,0.15)",
                    }}
                  >
                    <span className="w-1 h-1 rounded-full bg-blue-400" aria-hidden="true" />
                    {s.detail}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
