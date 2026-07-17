"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Logo } from "@/components/ui/Logo";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3" : "py-5"
      }`}
      role="banner"
    >
      <div
        className={`mx-auto max-w-6xl px-5 flex items-center justify-between rounded-2xl transition-all duration-300 ${
          scrolled
            ? "bg-[rgba(3,7,18,0.85)] backdrop-blur-xl border border-white/[0.07] shadow-2xl mx-4"
            : ""
        }`}
        style={{ padding: scrolled ? "12px 20px" : undefined }}
      >
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {[
            { label: "How it works", id: "how-it-works" },
            { label: "Features", id: "features" },
            { label: "FAQ", id: "faq" },
          ].map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="text-sm text-slate-400 hover:text-white transition-colors duration-200 cursor-pointer"
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => scrollTo("waitlist")}
            className="px-4 py-2 text-sm font-medium rounded-xl text-white transition-all duration-200"
            style={{
              background: "linear-gradient(135deg, #3b82f6, #6366f1)",
              boxShadow: "0 0 20px rgba(59,130,246,0.3)",
            }}
            aria-label="Join early access waitlist"
          >
            Join Early Access
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <div className="w-5 h-4 flex flex-col justify-between">
            <span
              className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`}
            />
            <span
              className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden mx-4 mt-2 rounded-2xl border border-white/[0.08] p-4 space-y-3"
          style={{ background: "rgba(3,7,18,0.95)", backdropFilter: "blur(20px)" }}
        >
          {[
            { label: "How it works", id: "how-it-works" },
            { label: "Features", id: "features" },
            { label: "FAQ", id: "faq" },
          ].map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="block w-full text-left px-3 py-2 text-sm text-slate-300 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("waitlist")}
            className="w-full mt-2 px-4 py-2.5 text-sm font-medium rounded-xl text-white"
            style={{ background: "linear-gradient(135deg, #3b82f6, #6366f1)" }}
          >
            Join Early Access
          </button>
        </motion.div>
      )}
    </motion.header>
  );
}
