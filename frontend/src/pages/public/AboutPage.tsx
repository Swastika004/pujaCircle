import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Sparkles,
  ShieldCheck,
  HeartHandshake,
  ArrowRight,
  BookOpen,
  Award,
  Star,
  Check,
  ScrollText,
  Users,
  CheckCircle2,
} from 'lucide-react';

/**
 * AboutPage
 * The Sacred Heritage, Values & Verification Governance of PujaCircle.
 * 100% Flexbox, pure solid white card elevations, deep sanctum vermilion accents,
 * Haldi gold trims, zero gradients, zero grids.
 */
export const AboutPage: React.FC = () => {
  return (
    <div className="w-full text-stone-900">
      {/* 1. Hero Section */}
      <section className="w-full pt-8 sm:pt-14 pb-10 sm:pb-14 px-4 border-b border-stone-200">
        <div className="container max-w-5xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#780016] text-white text-xs font-bold tracking-wide uppercase shadow-sm border border-amber-400">
            <span className="text-amber-300 font-serif font-black text-sm">ॐ</span>
            <span>Preserving Sanatana Dharma</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-serif text-stone-950 tracking-tight leading-tight max-w-3xl mx-auto">
            Vedic Traditions Made Authentic for Modern India
          </h1>

          <p className="text-sm sm:text-base text-stone-700 font-medium max-w-2xl mx-auto leading-relaxed">
            PujaCircle bridges age-old Gurukul parampara with modern convenience — connecting devoted families with verified, knowledgeable Vedic Purohits for authentic ceremonies and blessings.
          </p>

          {/* 4 Impact Stat Tiles (Flexbox Only, Zero Grids) */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 pt-6 max-w-4xl mx-auto w-full">
            <div className="w-[calc(50%-6px)] sm:w-[calc(25%-12px)] p-5 rounded-2xl border-2 border-amber-300 bg-white shadow-md text-center hover:border-amber-500 hover:shadow-lg transition-all">
              <div className="text-2xl sm:text-3xl font-extrabold font-serif text-red-700">1,200+</div>
              <div className="text-[11px] sm:text-xs font-bold text-stone-700 mt-1">Verified Purohits</div>
            </div>

            <div className="w-[calc(50%-6px)] sm:w-[calc(25%-12px)] p-5 rounded-2xl border-2 border-amber-300 bg-white shadow-md text-center hover:border-amber-500 hover:shadow-lg transition-all">
              <div className="text-2xl sm:text-3xl font-extrabold font-serif text-amber-600">50,000+</div>
              <div className="text-[11px] sm:text-xs font-bold text-stone-700 mt-1">Sacred Ceremonies</div>
            </div>

            <div className="w-[calc(50%-6px)] sm:w-[calc(25%-12px)] p-5 rounded-2xl border-2 border-amber-300 bg-white shadow-md text-center hover:border-amber-500 hover:shadow-lg transition-all">
              <div className="text-2xl sm:text-3xl font-extrabold font-serif text-emerald-700 flex items-center justify-center gap-1">
                <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                <span>4.9 / 5</span>
              </div>
              <div className="text-[11px] sm:text-xs font-bold text-stone-700 mt-1">Devotee Trust Score</div>
            </div>

            <div className="w-[calc(50%-6px)] sm:w-[calc(25%-12px)] p-5 rounded-2xl border-2 border-amber-300 bg-white shadow-md text-center hover:border-amber-500 hover:shadow-lg transition-all">
              <div className="text-2xl sm:text-3xl font-extrabold font-serif text-red-900">28+</div>
              <div className="text-[11px] sm:text-xs font-bold text-stone-700 mt-1">Major Indian Cities</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Our Sacred Story & Mission */}
      <section className="w-full py-12 sm:py-16 px-4 border-b border-stone-200">
        <div className="container max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8 sm:gap-12">
          <div className="w-full md:w-1/2 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold">
              <BookOpen className="h-3.5 w-3.5 text-amber-700" />
              <span>Our Sacred Heritage</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-stone-950 leading-snug">
              Why We Founded PujaCircle
            </h2>

            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              In fast-growing metropolitan cities, finding a trustworthy Purohit who possesses genuine Gurukul scholarship, recites correct Sanskrit mantras, and guides families with patience is often a challenge.
            </p>

            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              Families frequently face last-minute cancellations, non-transparent pricing, or incomplete samagri preparations during major milestones like Griha Pravesh, Vivah, and Satyanarayan Kathas.
            </p>

            <p className="text-xs sm:text-sm text-stone-900 font-bold leading-relaxed">
              PujaCircle was born out of deep reverence for Sanatana Dharma to restore sanctity, trust, and predictability to every home ritual.
            </p>

            <div className="p-5 rounded-2xl border-2 border-amber-300 border-l-4 border-l-red-700 bg-amber-50/60 space-y-1.5 shadow-xs">
              <div className="text-sm font-serif font-extrabold text-red-900 italic">
                “यज्ञो वै श्रेष्ठतमं कर्म”
              </div>
              <div className="text-xs text-stone-700 font-medium">
                — Satapatha Brahmana (Yajna is the most auspicious action for universal harmony, peace, and prosperity).
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 flex flex-col gap-3.5">
            <div className="p-5 rounded-3xl border-2 border-amber-300 bg-white shadow-md space-y-2 hover:border-amber-400 transition-all">
              <div className="flex items-center gap-2.5">
                <div className="h-10 w-10 rounded-xl bg-[#780016] text-white flex items-center justify-center shrink-0 border border-amber-400">
                  <ShieldCheck className="h-5 w-5 text-amber-300" />
                </div>
                <h3 className="font-bold text-base font-serif text-stone-950">Vedic Authenticity First</h3>
              </div>
              <p className="text-xs text-stone-700 leading-relaxed pl-12">
                We never compromise on ritual purity. Every priest on our platform undergoes rigorous verification of their lineage, Sanskrit chanting, and ethical conduct.
              </p>
            </div>

            <div className="p-5 rounded-3xl border-2 border-amber-300 bg-white shadow-md space-y-2 hover:border-amber-400 transition-all">
              <div className="flex items-center gap-2.5">
                <div className="h-10 w-10 rounded-xl bg-amber-400 text-stone-950 flex items-center justify-center shrink-0 border border-amber-500">
                  <HeartHandshake className="h-5 w-5 text-stone-950" />
                </div>
                <h3 className="font-bold text-base font-serif text-stone-950">100% Direct Cash Dakshina</h3>
              </div>
              <p className="text-xs text-stone-700 leading-relaxed pl-12">
                We take zero commission from the sacred dakshina offered by devotees. Devotees hand over dakshina directly to the Purohit with complete transparency.
              </p>
            </div>

            <div className="p-5 rounded-3xl border-2 border-amber-300 bg-white shadow-md space-y-2 hover:border-amber-400 transition-all">
              <div className="flex items-center gap-2.5">
                <div className="h-10 w-10 rounded-xl bg-[#780016] text-white flex items-center justify-center shrink-0 border border-amber-400">
                  <Sparkles className="h-5 w-5 text-amber-300" />
                </div>
                <h3 className="font-bold text-base font-serif text-stone-950">Complete Samagri Guidance</h3>
              </div>
              <p className="text-xs text-stone-700 leading-relaxed pl-12">
                Never stress about missing puja articles. We supply exhaustive ritual checklists, item quantities, and preparation instructions well in advance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Four Pillars of Vedic Sanctity */}
      <section className="w-full py-12 sm:py-16 px-4 border-b border-stone-200">
        <div className="container max-w-5xl mx-auto space-y-10">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300">
              <Award className="h-3.5 w-3.5 text-amber-700" />
              <span>Platform Values</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-stone-950">
              The Four Pillars of Vedic Sanctity
            </h2>
            <p className="text-xs sm:text-sm text-stone-700 max-w-xl mx-auto">
              Four sacred commitments that ensure every ceremony conducted through PujaCircle brings divine peace and spiritual fulfillment.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 sm:gap-6 w-full justify-center">
            {/* Pillar 1 */}
            <div className="w-full sm:w-[calc(50%-12px)] border-2 border-amber-300 border-t-4 border-t-red-700 bg-white shadow-md rounded-3xl p-6 space-y-3 hover:border-amber-500 hover:shadow-lg transition-all">
              <div className="h-10 w-10 rounded-xl bg-[#780016] text-white flex items-center justify-center font-bold text-sm border border-amber-400">
                01
              </div>
              <h3 className="text-base font-bold font-serif text-stone-950">Parampara Lineage</h3>
              <p className="text-xs text-stone-700 leading-relaxed">
                Scholars trained in authentic Vedic Gurukuls, well-versed in Sanskrit uchharan, Gotra rules, and correct vidhi for each festival and life ceremony.
              </p>
              <div className="pt-2 flex items-center gap-1.5 text-[11px] font-bold text-red-700">
                <Check className="h-3.5 w-3.5" /> Verified Lineage & Gotra Expertise
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="w-full sm:w-[calc(50%-12px)] border-2 border-amber-300 border-t-4 border-t-amber-500 bg-white shadow-md rounded-3xl p-6 space-y-3 hover:border-amber-500 hover:shadow-lg transition-all">
              <div className="h-10 w-10 rounded-xl bg-amber-400 text-stone-950 flex items-center justify-center font-bold text-sm border border-amber-500">
                02
              </div>
              <h3 className="text-base font-bold font-serif text-stone-950">Direct Cash Dakshina</h3>
              <p className="text-xs text-stone-700 leading-relaxed">
                Transparent suggested dakshina guidelines provided prior to booking. The full amount is given directly by your family to the priest in cash with zero platform commission.
              </p>
              <div className="pt-2 flex items-center gap-1.5 text-[11px] font-bold text-amber-800">
                <Check className="h-3.5 w-3.5" /> 100% Retained by Acharya
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="w-full sm:w-[calc(50%-12px)] border-2 border-amber-300 border-t-4 border-t-emerald-700 bg-white shadow-md rounded-3xl p-6 space-y-3 hover:border-amber-500 hover:shadow-lg transition-all">
              <div className="h-10 w-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold text-sm border border-emerald-800">
                03
              </div>
              <h3 className="text-base font-bold font-serif text-stone-950">Complete Transparency</h3>
              <p className="text-xs text-stone-700 leading-relaxed">
                Clear duration, exact ritual items, holy vidhi steps, and priest availability upfront. No hidden surcharges or surprise cancellations.
              </p>
              <div className="pt-2 flex items-center gap-1.5 text-[11px] font-bold text-emerald-800">
                <Check className="h-3.5 w-3.5" /> Zero Advance Payment
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="w-full sm:w-[calc(50%-12px)] border-2 border-amber-300 border-t-4 border-t-red-900 bg-white shadow-md rounded-3xl p-6 space-y-3 hover:border-amber-500 hover:shadow-lg transition-all">
              <div className="h-10 w-10 rounded-xl bg-red-900 text-white flex items-center justify-center font-bold text-sm border border-amber-400">
                04
              </div>
              <h3 className="text-base font-bold font-serif text-stone-950">Astronomical Muhurats</h3>
              <p className="text-xs text-stone-700 leading-relaxed">
                Precision Panchang timings for Choghadiya, Tithi, Nakshatra, and Rahu Kaal avoidance tailored to your city and geographic coordinates.
              </p>
              <div className="pt-2 flex items-center gap-1.5 text-[11px] font-bold text-red-800">
                <Check className="h-3.5 w-3.5" /> Localized Vedic Panchang
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Gurukul Verification Protocol (Clean Chandan Canvas, zero stark white background) */}
      <section className="w-full py-12 sm:py-16 px-4 border-b border-stone-200">
        <div className="container max-w-5xl mx-auto space-y-10">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300">
              <ShieldCheck className="h-3.5 w-3.5 text-amber-700" />
              <span>Trust & Governance</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-stone-950">
              Our 4-Step Gurukul Verification Protocol
            </h2>
            <p className="text-xs sm:text-sm text-stone-700">
              Every Purohit undergoes stringent multi-tier validation before being authorized to accept devotee appointments.
            </p>
          </div>

          {/* 4 Elevated Verification Phase Cards */}
          <div className="flex flex-wrap gap-4 w-full">
            {/* Phase 1 */}
            <div className="w-full sm:w-[calc(50%-8px)] lg:w-[calc(25%-12px)] p-6 rounded-3xl border-2 border-amber-300 border-t-4 border-t-[#780016] bg-white shadow-md hover:border-amber-500 hover:shadow-xl transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="h-10 w-10 rounded-2xl bg-[#780016] text-amber-300 flex items-center justify-center shadow-xs border border-amber-400/40">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full bg-amber-100 border border-amber-300 text-stone-900">
                    Phase 01
                  </span>
                </div>
                <h3 className="font-bold text-sm text-stone-950 font-serif leading-snug">
                  Identity & Lineage Audit
                </h3>
                <p className="text-xs text-stone-700 leading-relaxed">
                  Govt ID verification, residential proof, and background credential authentication before roster consideration.
                </p>
              </div>
              <div className="pt-2 border-t border-amber-200/80 flex items-center gap-1.5 text-[10px] font-bold text-amber-900">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                <span>Govt ID & Address Confirmed</span>
              </div>
            </div>

            {/* Phase 2 */}
            <div className="w-full sm:w-[calc(50%-8px)] lg:w-[calc(25%-12px)] p-6 rounded-3xl border-2 border-amber-300 border-t-4 border-t-amber-500 bg-white shadow-md hover:border-amber-500 hover:shadow-xl transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="h-10 w-10 rounded-2xl bg-amber-400 text-stone-950 flex items-center justify-center shadow-xs border border-amber-500/60">
                    <ScrollText className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full bg-amber-100 border border-amber-300 text-stone-900">
                    Phase 02
                  </span>
                </div>
                <h3 className="font-bold text-sm text-stone-950 font-serif leading-snug">
                  Sanskrit & Ritual Audition
                </h3>
                <p className="text-xs text-stone-700 leading-relaxed">
                  Rigorous oral examination of Vedic mantra uchharan, stotrams, and authentic vidhi steps by senior scholars.
                </p>
              </div>
              <div className="pt-2 border-t border-amber-200/80 flex items-center gap-1.5 text-[10px] font-bold text-amber-900">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                <span>Mantra Uchharan Certified</span>
              </div>
            </div>

            {/* Phase 3 */}
            <div className="w-full sm:w-[calc(50%-8px)] lg:w-[calc(25%-12px)] p-6 rounded-3xl border-2 border-amber-300 border-t-4 border-t-emerald-700 bg-white shadow-md hover:border-amber-500 hover:shadow-xl transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="h-10 w-10 rounded-2xl bg-emerald-700 text-white flex items-center justify-center shadow-xs border border-emerald-800">
                    <Users className="h-5 w-5 text-amber-300" />
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full bg-amber-100 border border-amber-300 text-stone-900">
                    Phase 03
                  </span>
                </div>
                <h3 className="font-bold text-sm text-stone-950 font-serif leading-snug">
                  Parampara & Elder Vetting
                </h3>
                <p className="text-xs text-stone-700 leading-relaxed">
                  Cross-checking Vedic education with recognized Gurukuls, local temples, gotra lineages, and respected community elders.
                </p>
              </div>
              <div className="pt-2 border-t border-amber-200/80 flex items-center gap-1.5 text-[10px] font-bold text-amber-900">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                <span>Gurukul Lineage Endorsed</span>
              </div>
            </div>

            {/* Phase 4 */}
            <div className="w-full sm:w-[calc(50%-8px)] lg:w-[calc(25%-12px)] p-6 rounded-3xl border-2 border-amber-300 border-t-4 border-t-red-900 bg-white shadow-md hover:border-amber-500 hover:shadow-xl transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="h-10 w-10 rounded-2xl bg-red-900 text-white flex items-center justify-center shadow-xs border border-amber-400">
                    <Award className="h-5 w-5 text-amber-300" />
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full bg-amber-100 border border-amber-300 text-stone-900">
                    Phase 04
                  </span>
                </div>
                <h3 className="font-bold text-sm text-stone-950 font-serif leading-snug">
                  Continuous Devotee Quality
                </h3>
                <p className="text-xs text-stone-700 leading-relaxed">
                  Post-ceremony family ratings, punctuality monitoring, and periodic ethics audits to safeguard ritual sanctity.
                </p>
              </div>
              <div className="pt-2 border-t border-amber-200/80 flex items-center gap-1.5 text-[10px] font-bold text-amber-900">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                <span>4.9+ Star Sanctum Score</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Grand Sanctum Call-To-Action Banner */}
      <section className="w-full py-12 sm:py-16 px-4">
        <div className="container max-w-4xl mx-auto rounded-3xl bg-[#780016] border-2 border-amber-400 p-8 sm:p-12 text-center text-white space-y-5 shadow-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400 text-stone-950 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5 text-red-900" />
            <span>Begin Auspicious Beginnings</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-serif text-white tracking-tight leading-tight">
            Schedule Your Next Sacred Puja with Reverence
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-amber-100 max-w-xl mx-auto leading-relaxed">
            Whether for Griha Pravesh, Satyanarayan, Navagraha Shanti, or Birthday blessings, connect with genuine Vedic scholars today.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 pt-2 w-full max-w-sm sm:max-w-none mx-auto">
            <Link to="/user/register" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto bg-amber-400 hover:bg-amber-500 text-stone-950 font-bold text-sm px-7 h-12 gap-2 shadow-md cursor-pointer active:scale-95 transition-all">
                <span>Book a Purohit</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>

            <Link to="/priest/register" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-amber-300/80 bg-black/20 text-amber-100 hover:bg-black/40 font-bold text-sm px-7 h-12 shadow-sm cursor-pointer active:scale-95 transition-all">
                Apply as a Purohit
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
