import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowLeft, AlertCircle, RefreshCw } from 'lucide-react';
import { AdvisorQuery, AdvisorMatch } from '@/types/advisor';
import { MatchResultCard } from '@/components/advisor/MatchResultCard';
import { RitualKitView } from '@/components/advisor/RitualKitView';
import { matchPuja } from '@/lib/advisorMatching';
import { staggerContainer, fadeInUp, buttonPress } from '@/motion/variants';

export const AdvisorResultPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Selected match for ritual kit modal
  const [activeKitMatch, setActiveKitMatch] = useState<AdvisorMatch | null>(null);

  // Read results from navigation state or compute default if refreshed
  const initialResult = location.state?.matchResult as AdvisorQuery | undefined;

  const matchResult: AdvisorQuery =
    initialResult ||
    matchPuja({
      id: 'default-q',
      rawInput: 'Family peace and general well-being',
      matchedEntryIds: [],
      scores: [],
      timestamp: new Date().toISOString(),
    });

  const matches: AdvisorMatch[] = matchResult.matches || [];
  const isFallback = matchResult.scores[0] !== undefined && matchResult.scores[0] < 0.35;

  // Implements FR-15: pass puja type as query param into priest listing without altering listing logic
  const handleSelectPriestListing = (pujaName: string) => {
    navigate(`/priests?service=${encodeURIComponent(pujaName)}`);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[hsl(var(--border))] pb-6">
        <div className="space-y-1">
          <button
            type="button"
            onClick={() => navigate('/advisor')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[hsl(var(--advisor-accent))] hover:underline mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Refine your situation</span>
          </button>
          <h1 className="font-serif text-3xl font-bold text-[hsl(var(--brand-secondary))]">
            Recommended Sacred Pujas
          </h1>
          <p className="text-xs sm:text-sm text-[hsl(var(--foreground-muted))]">
            Ranked by Vedic relevance to your described situation
          </p>
        </div>

        <motion.button
          type="button"
          whileTap={buttonPress}
          onClick={() => navigate('/advisor')}
          className="inline-flex items-center gap-2 rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--surface))] px-3 py-2 text-xs font-medium text-[hsl(var(--foreground))] hover:bg-[hsl(var(--surface-alt))] transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5 text-[hsl(var(--advisor-accent))]" />
          <span>New Query</span>
        </motion.button>
      </div>

      <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--surface-alt))]/60 p-4 space-y-1">
        <div className="flex items-center gap-2 text-xs font-semibold text-[hsl(var(--advisor-accent))] uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Your Described Situation</span>
        </div>
        <p className="text-sm font-medium text-[hsl(var(--foreground))] italic">
          "{matchResult.rawInput}"
        </p>
      </div>

      {isFallback && (
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="rounded-xl border border-[hsl(var(--warning))]/30 bg-[hsl(var(--warning))]/10 p-4 flex items-start gap-3 text-xs text-[hsl(var(--foreground))]"
        >
          <AlertCircle className="w-5 h-5 text-[hsl(var(--warning))] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-semibold text-[hsl(var(--warning))] block">
              General Blessing Suggestions (FR-13 Fallback)
            </span>
            <p className="text-[hsl(var(--foreground-muted))]">
              No specific puja scored above our strict confidence threshold for this phrasing. We are presenting our closest, time-tested universal blessings for family peace and harmony.
            </p>
          </div>
        </motion.div>
      )}

      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="space-y-4"
      >
        {matches.map((match, index) => (
          <MatchResultCard
            key={match.entry.id}
            match={match}
            rank={index + 1}
            onSelectPriestListing={handleSelectPriestListing}
            onViewRitualKit={(m) => setActiveKitMatch(m)}
          />
        ))}
      </motion.div>

      {activeKitMatch && (
        <RitualKitView
          entry={activeKitMatch.entry}
          isOpen={!!activeKitMatch}
          onClose={() => setActiveKitMatch(null)}
          onSelectPriest={handleSelectPriestListing}
        />
      )}
    </div>
  );
};

export default AdvisorResultPage;
