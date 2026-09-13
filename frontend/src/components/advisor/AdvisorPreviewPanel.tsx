import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Compass, Sparkles, CheckCircle2, History } from 'lucide-react';
import { IntakeForm } from './IntakeForm';
import { AdvisorIntakeFormData } from '@/schemas/advisor.schema';
import { AdvisorQuery, AdvisorMatch } from '@/types/advisor';
import { matchPuja } from '@/lib/advisorMatching';
import { mockDb } from '@/mocks/data';
import { fadeInUp } from '@/motion/variants';

export const AdvisorPreviewPanel: React.FC = () => {
  const [previewResult, setPreviewResult] = useState<AdvisorQuery | null>(null);
  const [activeTab, setActiveTab] = useState<'tester' | 'logs'>('tester');

  // Reuses IntakeForm per FR-19 to let Admin test matching quality without duplicating form logic
  const handleTestMatch = (formData: AdvisorIntakeFormData) => {
    const query: AdvisorQuery = {
      id: `admin-preview-${Date.now()}`,
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

    const result = matchPuja(query);
    setPreviewResult(result);
  };

  const loggedQueries = mockDb.advisorQueries || [];

  return (
    <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-6 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[hsl(var(--border))] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-[hsl(var(--advisor-accent))]" />
            <h2 className="font-serif text-lg font-bold text-[hsl(var(--foreground))]">
              Advisor QA & Preview Console (FR-19)
            </h2>
          </div>
          <p className="text-xs text-[hsl(var(--foreground-muted))] mt-0.5">
            Test and inspect matching engine scoring against live session catalog entries
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[hsl(var(--surface-alt))] p-1 rounded-md border border-[hsl(var(--border))] text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('tester')}
            className={`px-3 py-1 rounded-sm font-medium transition-colors ${
              activeTab === 'tester'
                ? 'bg-[hsl(var(--surface))] text-[hsl(var(--advisor-accent))] shadow-xs'
                : 'text-[hsl(var(--foreground-muted))] hover:text-[hsl(var(--foreground))]'
            }`}
          >
            Live Match Tester
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('logs')}
            className={`px-3 py-1 rounded-sm font-medium transition-colors flex items-center gap-1.5 ${
              activeTab === 'logs'
                ? 'bg-[hsl(var(--surface))] text-[hsl(var(--advisor-accent))] shadow-xs'
                : 'text-[hsl(var(--foreground-muted))] hover:text-[hsl(var(--foreground))]'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>Devotee Query Logs ({loggedQueries.length})</span>
          </button>
        </div>
      </div>

      {activeTab === 'tester' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[hsl(var(--foreground-muted))]">
              Test Input (Reusing Devotee Intake Form)
            </h3>
            <IntakeForm
              onSubmit={handleTestMatch}
              submitButtonText="Run QA Match Test"
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[hsl(var(--foreground-muted))] flex items-center justify-between">
              <span>Scoring & Diagnostic Output</span>
              {previewResult && (
                <span className="text-[10px] text-[hsl(var(--advisor-accent))] font-normal">
                  {previewResult.matches?.length || 0} matches generated
                </span>
              )}
            </h3>

            {!previewResult ? (
              <div className="rounded-xl border border-dashed border-[hsl(var(--border))] p-8 text-center text-xs text-[hsl(var(--foreground-muted))]">
                Enter situation text on the left to inspect raw matching scores and tag overlap diagnostics.
              </div>
            ) : (
              <motion.div
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                className="space-y-3"
              >
                {previewResult.matches?.map((match: AdvisorMatch, idx: number) => (
                  <div
                    key={match.entry.id}
                    className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--surface-alt))] p-4 space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[hsl(var(--advisor-accent-soft))] text-[hsl(var(--advisor-accent))] font-bold text-[10px]">
                          #{idx + 1}
                        </span>
                        <span className="font-semibold text-[hsl(var(--foreground))]">
                          {match.entry.name}
                        </span>
                      </div>
                      <span className="rounded-sm bg-[hsl(var(--advisor-accent))] px-2 py-0.5 font-bold text-white text-[10px]">
                        Score: {match.score} ({Math.round(match.score * 100)}%)
                      </span>
                    </div>

                    <div className="text-[11px] text-[hsl(var(--foreground-muted))]">
                      <strong>Deity:</strong> {match.entry.deity} • <strong>Category:</strong> {match.entry.category}
                    </div>

                    <div className="flex items-start gap-1.5 text-[11px] text-[hsl(var(--advisor-accent))] bg-[hsl(var(--surface))] p-2 rounded border border-[hsl(var(--border))]">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                      <span>{match.reason}</span>
                    </div>

                    <div className="pt-1">
                      <span className="text-[10px] text-[hsl(var(--foreground-muted))] block mb-1">
                        Catalog Tags:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {match.entry.intentTags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded bg-[hsl(var(--surface))] px-1.5 py-0.5 text-[10px] border border-[hsl(var(--border))]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'logs' && (
        <div className="space-y-3">
          {loggedQueries.length === 0 ? (
            <p className="text-xs text-[hsl(var(--foreground-muted))] text-center py-8">
              No devotee recommendation queries recorded yet in this session.
            </p>
          ) : (
            <div className="divide-y divide-[hsl(var(--border))] rounded-lg border overflow-hidden">
              {loggedQueries.map((log) => (
                <div key={log.id} className="p-3 bg-[hsl(var(--surface))] text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-[hsl(var(--foreground))]">"{log.rawInput}"</span>
                    <span className="text-[10px] text-[hsl(var(--foreground-muted))]">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-[hsl(var(--advisor-accent))]">
                    <Sparkles className="w-3 h-3" />
                    <span>Matched: {log.matchedEntryIds.join(', ')}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
