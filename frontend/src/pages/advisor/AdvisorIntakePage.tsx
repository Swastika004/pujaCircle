import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Wand2 } from 'lucide-react';
import { IntakeForm } from '@/components/advisor/IntakeForm';
import { AdvisorIntakeFormData } from '@/schemas/advisor.schema';
import { AdvisorQuery } from '@/types/advisor';
import { matchPuja } from '@/lib/advisorMatching';
import { mockDb } from '@/mocks/data';
import { pageTransition } from '@/motion/variants';

export const AdvisorIntakePage: React.FC = () => {
  const navigate = useNavigate();
  const [isThinking, setIsThinking] = useState(false);

  const handleSubmit = (formData: AdvisorIntakeFormData) => {
    setIsThinking(true);

    const query: AdvisorQuery = {
      id: `advisor-q-${Date.now()}`,
      rawInput: formData.rawInput,
      structuredFilters: {
        occasion: formData.occasion || undefined,
        concern: formData.concern || undefined,
        urgency: formData.urgency || undefined,
      },
      matchedEntryIds: [],
      scores: [],
      timestamp: new Date().toISOString(),
    };

    // Deliberate mock delay of 750ms to simulate reasoning per DESIGN §1 and §5
    setTimeout(() => {
      const matchResult = matchPuja(query);

      // Log to mock database so Admin can inspect recommendation logs per FR-19
      mockDb.advisorQueries.push(matchResult);

      setIsThinking(false);
      navigate('/advisor/results', { state: { matchResult } });
    }, 750);
  };

  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="container mx-auto px-4 py-8 max-w-4xl space-y-8"
    >
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 rounded-sm bg-[hsl(var(--advisor-accent-soft))] px-3.5 py-1.5 text-xs font-semibold text-[hsl(var(--advisor-accent))] border border-[hsl(var(--advisor-accent))]/20">
          <Compass className="w-4 h-4" />
          <span>Sankalp Advisor • Guided Ritual Intelligence</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[hsl(var(--brand-secondary))]">
          Know Which Sacred Puja Fits Your Situation
        </h1>
        <p className="text-sm sm:text-base text-[hsl(var(--foreground-muted))] max-w-2xl mx-auto">
          Describe what you are experiencing — a new home, upcoming examinations, persistent obstacles, or ancestral memorial. Our Vedic rule-based advisor matches your specific intent to traditional rituals.
        </p>
      </div>

      <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-[hsl(var(--border))] pb-4">
          <div className="flex items-center gap-2">
            <Wand2 className="w-5 h-5 text-[hsl(var(--advisor-accent))]" />
            <h2 className="font-serif text-lg font-semibold text-[hsl(var(--foreground))]">
              Devotee Intent Capture
            </h2>
          </div>
        </div>

        <IntakeForm onSubmit={handleSubmit} isLoading={isThinking} />
      </div>

      <AnimatePresence>
        {isThinking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs"
          >
            <div className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-8 text-center max-w-sm mx-4 space-y-4 shadow-2xl">
              <div className="mx-auto w-14 h-14 rounded-full bg-[hsl(var(--advisor-accent-soft))] flex items-center justify-center text-[hsl(var(--advisor-accent))] animate-spin">
                <Compass className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif text-lg font-bold text-[hsl(var(--brand-secondary))]">
                  Reasoning and Matching Vidhis...
                </h3>
                <p className="text-xs text-[hsl(var(--foreground-muted))]">
                  Tokenizing situation keywords, correlating Vedic scriptures, and ranking deity appropriateness.
                </p>
              </div>
              <div className="flex justify-center gap-1.5 pt-2">
                <div className="w-2 h-2 rounded-full bg-[hsl(var(--advisor-accent))] animate-bounce [animation-delay:-0.3s]" />
                <div className="w-2 h-2 rounded-full bg-[hsl(var(--advisor-accent))] animate-bounce [animation-delay:-0.15s]" />
                <div className="w-2 h-2 rounded-full bg-[hsl(var(--advisor-accent))] animate-bounce" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AdvisorIntakePage;
