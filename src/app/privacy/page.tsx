import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How moveAPT collects, uses, and protects your information.",
  alternates: { canonical: "https://moveapt.com/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main
        id="main-content"
        className="max-w-3xl mx-auto px-5 pt-32 pb-20"
        itemScope
        itemType="https://schema.org/WebPage"
      >
        <h1 className="text-4xl font-bold text-white mb-3">Privacy Policy</h1>
        <p className="text-slate-500 mb-10 text-sm">Last updated: January 1, 2025</p>

        <div className="prose prose-invert prose-sm max-w-none space-y-8 text-slate-300">
          <section aria-labelledby="info-we-collect">
            <h2 id="info-we-collect" className="text-xl font-semibold text-white mb-3">
              Information we collect
            </h2>
            <p>
              When you join our waitlist, we collect your email address. When you use moveAPT, we
              collect the photos you upload, apartment details you enter, and usage analytics to
              improve the product.
            </p>
          </section>

          <section aria-labelledby="how-we-use">
            <h2 id="how-we-use" className="text-xl font-semibold text-white mb-3">
              How we use your information
            </h2>
            <p>
              We use your email to send you product updates, launch announcements, and occasional
              tips about moving. We use your furniture photos and apartment data solely to provide
              the moveAPT service. We do not sell your data.
            </p>
          </section>

          <section aria-labelledby="data-retention">
            <h2 id="data-retention" className="text-xl font-semibold text-white mb-3">
              Data retention and deletion
            </h2>
            <p>
              You can request deletion of your account and all associated data at any time by
              emailing{" "}
              <a href="mailto:privacy@moveapt.com" className="text-blue-400 hover:text-blue-300">
                privacy@moveapt.com
              </a>
              . We will process deletion requests within 30 days.
            </p>
          </section>

          <section aria-labelledby="contact-privacy">
            <h2 id="contact-privacy" className="text-xl font-semibold text-white mb-3">
              Contact
            </h2>
            <p>
              Questions about this policy? Email{" "}
              <a href="mailto:privacy@moveapt.com" className="text-blue-400 hover:text-blue-300">
                privacy@moveapt.com
              </a>
              .
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
