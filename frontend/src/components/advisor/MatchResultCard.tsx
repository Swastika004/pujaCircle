import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, BookOpen, CheckCircle, ArrowRight } from 'lucide-react';
import { AdvisorMatch } from '@/types/advisor';
import { fadeInUp, cardHover, buttonPress } from '@/motion/variants';

export interface MatchResultCardProps {
  match: AdvisorMatch;
  rank: number;
  onSelectPriestListing: (pujaName: string, catalogId?: string) => void;
  onViewRitualKit: (match: AdvisorMatch) => void;
}

export const MatchResultCard: React.FC<MatchResultCardProps> = ({
  match,
  rank,
  onSelectPriestListing,
  onViewRitualKit,
}) => {
  const { entry, score, reason } = match;
  const matchPercentage = Math.round(score * 100);

  return (
    <motion.div
      variants={fadeInUp}
      initial="initial"
      animate="animate"
      exit="exit"
      whileHover="hover"
      className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
    >
      <motion.div variants={cardHover} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start">
          <div className="relative w-full sm:w-44 h-32 sm:h-32 rounded-lg overflow-hidden shrink-0 bg-stone-900 border border-[hsl(var(--border))] shadow-xs group">
            <img
              src={entry.coverImage}
              alt={entry.name}
              className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/images/hero_vedic_puja.jpg";
              }}
            />
            <div className="absolute top-2 left-2">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-black/70 text-amber-300 text-xs font-bold backdrop-blur-xs border border-amber-400/40 shadow-xs">
                #{rank}
              </span>
            </div>
          </div>

          <div className="flex-1 space-y-2 w-full">
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-0.5">
                <span className="text-[10px] uppercase tracking-wider font-bold text-[hsl(var(--foreground-muted))] bg-[hsl(var(--surface-alt))] px-2 py-0.5 rounded border border-[hsl(var(--border))]">
                  {entry.category.replace('-', ' ')}
                </span>
                <h3 className="font-serif text-lg sm:text-xl font-semibold text-[hsl(var(--foreground))] pt-1">
                  {entry.name}
                </h3>
                <p className="text-xs text-[hsl(var(--brand-primary))] font-medium">
                  Presiding Deity: {entry.deity}
                </p>
              </div>

              <div className="inline-flex items-center gap-1 rounded-sm bg-[hsl(var(--advisor-accent-soft))] px-2.5 py-1 text-xs font-semibold text-[hsl(var(--advisor-accent))] shrink-0">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{matchPercentage}% Match</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[hsl(var(--foreground))] line-clamp-2">
              {entry.description}
            </p>
          </div>
        </div>

        <div className="rounded-md bg-[hsl(var(--surface-alt))] p-3 text-xs text-[hsl(var(--foreground))] space-y-1 border border-[hsl(var(--border))]">
          <div className="flex items-center gap-1 font-semibold text-[hsl(var(--advisor-accent))]">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Why this is recommended:</span>
          </div>
          <p className="text-[hsl(var(--foreground-muted))]">{reason}</p>
        </div>

        <div className="flex items-center gap-4 text-xs text-[hsl(var(--foreground-muted))] pt-1">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-[hsl(var(--brand-accent))]" />
            {entry.timingNote.slice(0, 45)}...
          </span>
          <span className="flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5 text-[hsl(var(--foreground-muted))]" />
            {entry.steps.length} Vedic Steps
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
          <motion.button
            type="button"
            whileTap={buttonPress}
            onClick={() => onViewRitualKit(match)}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-md border border-[hsl(var(--advisor-accent))] bg-transparent px-4 py-2 text-xs font-medium text-[hsl(var(--advisor-accent))] hover:bg-[hsl(var(--advisor-accent-soft))] transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Personalized Ritual Kit</span>
          </motion.button>

          <motion.button
            type="button"
            whileTap={buttonPress}
            onClick={() => onSelectPriestListing(entry.name, entry.id)}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-md bg-[hsl(var(--brand-primary))] px-4 py-2 text-xs font-medium text-white hover:bg-[hsl(var(--brand-primary-dark))] transition-colors shadow-sm"
          >
            <span>Book Verified Priest</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};
