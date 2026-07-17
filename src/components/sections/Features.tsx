"use client";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";

const features = [
  {
    icon: "📐",
    title: "Photo Measurement",
    description:
      "Computer vision estimates furniture dimensions from smartphone photos within 2–4 inches — no tape measure required.",
    tag: "Core AI",
    tagColor: "blue",
  },
  {
    icon: "🚪",
    title: "Doorway Prediction",
    description:
      "We model every doorway, hallway, and tight corner in your new apartment, including whether you can angle or tilt items through.",
    tag: "Spatial AI",
    tagColor: "violet",
  },
  {
    icon: "🗺️",
    title: "Room Layout Planner",
    description:
      "Drag furniture into your new floor plan and see predicted fit before you move a single box. Instantly rearrange to find the ideal setup.",
    tag: "Planning",
    tagColor: "cyan",
  },
  {
    icon: "🏆",
    title: "Move Score",
    description:
      "A single 0–10 score that summarizes how well your furniture will fit your new space, with a breakdown by room.",
    tag: "Insights",
    tagColor: "blue",
  },
  {
    icon: "📋",
    title: "Moving Checklist",
    description:
      "Auto-generated moving checklist tailored to your specific furniture and new apartment — from disassembly notes to elevator reservations.",
    tag: "Planning",
    tagColor: "violet",
  },
  {
    icon: "🏢",
    title: "Floor Plan Import",
    description:
      "Paste a Zillow, StreetEasy, or Apartments.com URL and we extract dimensions automatically. Or upload your own PDF floor plan.",
    tag: "Integrations",
    tagColor: "cyan",
  },
  {
    icon: "📦",
    title: "Packing Suggestions",
    description:
      "Know which items to disassemble, which to wrap, and in what order to pack the truck for the smoothest possible unload.",
    tag: "Planning",
    tagColor: "blue",
  },
  {
    icon: "🗃️",
    title: "Furniture Inventory",
    description:
      "Build a complete digital inventory of everything you own with AI-detected dimensions, photos, and notes — useful long after moving day.",
    tag: "Organization",
    tagColor: "violet",
  },
  {
    icon: "📏",
    title: "AI Dimensions",
    description:
      "Our model cross-references detected furniture against a database of 2M+ items for enhanced accuracy, flagging when extra verification is smart.",
    tag: "Core AI",
    tagColor: "cyan",
  },
];

const tagColors: Record<string, { bg: string; text: string; border: string }> = {
  blue: {
    bg: "rgba(59,130,246,0.08)",
    text: "#93c5fd",
    border: "rgba(59,130,246,0.2)",
  },
  violet: {
    bg: "rgba(139,92,246,0.08)",
    text: "#c4b5fd",
    border: "rgba(139,92,246,0.2)",
  },
  cyan: {
    bg: "rgba(6,182,212,0.08)",
    text: "#67e8f9",
    border: "rgba(6,182,212,0.2)",
  },
};

export function Features() {
  const { ref, inView } = useInView();

  return (
    <section
      id="features"
      ref={ref}
      className="py-24 lg:py-32 px-5"
      aria-labelledby="features-heading"
      style={{
        background:
          "linear-gradient(to bottom, transparent, rgba(59,130,246,0.03) 50%, transparent)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-3">
            Everything you need
          </p>
          <h2
            id="features-heading"
            className="text-4xl md:text-5xl font-bold text-white tracking-tight"
          >
            Built for renters
            <br />
            <span className="gradient-text">who&apos;ve been burned before.</span>
          </h2>
          <p className="mt-4 text-lg text-slate-400 max-w-xl mx-auto">
            Every feature exists because a real renter had to return a couch on moving day.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => {
            const colors = tagColors[f.tagColor];
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.05 * i }}
              >
                <div
                  className="group glass rounded-2xl p-6 h-full hover:border-white/[0.12] hover:shadow-lg transition-all duration-300 cursor-default"
                  style={{
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 32px rgba(0,0,0,0.3), 0 0 0 1px rgba(59,130,246,0.1)`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-3xl" role="img" aria-label="">
                      {f.icon}
                    </span>
                    <span
                      className="text-xs font-medium rounded-full px-2.5 py-0.5"
                      style={{
                        background: colors.bg,
                        color: colors.text,
                        border: `1px solid ${colors.border}`,
                      }}
                    >
                      {f.tag}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-white mb-2">{f.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{f.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
