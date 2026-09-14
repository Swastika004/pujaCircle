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
import { HeroVisualCarousel } from "@/components/common/HeroVisualCarousel";
import { FeaturedCeremoniesCarousel } from "@/components/common/FeaturedCeremoniesCarousel";

// HomePage
// High-contrast festive Indian temple aesthetic with modern scroll animations & microinteractions.
// Follows strict Phase 2 spec: Hero with dual CTAs, 3-step how-it-works, and featured catalog carousel.
export const HomePage: React.FC = () => {
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
            Not sure which ceremony fits your family's needs? Describe your life
            situation to our{" "}
            <span className="font-semibold text-[#780016]">
              Sankalp Advisor
            </span>{" "}
            for scriptural recommendations, generate your personalized{" "}
            <span className="font-semibold text-[#780016]">
              Samagri Checklist & Ritual Kit
            </span>
            , and book verified{" "}
            <span className="font-semibold text-[#780016]">
              Gurukul Purohits
            </span>{" "}
            with direct in-person cash dakshina.
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
              <span>Sankalp to Siddhi</span>
            </div>
            <h2 className="text-white font-serif text-3xl sm:text-4xl font-bold text-center">
              How PujaCircle Works
            </h2>
            <p className="text-amber-100/90 text-xs sm:text-sm text-center">
              From discovering the right ritual to sacred home completion—pure
              transparency every step of the way.
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
              <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300 mt-4">
                Step 1 · Guidance
              </span>
              <h3 className="text-white font-bold font-serif text-lg mt-1">
                Describe Your Life Situation
              </h3>
              <p className="text-amber-100/80 text-xs sm:text-sm leading-relaxed mt-2 max-w-xs">
                Unsure which ritual fits? Share your life event—such as a new
                home, career transition, business opening, or family peace. The
                Sankalp Advisor recommends the exact Vedic ceremony with
                scriptural rationale and auspicious timing.
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
              <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300 mt-4">
                Step 2 · Preparation
              </span>
              <h3 className="text-white font-bold font-serif text-lg mt-1">
                Get Personalized Ritual Kit
              </h3>
              <p className="text-amber-100/80 text-xs sm:text-sm leading-relaxed mt-2 max-w-xs">
                Instantly receive your verified samagri checklist (so you never
                overpay or miss an offering), step-by-step Vedic vidhi order,
                and sacred Sankalp prayer text tailored with your name in a
                downloadable PDF.
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
              <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300 mt-4">
                Step 3 · Sanctity
              </span>
              <h3 className="text-white font-bold font-serif text-lg mt-1">
                Home Vidhi & Cash Dakshina
              </h3>
              <p className="text-amber-100/80 text-xs sm:text-sm leading-relaxed mt-2 max-w-xs">
                Select a verified Gurukul-trained purohit in Kolkata by language
                and tradition. The priest conducts the sacred ceremony at your
                residence; pay transparent dakshina directly in cash upon
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

          <FeaturedCeremoniesCarousel />
        </motion.section>
      </div>
    </div>
  );
};

export default HomePage;
