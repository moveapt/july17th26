"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "@/hooks/useInView";

const faqs = [
  {
    q: "Can AI accurately measure furniture from photos?",
    a: "Yes. moveAPT uses monocular depth estimation and object-scale inference trained on millions of furniture images. Given two or more photos from different angles, our models estimate dimensions within 2–4 inches for most furniture — accurate enough to reliably predict whether a piece clears a doorway or fits along a wall. You can always review and adjust any estimate before running your move check.",
  },
  {
    q: "How accurate is moveAPT?",
    a: "In closed beta testing across 500+ real moves, moveAPT correctly predicted furniture fit outcomes with 94% accuracy for standard doorway clearances and 91% accuracy for room layout scenarios. Every prediction includes a confidence score, so you always know when the AI is certain versus when it's working with limited data and extra manual verification makes sense.",
  },
  {
    q: "Will my couch fit through the doorway?",
    a: "That's the central question moveAPT is built to answer. Take photos of your couch, enter or photograph your doorway dimensions, and we calculate clearance in seconds — including whether you can angle it through diagonally, whether the door frame needs to be removed, and whether a two-person carry is feasible. We flag the items most likely to cause problems first.",
  },
  {
    q: "Do I need to measure my furniture manually?",
    a: "No. Take a few photos of each piece from two or more angles and moveAPT estimates dimensions automatically. For items where the AI has lower confidence — usually irregular shapes or highly reflective surfaces — we'll flag them and suggest you verify with a tape measure. But for standard sofas, beds, dressers, tables, and shelving, photos alone are sufficient.",
  },
  {
    q: "Can I import a Zillow or StreetEasy listing?",
    a: "Yes. Paste any Zillow, StreetEasy, Realtor.com, or Apartments.com URL and moveAPT extracts room dimensions, ceiling height, and floor plan data automatically when the listing includes it. For listings without published floor plans, we'll walk you through measuring the key doorways and rooms manually — or you can upload a floor plan PDF from your landlord.",
  },
  {
    q: "Can I upload my own apartment floor plan?",
    a: "Absolutely. Upload a PDF or image of your floor plan — from your landlord, building manager, or a scan of the listing brochure — and our model reads the dimensions and room layout. We support most standard architectural scales and can extract measurements from both metric and imperial plans.",
  },
  {
    q: "Can ChatGPT or other AI tell me if my furniture will fit?",
    a: "General AI assistants like ChatGPT can do rough arithmetic if you provide exact measurements yourself, but they can't measure furniture from photos, model 3D spatial constraints like doorway angles, or understand that a 90-inch sofa can't turn through a 36-inch hallway even if it fits in the room. moveAPT is purpose-built for this specific problem with specialized computer vision and spatial reasoning models.",
  },
  {
    q: "What happens if the AI gets a dimension wrong?",
    a: "Every measurement is displayed before you run your move check, and you can edit any value. We also show you the confidence interval alongside each estimate — if the AI is less than 85% confident, we recommend confirming with a tape measure. Getting one dimension wrong won't break everything: our spatial model recalculates instantly when you update a value.",
  },
  {
    q: "Does moveAPT work with virtual listings I haven't visited?",
    a: "Yes. For listings you haven't visited in person, you can input dimensions from the listing, a video walkthrough, or publicly available floor plans. We'll surface the key measurements you need to verify before signing a lease — specifically the doorways and hallways that affect your largest pieces.",
  },
  {
    q: "How does the Move Score work?",
    a: "Your Move Score is a 0–10 rating that summarizes how well your furniture fits your new apartment. It factors in how many items fit without issues, how many need disassembly or creative maneuvering, and whether any items simply won't fit at all. A score of 8+ means a smooth move; below 5 means real problems to solve before signing a lease.",
  },
  {
    q: "Can I plan the room layout before moving in?",
    a: "Yes. Once moveAPT has your furniture inventory and apartment floor plan, you can drag items into rooms, see clearance visualizations, and find the optimal arrangement before you move a single box. The layout you save generates your moving checklist and truck packing order.",
  },
  {
    q: "What furniture types does moveAPT support?",
    a: "moveAPT handles all standard household furniture: sofas, sectionals, beds, dressers, wardrobes, dining tables and chairs, desks, bookshelves, entertainment units, armchairs, coffee tables, and side tables. We're continuously expanding to include appliances, exercise equipment, and large art pieces. If you have something unusual, you can always enter dimensions manually.",
  },
  {
    q: "Does moveAPT work for houses, not just apartments?",
    a: "Yes. While we're named moveAPT, the same furniture-fitting technology works for any residential move — townhouses, single-family homes, condos, or studios. The key constraint inputs are doorway and hallway dimensions, and room square footage, which are the same whether you're moving into a walk-up or a house.",
  },
  {
    q: "Is my data private?",
    a: "Your photos and floor plans are used only to run your move check. We do not sell your data, share it with advertisers, or use it to train models without explicit opt-in consent. You can delete your account and all associated data at any time. Full details are in our Privacy Policy.",
  },
  {
    q: "When does moveAPT launch?",
    a: "We're currently in closed beta and accepting early access signups. Early access members get first access to the iOS and web app, lifetime founding member pricing, and a direct line to the team for feature requests. Join the waitlist above and we'll email you the moment your spot is ready.",
  },
  {
    q: "How much does moveAPT cost?",
    a: "We haven't announced final pricing yet. Early access members will receive founding member pricing, which will be significantly lower than standard retail pricing and locked in for life. Join the waitlist to qualify.",
  },
];

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="border-b"
      style={{ borderColor: "rgba(255,255,255,0.06)" }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left cursor-pointer"
        aria-expanded={open}
        aria-controls={`faq-answer-${index}`}
        id={`faq-question-${index}`}
      >
        <span className="text-base font-medium text-white pr-4">{q}</span>
        <div
          className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            background: open ? "rgba(59,130,246,0.15)" : "rgba(255,255,255,0.06)",
            border: `1px solid ${open ? "rgba(59,130,246,0.3)" : "rgba(255,255,255,0.08)"}`,
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
          aria-hidden="true"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M2 4l4 4 4-4"
              stroke={open ? "#60a5fa" : "#64748b"}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`faq-answer-${index}`}
            role="region"
            aria-labelledby={`faq-question-${index}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <p className="pb-5 text-sm text-slate-400 leading-relaxed pr-10">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  const { ref, inView } = useInView();

  const half = Math.ceil(faqs.length / 2);
  const left = faqs.slice(0, half);
  const right = faqs.slice(half);

  return (
    <section
      id="faq"
      ref={ref}
      className="py-24 lg:py-32 px-5"
      aria-labelledby="faq-heading"
      style={{
        background:
          "linear-gradient(to bottom, transparent, rgba(99,102,241,0.03) 50%, transparent)",
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
            Got questions?
          </p>
          <h2
            id="faq-heading"
            className="text-4xl md:text-5xl font-bold text-white tracking-tight"
          >
            Everything you need
            <br />
            <span className="gradient-text">to know.</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-x-12"
        >
          <div>
            {left.map((item, i) => (
              <FAQItem key={item.q} q={item.q} a={item.a} index={i} />
            ))}
          </div>
          <div>
            {right.map((item, i) => (
              <FAQItem key={item.q} q={item.q} a={item.a} index={half + i} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
