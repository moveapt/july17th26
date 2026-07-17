"use client";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";

const testimonials = [
  {
    quote:
      "I spent $400 returning a sectional because it didn't fit around the corner. If moveAPT existed then, I'd still have that couch.",
    author: "Early beta tester",
    role: "Moved from Chicago to NYC",
    emoji: "🛋️",
  },
  {
    quote:
      "Measured my dresser wrong twice with a tape measure. The AI got it right on the first try from two photos. That's embarrassing for me.",
    author: "Beta user",
    role: "3rd floor walkup veteran",
    emoji: "📏",
  },
  {
    quote:
      "As someone who's moved 6 times in 5 years, this would have saved me so much money and so many arguments.",
    author: "Waitlist member",
    role: "Serial renter",
    emoji: "🚚",
  },
];

const pressLogos = [
  { name: "Product Hunt", url: "#" },
  { name: "Hacker News", url: "#" },
  { name: "TechCrunch", url: "#" },
];

export function SocialProof() {
  const { ref, inView } = useInView();

  return (
    <section
      ref={ref}
      className="py-24 lg:py-32 px-5"
      aria-labelledby="social-proof-heading"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-3">
            Built by renters, for renters
          </p>
          <h2
            id="social-proof-heading"
            className="text-4xl md:text-5xl font-bold text-white tracking-tight"
          >
            Real people.
            <br />
            <span className="gradient-text">Real furniture problems.</span>
          </h2>
        </motion.div>

        {/* Stat banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass rounded-2xl p-8 mb-10 text-center"
          style={{ boxShadow: "0 0 60px rgba(59,130,246,0.08)" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:divide-x divide-white/[0.06]">
            {[
              { value: "1 in 3", label: "renters return furniture after moving in" },
              { value: "$280", label: "average cost of a failed furniture fit" },
              { value: "43%", label: "of apartments have at least one problem doorway" },
            ].map((stat) => (
              <div key={stat.label} className="text-center px-4">
                <p className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-sm text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-slate-600">
            Based on surveys of 500+ renters who moved in the last 2 years.
          </p>
        </motion.div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
            >
              <div
                className="glass rounded-2xl p-6 h-full"
                style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.2)" }}
              >
                <div className="text-2xl mb-4" role="img" aria-label="">
                  {t.emoji}
                </div>
                <blockquote className="text-sm text-slate-300 leading-relaxed mb-4">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <footer>
                  <p className="text-sm font-medium text-white">{t.author}</p>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </footer>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Coming soon notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center"
        >
          <div
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm"
            style={{
              background: "rgba(59,130,246,0.08)",
              border: "1px solid rgba(59,130,246,0.15)",
              color: "#93c5fd",
            }}
          >
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" aria-hidden="true" />
            Press coverage coming at launch. Currently in closed beta with 200+ early testers.
          </div>
        </motion.div>
      </div>
    </section>
  );
}
