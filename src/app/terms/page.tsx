import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service for moveAPT.",
  alternates: { canonical: "https://moveapt.com/terms" },
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main
        id="main-content"
        className="max-w-3xl mx-auto px-5 pt-32 pb-20"
        itemScope
        itemType="https://schema.org/WebPage"
      >
        <h1 className="text-4xl font-bold text-white mb-3">Terms of Service</h1>
        <p className="text-slate-500 mb-10 text-sm">Last updated: January 1, 2025</p>

        <div className="max-w-none space-y-8 text-sm leading-relaxed text-slate-300">
          <section aria-labelledby="acceptance">
            <h2 id="acceptance" className="text-xl font-semibold text-white mb-3">
              Acceptance of terms
            </h2>
            <p>
              By accessing moveAPT, you agree to these terms. If you do not agree, please do not
              use the service.
            </p>
          </section>

          <section aria-labelledby="service-description">
            <h2 id="service-description" className="text-xl font-semibold text-white mb-3">
              Service description
            </h2>
            <p>
              moveAPT provides AI-powered furniture measurement and fitting predictions. Our
              predictions are estimates based on AI models and should not be the sole basis for
              major decisions. We recommend verifying critical measurements manually before a move.
            </p>
          </section>

          <section aria-labelledby="accuracy">
            <h2 id="accuracy" className="text-xl font-semibold text-white mb-3">
              Accuracy disclaimer
            </h2>
            <p>
              moveAPT&apos;s AI provides estimates, not guarantees. While our models achieve high
              accuracy in testing, real-world results may vary. moveAPT is not liable for moving
              costs, furniture returns, or other damages arising from reliance on our predictions.
            </p>
          </section>

          <section aria-labelledby="contact-terms">
            <h2 id="contact-terms" className="text-xl font-semibold text-white mb-3">
              Contact
            </h2>
            <p>
              Questions?{" "}
              <a href="mailto:legal@moveapt.com" className="text-blue-400 hover:text-blue-300">
                legal@moveapt.com
              </a>
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
