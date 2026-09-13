import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Sparkles,
  ArrowRight,
  Flame,
  CheckCircle2,
  BookOpen,
  Compass,
  Users,
} from 'lucide-react';
import { SEED_PUJA_CATALOG } from '@/mocks/data';

// HomePage
// High-contrast festive Indian temple aesthetic.
// Follows strict Phase 2 spec: Hero with dual CTAs, 3-step how-it-works, and 4 featured catalog cards.
// Zero booking/login forms, no FAQ accordion, no trust badges, no dead routes.
export const HomePage: React.FC = () => {
  // First 4 featured catalog ceremonies for home showcase
  const featuredPujas = SEED_PUJA_CATALOG.slice(0, 4);

  return (
    <div className="flex flex-col text-stone-900 w-full">
      <div className="flex flex-col gap-12 sm:gap-16 py-10 sm:py-14 px-4 max-w-6xl mx-auto w-full">
        
        <section className="w-full flex flex-col items-center text-center gap-6">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm bg-white/95 border border-[#C59A3F]/50 text-[#991B1B] text-xs font-bold shadow-xs hover:border-[#C59A3F] transition-all cursor-default">
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
            PujaCircle matches your family with experienced, credentialed Vedic Purohits across West Bengal. Experience traditional rituals with complete transparency, tailored samagri checklists, and direct cash dakshina.
          </p>

          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 w-full max-w-md">
            <Link to="/advisor" className="w-full sm:w-auto flex-1">
              <Button
                size="lg"
                className="w-full h-13 text-base font-bold gap-2.5 bg-linear-to-r from-[#991B1B] via-[#851313] to-[#6E0E0E] hover:from-[#780016] hover:to-[#550808] text-amber-100 px-8 py-3.5 rounded-md border-2 border-amber-400/50 shadow-[0_10px_25px_-5px_rgba(153,27,27,0.45)] hover:shadow-[0_14px_30px_-4px_rgba(153,27,27,0.6)] active:scale-[0.98] transition-all duration-300 cursor-pointer"
              >
                <Compass className="h-4 w-4 text-amber-300" />
                <span className="tracking-wide">Ask the Advisor</span>
                <ArrowRight className="h-4 w-4 text-amber-300" />
              </Button>
            </Link>

            <Link to="/priests" className="w-full sm:w-auto flex-1">
              <Button
                size="lg"
                variant="outline"
                className="w-full h-13 px-7 text-sm sm:text-base font-bold border-2 border-[#C59A3F]/50 text-stone-800 bg-white/90 hover:bg-amber-50/90 hover:border-[#C59A3F] hover:text-[#780016] rounded-md shadow-sm hover:shadow-md active:scale-[0.98] transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
              >
                <Users className="h-4 w-4 text-[#991B1B]" />
                <span>Browse Priests</span>
              </Button>
            </Link>
          </div>

          
          <div className="w-full max-w-5xl mt-4 relative rounded-xl overflow-hidden border border-[#C59A3F]/60 ring-2 ring-[#C59A3F]/20 bg-white shadow-xl">
            <div className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden">
              <img
                src="/images/hero_vedic_puja.jpg"
                alt="Sacred Vedic Puja & Havan Ceremony"
                className="w-full h-full object-cover object-center select-none"
                loading="eager"
              />
              <div className="absolute inset-0 bg-stone-950/20 pointer-events-none" />

              
              <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:left-6 flex items-center gap-3 px-4 py-2 rounded-md bg-white/95 border border-[#C59A3F]/60 shadow-lg text-xs font-bold text-[#780016] backdrop-blur-xs">
                <Flame className="h-4 w-4 text-[#991B1B]" />
                <span>Sacred Vedic Vidhi, Samagri & Muhurat Guidance at Home</span>
              </div>
            </div>
          </div>
        </section>

        
        <section className="w-full bg-[#780016] border border-[#C59A3F]/60 ring-2 ring-[#C59A3F]/20 text-white rounded-xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
          <div className="text-center space-y-2 max-w-xl mx-auto mb-8 sm:mb-10 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-amber-400 text-red-950 text-xs font-extrabold shadow-sm">
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

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 w-full relative z-10">
            
            <div className="flex-1 flex flex-col items-center text-center p-4 rounded-lg group cursor-default">
              <div className="w-13 h-13 rounded-full bg-amber-100 border-2 border-[#C59A3F] text-[#780016] font-serif font-black text-xl flex items-center justify-center shadow-lg shrink-0">
                1
              </div>
              <h3 className="text-white font-bold font-serif text-base mt-3 md:mt-4">
                Select Your Ceremony
              </h3>
              <p className="text-amber-100/80 text-xs leading-relaxed mt-1.5 max-w-xs">
                Choose from Vedic rituals or ask the Sankalp Advisor for ceremony recommendations tailored to your family needs.
              </p>
            </div>

            <div className="hidden md:block flex-1 border-t-2 border-dashed border-[#C59A3F]/50 mx-2" />

            
            <div className="flex-1 flex flex-col items-center text-center p-4 rounded-lg group cursor-default">
              <div className="w-13 h-13 rounded-full bg-amber-100 border-2 border-[#C59A3F] text-[#780016] font-serif font-black text-xl flex items-center justify-center shadow-lg shrink-0">
                2
              </div>
              <h3 className="text-white font-bold font-serif text-base mt-3 md:mt-4">
                Match with Vedic Purohit
              </h3>
              <p className="text-amber-100/80 text-xs leading-relaxed mt-1.5 max-w-xs">
                Review verified priests in your neighborhood, examine language skills, credentials, and transparent dakshina pricing.
              </p>
            </div>

            <div className="hidden md:block flex-1 border-t-2 border-dashed border-[#C59A3F]/50 mx-2" />

            
            <div className="flex-1 flex flex-col items-center text-center p-4 rounded-lg group cursor-default">
              <div className="w-13 h-13 rounded-full bg-amber-100 border-2 border-[#C59A3F] text-[#780016] font-serif font-black text-xl flex items-center justify-center shadow-lg shrink-0">
                3
              </div>
              <h3 className="text-white font-bold font-serif text-base mt-3 md:mt-4">
                Sacred Puja & Cash Dakshina
              </h3>
              <p className="text-amber-100/80 text-xs leading-relaxed mt-1.5 max-w-xs">
                The priest arrives at your home with complete samagri guidance. Experience the sacred rituals and pay cash directly after completion.
              </p>
            </div>
          </div>
        </section>

        
        <section className="w-full space-y-6">
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
              className="text-xs font-semibold text-[#991B1B] hover:text-[#780016] hover:underline inline-flex items-center gap-1"
            >
              <span>Explore all ceremonies in Advisor</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredPujas.map((puja) => (
              <div
                key={puja.id}
                className="rounded-lg border border-[hsl(var(--border))] bg-white p-5 shadow-xs hover:shadow-md hover:border-[#C59A3F] transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm bg-amber-50 text-[#B45309] border border-amber-200">
                      {puja.category.replace('-', ' ')}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif text-base font-bold text-stone-900 line-clamp-1">
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
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2 text-xs font-bold text-[#991B1B] hover:text-[#780016] bg-amber-50/60 hover:bg-amber-100/80 rounded-md transition-colors"
                  >
                    <span>View Ritual Kit & Vidhi</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
