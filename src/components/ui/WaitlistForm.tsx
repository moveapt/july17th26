"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
      getResponse: (widgetId: string) => string | undefined;
    };
    cfAnalytics?: {
      pushEvent: (eventName: string) => void;
    };
  }
}

type FormState = "idle" | "loading" | "success" | "duplicate" | "error";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");
  const [widgetId, setWidgetId] = useState<string | null>(null);
  const turnstileRef = useRef<HTMLDivElement>(null);

  const renderTurnstile = useCallback(() => {
    if (!turnstileRef.current || !window.turnstile) return;
    if (widgetId !== null) {
      window.turnstile.remove(widgetId);
    }
    const id = window.turnstile.render(turnstileRef.current, {
      sitekey: TURNSTILE_SITE_KEY,
      theme: "dark",
      size: "invisible",
    });
    setWidgetId(id);
  }, [widgetId]);

  useEffect(() => {
    const tryRender = () => {
      if (window.turnstile) {
        renderTurnstile();
      }
    };

    // Turnstile may already be loaded or loading
    if (window.turnstile) {
      renderTurnstile();
    } else {
      const interval = setInterval(() => {
        if (window.turnstile) {
          clearInterval(interval);
          tryRender();
        }
      }, 300);
      return () => clearInterval(interval);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state === "loading" || state === "success") return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setState("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setState("loading");

    // Get Turnstile token
    let token = "";
    if (widgetId !== null && window.turnstile) {
      token = window.turnstile.getResponse(widgetId) || "";
    }

    // In dev without a real key, use a test bypass token
    if (!token && process.env.NODE_ENV === "development") {
      token = "dev-bypass";
    }

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase(), token }),
      });

      const data = await res.json();

      if (data.success) {
        if (data.status === "duplicate") {
          setState("duplicate");
          setMessage(data.message);
        } else {
          setState("success");
          setMessage(data.message);
          // Track signup
          if (typeof window !== "undefined") {
            window.cfAnalytics?.pushEvent("waitlist_signup");
          }
        }
      } else {
        setState("error");
        setMessage(data.error || "Something went wrong. Please try again.");
        if (widgetId !== null && window.turnstile) {
          window.turnstile.reset(widgetId);
        }
      }
    } catch {
      setState("error");
      setMessage("Network error. Please check your connection and try again.");
      if (widgetId !== null && window.turnstile) {
        window.turnstile.reset(widgetId);
      }
    }
  };

  const isTerminalState = state === "success" || state === "duplicate";

  return (
    <div className="w-full max-w-md mx-auto">
      <AnimatePresence mode="wait">
        {isTerminalState ? (
          <motion.div
            key="success"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl p-6 text-center"
            style={{
              background:
                state === "success"
                  ? "linear-gradient(135deg, rgba(34,197,94,0.12), rgba(16,185,129,0.08))"
                  : "linear-gradient(135deg, rgba(59,130,246,0.12), rgba(99,102,241,0.08))",
              border: `1px solid ${state === "success" ? "rgba(34,197,94,0.25)" : "rgba(59,130,246,0.25)"}`,
            }}
            role="status"
            aria-live="polite"
          >
            <div className="text-4xl mb-3">{state === "success" ? "🎉" : "👋"}</div>
            <p className="font-semibold text-white mb-1">
              {state === "success" ? "You're on the list!" : "Already signed up!"}
            </p>
            <p className="text-sm text-slate-400">{message}</p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={handleSubmit}
            noValidate
            aria-label="Join waitlist form"
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <label htmlFor="waitlist-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="waitlist-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (state === "error") setState("idle");
                  }}
                  placeholder="you@example.com"
                  required
                  disabled={state === "loading"}
                  autoComplete="email"
                  className="w-full rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-500 outline-none transition-all duration-200 disabled:opacity-60"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: `1px solid ${state === "error" ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.1)"}`,
                  }}
                  onFocus={(e) => {
                    e.target.style.border = "1px solid rgba(59,130,246,0.5)";
                    e.target.style.boxShadow = "0 0 0 3px rgba(59,130,246,0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.border =
                      state === "error"
                        ? "1px solid rgba(239,68,68,0.5)"
                        : "1px solid rgba(255,255,255,0.1)";
                    e.target.style.boxShadow = "none";
                  }}
                  aria-invalid={state === "error"}
                  aria-describedby={state === "error" ? "form-error" : undefined}
                />
              </div>
              <button
                type="submit"
                disabled={state === "loading" || !email}
                className="shrink-0 px-6 py-3.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2 justify-center"
                style={{
                  background:
                    state === "loading" ? "rgba(59,130,246,0.5)" : "linear-gradient(135deg, #3b82f6, #6366f1)",
                  boxShadow: state !== "loading" ? "0 0 24px rgba(59,130,246,0.35)" : "none",
                  minWidth: "160px",
                }}
                aria-label="Join early access waitlist"
              >
                {state === "loading" ? (
                  <>
                    <svg
                      className="animate-spin w-4 h-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Joining...
                  </>
                ) : (
                  <>
                    Get Early Access
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </>
                )}
              </button>
            </div>

            {/* Error message */}
            <AnimatePresence>
              {state === "error" && (
                <motion.p
                  id="form-error"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-2 text-xs text-red-400 flex items-center gap-1.5"
                  role="alert"
                >
                  <span aria-hidden>⚠</span> {message}
                </motion.p>
              )}
            </AnimatePresence>

            <p className="mt-3 text-center text-xs text-slate-600">
              No credit card. No spam. Unsubscribe anytime.
            </p>

            {/* Invisible Turnstile widget */}
            <div ref={turnstileRef} className="hidden" aria-hidden="true" />
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
