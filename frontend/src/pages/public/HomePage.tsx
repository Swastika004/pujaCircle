import React from "react";
import { Link } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Compass,
  Users,
} from "lucide-react";
import { SEED_PUJA_CATALOG } from "@/mocks/data";
import { HeroVisualCarousel } from "@/components/common/HeroVisualCarousel";

// HomePage
// High-contrast festive Indian temple aesthetic with modern scroll animations & microinteractions.
// Follows strict Phase 2 spec: Hero with dual CTAs, 3-step how-it-works, and 4 featured catalog cards.
export const HomePage: React.FC = () => {
  // First 4 featured catalog ceremonies for home showcase
  const featuredPujas = SEED_PUJA_CATALOG.slice(0, 4);

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.05 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <div className="flex flex-col text-stone-900 w-full overflow-x-clip">
      {/* Top Hero Section Header - Centered Content */}
      <div className="flex flex-col gap-10 sm:gap-14 pt-10 sm:pt-16 pb-4 px-4 max-w-6xl mx-auto w-full">
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full flex flex-col items-center text-center gap-6"
        >
          {/* Sacred Mantra Tag with Shimmer Border */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 border border-[#C59A3F]/50 text-[#991B1B] text-xs font-bold shadow-xs hover:border-[#C59A3F] hover:shadow-md transition-all cursor-default select-none"
          >
            <Sparkles className="h-3.5 w-3.5 text-[#B45309] animate-pulse" />
            <span className="font-serif tracking-wide text-[#780016]">
              ॥ शुभं करोति कल्याणम् ॥
            </span>
            <span className="text-stone-300">|</span>
            <span className="text-stone-800 hidden sm:inline">
              Verified Vedic Purohits For Sacred Home Ceremonies
            </span>
            <span className="text-stone-800 sm:hidden">
              Verified Vedic Purohits
            </span>
          </motion.div>

          {/* Main Display Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#991B1B] font-serif leading-[1.15] max-w-4xl"
          >
            Authentic Vedic Pujas, <br />
            <span className="text-[#1A0507]">
              Conducted with Sanctity at Your Home
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-stone-800 font-medium text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed"
          >
            PujaCircle matches your family with experienced, credentialed Vedic
            Purohits across West Bengal. Experience traditional rituals with
            complete transparency, tailored samagri checklists, and direct cash
            dakshina.
          </motion.p>

          {/* Dual Action CTAs with Micro-interaction */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 w-full max-w-md"
          >
            <Link to="/advisor" className="w-full sm:w-auto flex-1">
              <Button
                size="lg"
                className="w-full h-13 text-base font-bold gap-2.5 bg-linear-to-r from-[#991B1B] via-[#851313] to-[#6E0E0E] hover:from-[#780016] hover:to-[#550808] text-amber-100 px-8 py-3.5 rounded-md border-2 border-amber-400/50 shadow-[0_10px_25px_-5px_rgba(153,27,27,0.45)] hover:shadow-[0_14px_30px_-4px_rgba(153,27,27,0.6)] active:scale-[0.98] transition-all duration-300 cursor-pointer group"
              >
                <Compass className="h-4 w-4 text-amber-300 transition-transform duration-300 group-hover:rotate-45" />
                <span className="tracking-wide">Ask the Advisor</span>
                <ArrowRight className="h-4 w-4 text-amber-300 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>

            <Link to="/priests" className="w-full sm:w-auto flex-1">
              <Button
                size="lg"
                variant="outline"
                className="w-full h-13 px-7 text-sm sm:text-base font-bold border-2 border-[#C59A3F]/50 text-stone-800 bg-white/90 hover:bg-amber-50/90 hover:border-[#C59A3F] hover:text-[#780016] rounded-md shadow-sm hover:shadow-md active:scale-[0.98] transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 group"
              >
                <Users className="h-4 w-4 text-[#991B1B] transition-transform duration-300 group-hover:scale-110" />
                <span>Browse Priests</span>
              </Button>
            </Link>
          </motion.div>
        </motion.section>
      </div>

      {/* ==========================================================================
         Full-Width 3D Inward Curved Cylindrical Carousel Stage (100% Viewport Width)
         ========================================================================== */}
      <section className="w-screen relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] my-2 overflow-hidden">
        <HeroVisualCarousel />
      </section>

      <div className="flex flex-col gap-14 sm:gap-20 py-6 sm:py-10 px-4 max-w-6xl mx-auto w-full">
        {/* ==========================================================================
           How PujaCircle Works (3-Step Guided Process with Scroll Reveal)
           ========================================================================== */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full bg-[#780016] border border-[#C59A3F]/60 ring-2 ring-[#C59A3F]/20 text-white rounded-2xl p-8 sm:p-12 md:p-14 shadow-2xl relative overflow-hidden"
        >
          {/* Background Decorative Accent Ring */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full border border-amber-400/10 pointer-events-none" />
          <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full border border-amber-400/10 pointer-events-none" />

          <div className="text-center space-y-2 max-w-xl mx-auto mb-10 sm:mb-12 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-red-950 text-xs font-extrabold shadow-sm">
              <CheckCircle2 className="h-3.5 w-3.5 text-red-950" />
              <span>Sankalp Vidhi</span>
            </div>
            <h2 className="text-white font-serif text-3xl sm:text-4xl font-bold text-center">
              How PujaCircle Works
            </h2>
            <p className="text-amber-100/90 text-xs sm:text-sm text-center">
              Three simple, transparent steps from ceremony scheduling to divine
              completion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-6 relative z-10">
            {/* Step 1 */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center text-center p-6 rounded-xl bg-black/20 hover:bg-black/30 border border-amber-400/20 hover:border-amber-400/40 backdrop-blur-xs transition-all shadow-md group cursor-default"
            >
              <div className="w-14 h-14 rounded-full bg-linear-to-br from-amber-100 to-amber-200 border-2 border-[#C59A3F] text-[#780016] font-serif font-black text-2xl flex items-center justify-center shadow-lg shrink-0 group-hover:scale-105 transition-transform duration-300">
                1
              </div>
              <h3 className="text-white font-bold font-serif text-lg mt-4">
                Select Your Ceremony
              </h3>
              <p className="text-amber-100/80 text-xs sm:text-sm leading-relaxed mt-2 max-w-xs">
                Choose from Vedic rituals or ask the Sankalp Advisor for
                ceremony recommendations tailored to your family needs.
              </p>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center text-center p-6 rounded-xl bg-black/20 hover:bg-black/30 border border-amber-400/20 hover:border-amber-400/40 backdrop-blur-xs transition-all shadow-md group cursor-default"
            >
              <div className="w-14 h-14 rounded-full bg-linear-to-br from-amber-100 to-amber-200 border-2 border-[#C59A3F] text-[#780016] font-serif font-black text-2xl flex items-center justify-center shadow-lg shrink-0 group-hover:scale-105 transition-transform duration-300">
                2
              </div>
              <h3 className="text-white font-bold font-serif text-lg mt-4">
                Match with Vedic Purohit
              </h3>
              <p className="text-amber-100/80 text-xs sm:text-sm leading-relaxed mt-2 max-w-xs">
                Review verified priests in your neighborhood, examine language
                skills, credentials, and transparent dakshina pricing.
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center text-center p-6 rounded-xl bg-black/20 hover:bg-black/30 border border-amber-400/20 hover:border-amber-400/40 backdrop-blur-xs transition-all shadow-md group cursor-default"
            >
              <div className="w-14 h-14 rounded-full bg-linear-to-br from-amber-100 to-amber-200 border-2 border-[#C59A3F] text-[#780016] font-serif font-black text-2xl flex items-center justify-center shadow-lg shrink-0 group-hover:scale-105 transition-transform duration-300">
                3
              </div>
              <h3 className="text-white font-bold font-serif text-lg mt-4">
                Sacred Puja & Cash Dakshina
              </h3>
              <p className="text-amber-100/80 text-xs sm:text-sm leading-relaxed mt-2 max-w-xs">
                The priest arrives at your home with complete samagri guidance.
                Experience the sacred rituals and pay cash directly after
                completion.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* ==========================================================================
           Sacred Puja Catalog (Featured Cards with Micro-Hover Motion)
           ========================================================================== */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full space-y-6"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-2 border-b border-[hsl(var(--border))] pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#991B1B] uppercase tracking-wider mb-1">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Sacred Puja Catalog</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900">
                Featured Ceremonies & Vidhis
              </h2>
            </div>
            <Link
              to="/advisor"
              className="text-xs font-semibold text-[#991B1B] hover:text-[#780016] hover:underline inline-flex items-center gap-1 group"
            >
              <span>Explore all ceremonies in Advisor</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredPujas.map((puja, index) => (
              <motion.div
                key={puja.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                whileHover={{ y: -5 }}
                className="rounded-xl border border-[hsl(var(--border))] bg-white p-5 shadow-xs hover:shadow-lg hover:border-[#C59A3F] transition-all flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm bg-amber-50 text-[#B45309] border border-amber-200 group-hover:bg-amber-100/70 transition-colors">
                      {puja.category.replace("-", " ")}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif text-base font-bold text-stone-900 line-clamp-1 group-hover:text-[#780016] transition-colors">
                      {puja.name}
                    </h3>
                    <p className="text-xs text-[#991B1B] font-medium mt-0.5">
                      Deity: {puja.deity}
                    </p>
                  </div>

                  <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                    {puja.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-stone-100">
                  <Link
                    to={`/advisor/ritual-kit?id=${puja.id}`}
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2 text-xs font-bold text-[#991B1B] hover:text-white bg-amber-50/60 hover:bg-[#780016] rounded-md transition-all duration-200 border border-amber-300/40"
                  >
                    <span>View Ritual Kit & Vidhi</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default HomePage;
