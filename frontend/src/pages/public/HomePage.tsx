import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  ScrollText,
  Flame,
  CheckCircle2,
  Star,
} from 'lucide-react';

/**
 * HomePage
 * High-contrast festive Indian temple aesthetic.
 * Pure Solid White canvas (#FFFFFF) with Deep Alta/Vermilion Red (#991B1B, #780016)
 * and Haldi Gold trims.
 * Zero CSS Grids, Zero CSS Gradients, Zero Off-White/Beige fills.
 */
export const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col text-stone-900 w-full">
      <div className="flex flex-col gap-14 sm:gap-18 md:gap-22 py-10 sm:py-14 md:py-18 px-4 max-w-6xl mx-auto w-full">
        {/* 2. Hero Section: Flex Column / Row Layout */}
        <section className="w-full flex flex-col items-center text-center gap-6">
          {/* Sacred Sanskrit Auspicious Invocation Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 border border-[#C59A3F]/50 text-[#991B1B] text-xs font-bold shadow-xs hover:shadow-md hover:border-[#C59A3F] transition-all cursor-default">
            <Sparkles className="h-3.5 w-3.5 text-[#B45309] animate-pulse" />
            <span className="font-serif tracking-wide text-[#780016]">॥ शुभं करोति कल्याणम् ॥</span>
            <span className="text-stone-300">|</span>
            <span className="text-stone-800">Verified Vedic Purohits For Sacred Home Ceremonies</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#991B1B] font-serif leading-[1.15] max-w-4xl">
            Authentic Vedic Pujas, <br />
            <span className="text-[#1A0507]">Conducted with Sanctity at Your Home</span>
          </h1>

          <p className="text-stone-800 font-medium text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed">
            PujaCircle matches your family with experienced, credentialed Vedic Purohits across Indian cities. Experience traditional rituals with complete transparency and direct cash dakshina.
          </p>

          {/* Sacred Vedic Assurance Showcase Banner (Royal Temple Styling) */}
          <div className="w-full max-w-3xl pt-1">
            <div className="bg-white/95 border border-[#C59A3F]/50 ring-1 ring-amber-400/20 rounded-2xl shadow-sm hover:shadow-md transition-shadow px-4 sm:px-6 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 divide-y sm:divide-y-0 sm:divide-x divide-amber-200/70">
              {/* Vow 1 */}
              <div className="flex items-center gap-3 w-full sm:w-auto sm:flex-1 justify-start sm:justify-center sm:pr-3 group/vow cursor-default">
                <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-300/80 flex items-center justify-center text-[#991B1B] shrink-0 shadow-2xs group-hover/vow:scale-110 group-hover/vow:bg-amber-100 transition-transform">
                  <ShieldCheck className="h-4.5 w-4.5" />
                </div>
                <div className="text-left">
                  <p className="text-xs sm:text-[13px] font-bold font-serif text-stone-900 leading-tight">
                    Gurukul-Verified Scholars
                  </p>
                  <p className="text-[11px] text-[#B45309] font-medium leading-tight mt-0.5">
                    100% Vetted Vedic Purohits
                  </p>
                </div>
              </div>

              {/* Vow 2 */}
              <div className="flex items-center gap-3 w-full sm:w-auto sm:flex-1 justify-start sm:justify-center pt-3 sm:pt-0 sm:px-3 group/vow cursor-default">
                <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-300/80 flex items-center justify-center text-[#991B1B] shrink-0 shadow-2xs group-hover/vow:scale-110 group-hover/vow:bg-amber-100 transition-transform">
                  <ScrollText className="h-4.5 w-4.5" />
                </div>
                <div className="text-left">
                  <p className="text-xs sm:text-[13px] font-bold font-serif text-stone-900 leading-tight">
                    Shastric Samagri Guide
                  </p>
                  <p className="text-[11px] text-[#B45309] font-medium leading-tight mt-0.5">
                    Complete Ritual Checklist
                  </p>
                </div>
              </div>

              {/* Vow 3 */}
              <div className="flex items-center gap-3 w-full sm:w-auto sm:flex-1 justify-start sm:justify-center pt-3 sm:pt-0 sm:pl-3 group/vow cursor-default">
                <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-300/80 flex items-center justify-center text-emerald-700 shrink-0 shadow-2xs group-hover/vow:scale-110 group-hover/vow:bg-emerald-100 transition-transform">
                  <CheckCircle2 className="h-4.5 w-4.5" />
                </div>
                <div className="text-left">
                  <p className="text-xs sm:text-[13px] font-bold font-serif text-stone-900 leading-tight">
                    Direct Cash Dakshina
                  </p>
                  <p className="text-[11px] text-emerald-800 font-medium leading-tight mt-0.5">
                    Zero Online Prepayment
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full max-w-lg">
            <Link to="/user/register" className="w-full sm:w-auto flex-1 group">
              <Button
                size="lg"
                className="w-full h-13 text-base font-bold gap-2.5 bg-linear-to-r from-[#991B1B] via-[#851313] to-[#6E0E0E] hover:from-[#780016] hover:to-[#550808] text-amber-100 px-8 py-3.5 rounded-2xl border-2 border-amber-400/50 shadow-[0_10px_25px_-5px_rgba(153,27,27,0.45)] hover:shadow-[0_14px_30px_-4px_rgba(153,27,27,0.6)] active:scale-[0.98] transition-all duration-300 cursor-pointer"
              >
                <Sparkles className="h-4 w-4 text-amber-300 group-hover:rotate-12 transition-transform duration-300" />
                <span className="tracking-wide">Get Started</span>
                <ArrowRight className="h-4 w-4 text-amber-300 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>

            <Link to="/user/login" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto h-13 px-7 text-sm sm:text-base font-bold border-2 border-[#C59A3F]/50 text-stone-800 bg-white/90 hover:bg-amber-50/90 hover:border-[#C59A3F] hover:text-[#780016] rounded-2xl shadow-sm hover:shadow-md active:scale-[0.98] transition-all duration-200 cursor-pointer"
              >
                Sign In
              </Button>
            </Link>
          </div>

          {/* Hero Visual Showcase */}
          <div className="w-full max-w-5xl mt-4 relative rounded-3xl overflow-hidden border border-[#C59A3F]/60 ring-2 ring-[#C59A3F]/20 bg-white shadow-2xl group/showcase">
            <div className="relative w-full h-72 sm:h-96 md:h-115 overflow-hidden">
              <img
                src="/images/hero_vedic_puja.jpg"
                alt="Sacred Vedic Puja & Havan Ceremony"
                className="w-full h-full object-cover object-center select-none transition-transform duration-700 ease-out group-hover/showcase:scale-105"
                loading="eager"
              />
              {/* Subtle protective overlay for contrast */}
              <div className="absolute inset-0 bg-stone-950/15 pointer-events-none transition-opacity duration-300 group-hover/showcase:opacity-10" />

              {/* Top Floating Badge */}
              <div className="absolute top-3 sm:top-5 left-3 sm:left-5 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-[#C59A3F]/50 shadow-md text-xs font-bold text-[#780016] backdrop-blur-xs transition-transform duration-300 hover:scale-105">
                <Flame className="h-4 w-4 text-[#991B1B] animate-pulse" />
                <span>Sacred Vedic Vidhi & Havan at Home</span>
              </div>

              {/* Top Right Guidance Badge */}
              <div className="hidden sm:flex absolute top-5 right-5 bg-white/95 text-stone-900 px-3.5 py-1.5 rounded-full border border-[#C59A3F]/50 shadow-md text-xs font-bold items-center gap-1.5 backdrop-blur-xs transition-transform duration-300 hover:scale-105">
                <Sparkles className="h-3.5 w-3.5 text-[#B45309]" />
                <span>Samagri & Muhurat Guidance Included</span>
              </div>

              {/* Floating Verified Purohit Spotlight Card with Gentle Float */}
              <div className="absolute bottom-3 left-3 right-3 sm:right-auto sm:bottom-6 sm:left-6 bg-white/95 backdrop-blur-sm border border-[#C59A3F]/60 ring-1 ring-amber-500/15 rounded-2xl p-3 sm:p-3.5 shadow-2xl flex items-center gap-3 sm:gap-4 max-w-sm text-left animate-float-gentle hover:animate-none hover:shadow-amber-500/20 transition-all">
                <div className="relative shrink-0">
                  <img
                    src="/images/verified_purohit_portrait.jpg"
                    alt="Pt. Ramesh Shastri - Verified Vedic Purohit"
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover ring-2 ring-[#C59A3F] bg-amber-50 shadow-xs"
                    loading="eager"
                  />
                  <div
                    className="absolute -bottom-1 -right-1 bg-[#991B1B] text-white rounded-full p-1 shadow-sm border-2 border-white"
                    title="Gurukul Lineage Verified"
                  >
                    <ShieldCheck className="h-3 w-3" />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs sm:text-sm font-bold font-serif text-stone-900 truncate">
                      Pt. Ramesh Shastri
                    </h4>
                    <span className="shrink-0 inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-amber-100 text-stone-900 border border-amber-300 text-[10px] font-extrabold">
                      <Star className="h-2.5 w-2.5 fill-amber-500 text-amber-500" />
                      4.9
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-600 truncate mt-0.5">
                    18+ Yrs Exp • Varanasi Gurukul
                  </p>
                  <div className="flex items-center justify-between gap-2 mt-1.5 pt-1 border-t border-stone-100">
                    <span className="text-[10px] font-bold text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      Vedic Scholar
                    </span>
                    <Link
                      to="/user/register"
                      className="text-[10px] font-bold text-[#991B1B] hover:text-[#780016] hover:underline flex items-center gap-0.5"
                    >
                      <span>Connect Now</span>
                      <ArrowRight className="h-2.5 w-2.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Trust Badges Row (Flex Row with Pure White Pills and Crisp Gold Strokes) */}
        <section className="w-full">
          <div className="flex flex-wrap items-center justify-center gap-4 w-full">
            <div className="w-full sm:w-[calc(50%-8px)] lg:w-[calc(25%-12px)] min-w-55 flex items-center gap-3.5 p-4 rounded-2xl border border-[#C59A3F]/35 bg-white shadow-sm hover:border-[#C59A3F] hover:-translate-y-1 hover:shadow-md transition-all duration-300 group cursor-default">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50/90 border border-[#C59A3F]/40 text-[#991B1B] shrink-0 group-hover:scale-110 group-hover:bg-amber-100 transition-transform">
                <ShieldCheck className="h-5 w-5 text-[#991B1B]" />
              </div>
              <div className="space-y-0.5">
                <p className="text-xs sm:text-sm font-bold text-stone-900 leading-snug">Pay After Puja</p>
                <p className="text-[11px] text-stone-600 leading-tight">Direct Cash Dakshina</p>
              </div>
            </div>

            <div className="w-full sm:w-[calc(50%-8px)] lg:w-[calc(25%-12px)] min-w-55 flex items-center gap-3.5 p-4 rounded-2xl border border-[#C59A3F]/35 bg-white shadow-sm hover:border-[#C59A3F] hover:-translate-y-1 hover:shadow-md transition-all duration-300 group cursor-default">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50/90 border border-[#C59A3F]/40 text-[#991B1B] shrink-0 group-hover:scale-110 group-hover:bg-amber-100 transition-transform">
                <Award className="h-5 w-5 text-[#991B1B]" />
              </div>
              <div className="space-y-0.5">
                <p className="text-xs sm:text-sm font-bold text-stone-900 leading-snug">100% Vedic Verified</p>
                <p className="text-[11px] text-stone-600 leading-tight">Vetted Gurukul Scholars</p>
              </div>
            </div>

            <div className="w-full sm:w-[calc(50%-8px)] lg:w-[calc(25%-12px)] min-w-55 flex items-center gap-3.5 p-4 rounded-2xl border border-[#C59A3F]/35 bg-white shadow-sm hover:border-[#C59A3F] hover:-translate-y-1 hover:shadow-md transition-all duration-300 group cursor-default">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50/90 border border-[#C59A3F]/40 text-[#991B1B] shrink-0 group-hover:scale-110 group-hover:bg-amber-100 transition-transform">
                <ScrollText className="h-5 w-5 text-[#991B1B]" />
              </div>
              <div className="space-y-0.5">
                <p className="text-xs sm:text-sm font-bold text-stone-900 leading-snug">Samagri Checklist</p>
                <p className="text-[11px] text-stone-600 leading-tight">Tailored for Every Ritual</p>
              </div>
            </div>

            <div className="w-full sm:w-[calc(50%-8px)] lg:w-[calc(25%-12px)] min-w-55 flex items-center gap-3.5 p-4 rounded-2xl border border-[#C59A3F]/35 bg-white shadow-sm hover:border-[#C59A3F] hover:-translate-y-1 hover:shadow-md transition-all duration-300 group cursor-default">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50/90 border border-[#C59A3F]/40 text-[#991B1B] shrink-0 group-hover:scale-110 group-hover:bg-amber-100 transition-transform">
                <Flame className="h-5 w-5 text-[#991B1B]" />
              </div>
              <div className="space-y-0.5">
                <p className="text-xs sm:text-sm font-bold text-stone-900 leading-snug">Authentic Vidhi</p>
                <p className="text-[11px] text-stone-600 leading-tight">Pure Sanatan Traditions</p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. "How PujaCircle Works" Section (Royal Temple Pavilion Styling) */}
        <section className="w-full bg-[#780016] border border-[#C59A3F]/60 ring-2 ring-[#C59A3F]/20 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="text-center space-y-2 max-w-xl mx-auto mb-8 sm:mb-10 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-400 text-red-950 text-xs font-extrabold shadow-sm">
              <CheckCircle2 className="h-3.5 w-3.5 text-red-950" />
              <span>Sankalp Vidhi</span>
            </div>
            <h2 className="text-white font-serif text-3xl sm:text-4xl font-bold text-center">
              How PujaCircle Works
            </h2>
            <p className="text-amber-100/90 text-xs sm:text-sm text-center">
              Three simple, transparent steps from ceremony scheduling to divine completion.
            </p>
          </div>

          {/* Steps Container: Flex Column / Row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 w-full relative z-10">
            {/* Step 1 */}
            <div className="flex-1 flex flex-col items-center text-center p-4 rounded-2xl hover:bg-white/5 transition-all duration-300 group cursor-default">
              <div className="w-13 h-13 rounded-full bg-amber-100 border-2 border-[#C59A3F] text-[#780016] font-serif font-black text-xl flex items-center justify-center shadow-lg shrink-0 group-hover:scale-110 group-hover:bg-amber-300 transition-all duration-300">
                1
              </div>
              <h3 className="text-white font-bold font-serif text-base mt-3 md:mt-4 group-hover:text-amber-300 transition-colors">
                Select Your Ceremony
              </h3>
              <p className="text-amber-100/80 text-xs leading-relaxed mt-1.5 max-w-xs">
                Choose from sacred ceremonies including Griha Pravesh, Satyanarayan Katha, Rudrabhishek, and Havans with tailored muhurat advice.
              </p>
            </div>

            {/* Connecting Dashed Gold Border */}
            <div className="hidden md:block flex-1 border-t-2 border-dashed border-[#C59A3F]/50 mx-2" />

            {/* Step 2 */}
            <div className="flex-1 flex flex-col items-center text-center p-4 rounded-2xl hover:bg-white/5 transition-all duration-300 group cursor-default">
              <div className="w-13 h-13 rounded-full bg-amber-100 border-2 border-[#C59A3F] text-[#780016] font-serif font-black text-xl flex items-center justify-center shadow-lg shrink-0 group-hover:scale-110 group-hover:bg-amber-300 transition-all duration-300">
                2
              </div>
              <h3 className="text-white font-bold font-serif text-base mt-3 md:mt-4 group-hover:text-amber-300 transition-colors">
                Match with Vedic Purohit
              </h3>
              <p className="text-amber-100/80 text-xs leading-relaxed mt-1.5 max-w-xs">
                Review verified priests in your neighborhood, examine language skills, credentials, and transparent dakshina pricing.
              </p>
            </div>

            {/* Connecting Dashed Gold Border */}
            <div className="hidden md:block flex-1 border-t-2 border-dashed border-[#C59A3F]/50 mx-2" />

            {/* Step 3 */}
            <div className="flex-1 flex flex-col items-center text-center p-4 rounded-2xl hover:bg-white/5 transition-all duration-300 group cursor-default">
              <div className="w-13 h-13 rounded-full bg-amber-100 border-2 border-[#C59A3F] text-[#780016] font-serif font-black text-xl flex items-center justify-center shadow-lg shrink-0 group-hover:scale-110 group-hover:bg-amber-300 transition-all duration-300">
                3
              </div>
              <h3 className="text-white font-bold font-serif text-base mt-3 md:mt-4 group-hover:text-amber-300 transition-colors">
                Sacred Puja & Cash Dakshina
              </h3>
              <p className="text-amber-100/80 text-xs leading-relaxed mt-1.5 max-w-xs">
                The priest arrives at your home with complete samagri guidance. Experience the sacred rituals and pay cash directly after completion.
              </p>
            </div>
          </div>
        </section>

        {/* 6. Frequently Asked Questions (Accordion) */}
        <section className="w-full max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#1A0507]">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 font-medium">
              Clear, transparent answers regarding booking, verification, and payment.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-3">
            <AccordionItem
              value="item-1"
              className="border border-[#C59A3F]/30 hover:border-[#C59A3F] transition-colors bg-white rounded-2xl px-5 shadow-xs overflow-hidden"
            >
              <AccordionTrigger className="text-sm sm:text-base font-bold font-serif hover:no-underline text-stone-900">
                How are priests verified on PujaCircle?
              </AccordionTrigger>
              <AccordionContent className="text-xs sm:text-sm text-stone-700 leading-relaxed font-normal">
                Every Purohit undergoes rigorous verification including Vedic education background, qualification credentials, identity documents, and ritual knowledge assessment.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-2"
              className="border border-[#C59A3F]/30 hover:border-[#C59A3F] transition-colors bg-white rounded-2xl px-5 shadow-xs overflow-hidden"
            >
              <AccordionTrigger className="text-sm sm:text-base font-bold font-serif hover:no-underline text-stone-900">
                How does the payment process work?
              </AccordionTrigger>
              <AccordionContent className="text-xs sm:text-sm text-stone-700 leading-relaxed font-normal">
                No online advance payment is ever required. You pay the exact agreed dakshina directly in cash to the priest at your home after the puja has concluded peacefully.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-3"
              className="border border-[#C59A3F]/30 hover:border-[#C59A3F] transition-colors bg-white rounded-2xl px-5 shadow-xs overflow-hidden"
            >
              <AccordionTrigger className="text-sm sm:text-base font-bold font-serif hover:no-underline text-stone-900">
                Will the Purohit provide the Samagri list?
              </AccordionTrigger>
              <AccordionContent className="text-xs sm:text-sm text-stone-700 leading-relaxed font-normal">
                Yes. Upon booking confirmation, you will receive an itemized samagri checklist tailored to your ceremony and regional family traditions, with guidance on preparatory steps.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-4"
              className="border border-[#C59A3F]/30 hover:border-[#C59A3F] transition-colors bg-white rounded-2xl px-5 shadow-xs overflow-hidden"
            >
              <AccordionTrigger className="text-sm sm:text-base font-bold font-serif hover:no-underline text-stone-900">
                Can I consult with the Purohit regarding the auspicious Muhurat?
              </AccordionTrigger>
              <AccordionContent className="text-xs sm:text-sm text-stone-700 leading-relaxed font-normal">
                Absolutely. During your booking request, you can select your preferred day or request the priest to recommend the best auspicious Muhurat according to your family's Janma Rashi and Panchang.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* 7. Bottom Banner (Rich Sanctum Maroon Card with Dual Solid Buttons) */}
        <section className="w-full">
          <div className="bg-[#590B16] border border-[#C59A3F]/70 ring-2 ring-[#C59A3F]/20 rounded-3xl text-white p-8 sm:p-12 text-center space-y-6 shadow-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400 text-stone-950 text-xs font-bold shadow-sm">
              <Flame className="h-3.5 w-3.5 text-[#780016]" />
              <span className="font-serif">॥ सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः ॥</span>
            </div>

            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif text-white max-w-2xl mx-auto leading-snug">
              Organize Your Family Puja with Complete Peace of Mind
            </h3>

            <p className="text-xs sm:text-sm text-amber-100/90 max-w-xl mx-auto leading-relaxed">
              Create a devotee account in under two minutes to discover verified Purohits near you, consult auspicious muhurats, and manage ceremonies.
            </p>

            <div className="flex flex-wrap justify-center items-center gap-4 pt-2">
              <Link to="/auth/user/register">
                <Button
                  size="lg"
                  className="bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold rounded-xl px-7 py-3 shadow-lg active:scale-[0.98] transition-transform text-sm sm:text-base border border-amber-300 cursor-pointer"
                >
                  <span>Register as Devotee</span>
                  <ArrowRight className="h-4 w-4 ml-1.5" />
                </Button>
              </Link>

              <Link to="/priest/register">
                <Button
                  size="lg"
                  className="bg-[#780016] border border-[#C59A3F] text-amber-200 hover:bg-[#991B1B] rounded-xl px-7 py-3 font-bold active:scale-[0.98] transition-transform text-sm sm:text-base cursor-pointer"
                >
                  Apply as a Purohit
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;

