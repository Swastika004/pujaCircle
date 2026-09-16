import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Info } from "lucide-react";

// AboutPage
// The Mission, Heritage & Operational Scope of PujaCircle.
// Strictly matches Phase 2 spec: Mission statement + explicit scope note.
// Feature lists and pricing tables removed. Single-line comments only.
export const AboutPage: React.FC = () => {
  return (
    <div className="w-full text-stone-900">
      <section className="w-full pt-8 sm:pt-14 pb-10 sm:pb-12 px-4">
        <div className="container max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm bg-[#780016] text-white text-xs font-bold tracking-wide uppercase shadow-sm border border-amber-400">
            <span className="text-amber-300 font-serif font-black text-sm">
              ॐ
            </span>
            <span>Preserving Sanatana Dharma</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-serif text-stone-950 tracking-tight leading-tight max-w-3xl mx-auto">
            Vedic Traditions Made Authentic for Modern India
          </h1>

          <p className="text-sm sm:text-base text-stone-700 font-medium max-w-2xl mx-auto leading-relaxed">
            PujaCircle bridges age-old Gurukul parampara with modern convenience
            — connecting devoted families with verified, knowledgeable Vedic
            Purohits for authentic ceremonies, samagri preparation, and family
            blessings.
          </p>
        </div>
      </section>

      <section className="w-full pt-8 sm:pt-14 pb-10 sm:pb-12 px-4">
        <div className="container max-w-4xl mx-auto">
          <div className="p-5 sm:p-6 rounded-lg border border-[#C59A3F]/50 bg-white shadow-xs flex items-start gap-4">
            <div className="h-10 w-10 rounded-md bg-amber-100 text-[#780016] flex items-center justify-center shrink-0 border border-amber-300 mt-0.5">
              <Info className="h-5 w-5" />
            </div>
            <div className="space-y-1.5 text-xs sm:text-sm text-stone-700 leading-relaxed">
              <h2 className="font-serif font-bold text-base text-stone-900">
                Important Operational Scope Note
              </h2>
              <p>
                PujaCircle operates strictly as an informational discovery
                directory and ceremony scheduling coordinator.{" "}
                <strong>
                  Zero live online monetary transactions, payment gateway
                  checkouts, or real-time GPS tracking
                </strong>{" "}
                occur through this platform.
              </p>
              <p className="text-stone-600 text-xs">
                All ritual Dakshina is settled directly and in person in cash
                between the devotee family and the assigned Purohit upon the
                peaceful completion of the ceremony.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 sm:py-16 px-4">
        <div className="container max-w-4xl mx-auto space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold">
              <BookOpen className="h-3.5 w-3.5 text-amber-700" />
              <span>Our Sacred Heritage</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-stone-950 leading-snug">
              Why We Founded PujaCircle
            </h2>

            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              In fast-growing cities across West Bengal and India, finding a
              trustworthy Purohit who possesses genuine Gurukul scholarship,
              recites correct Sanskrit mantras, and guides families with
              patience is often a major challenge.
            </p>

            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              Families frequently face last-minute cancellations,
              non-transparent pricing, or incomplete samagri preparations during
              major milestones like Griha Pravesh, Annaprashan, Vivah, and
              Satyanarayan Kathas.
            </p>

            <p className="text-xs sm:text-sm text-stone-900 font-bold leading-relaxed">
              PujaCircle was founded to restore sanctity, trust, and
              predictability to every home ritual through verified priest
              credentials and comprehensive ritual kit vidhi checklists.
            </p>

            <div className="p-5 rounded-lg border-2 border-amber-300 border-l-4 border-l-red-700 bg-amber-50/60 space-y-1.5 shadow-xs">
              <div className="text-sm font-serif font-extrabold text-red-900 italic">
                “यज्ञो वै श्रेष्ठतमं कर्म”
              </div>
              <div className="text-xs text-stone-700 font-medium">
                — Satapatha Brahmana (Yajna is the most auspicious action for
                universal harmony, peace, and domestic prosperity).
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="font-serif font-bold text-stone-900 text-base">
                Ready to plan your family ceremony?
              </h3>
              <p className="text-xs text-stone-600 mt-0.5">
                Browse verified Vedic purohits in your neighborhood.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link to="/priests">
                <Button
                  size="sm"
                  className="bg-[#991B1B] hover:bg-[#780016] text-white font-bold gap-1.5 rounded-md"
                >
                  <span>Browse Priests</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
