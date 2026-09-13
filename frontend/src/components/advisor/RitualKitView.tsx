import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Download,
  Check,
  User,
  Scroll,
  CheckSquare,
  Square,
  Calendar,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { PujaCatalogEntry, RitualProfile } from '@/types/advisor';
import { useRitualProfileStore } from '@/store/ritualProfile.store';
import { exportRitualKitPdf } from '@/lib/pdfExport';
import { modalTransition, buttonPress } from '@/motion/variants';

export interface RitualKitViewProps {
  entry: PujaCatalogEntry;
  isOpen: boolean;
  onClose: () => void;
  onSelectPriest: (pujaName: string) => void;
}

export const RitualKitView: React.FC<RitualKitViewProps> = ({
  entry,
  isOpen,
  onClose,
  onSelectPriest,
}) => {
  const { profile, setProfile } = useRitualProfileStore();

  const [checkedSamagri, setCheckedSamagri] = useState<Record<number, boolean>>({});
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Form states for profile editing
  const [tempProfile, setTempProfile] = useState<RitualProfile>(profile);

  const toggleSamagri = (index: number) => {
    setCheckedSamagri((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleSaveProfile = () => {
    setProfile(tempProfile);
    setIsEditingProfile(false);
  };

  const sankalpParagraph = `मम आत्मनः सकलदुरितोपशमनार्थं ... I, ${profile.fullName || 'Devotee'}, do hereby take this sacred Sankalp to perform the holy ${entry.name} dedicated to ${entry.deity}. With sincere devotion, pure heart, and reverence to Vedic traditions, I pray for peace, spiritual illumination, health, and family prosperity.`;

  const handleDownloadPdf = () => {
    const success = exportRitualKitPdf(
      entry.name,
      entry.deity,
      profile,
      entry.samagriList,
      entry.steps,
      sankalpParagraph,
      entry.timingNote
    );

    if (success) {
      setDownloadSuccess(true);
      setTimeout(() => {
        setDownloadSuccess(false);
      }, 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs overflow-y-auto">
        <motion.div
          variants={modalTransition}
          initial="initial"
          animate="animate"
          exit="exit"
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-6 shadow-xl space-y-6"
        >
          <div className="flex items-start justify-between border-b border-[hsl(var(--border))] pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="rounded-sm bg-[hsl(var(--advisor-accent-soft))] px-2.5 py-0.5 text-xs font-semibold text-[hsl(var(--advisor-accent))]">
                  Personalized Ritual Kit
                </span>
                <span className="text-xs text-[hsl(var(--foreground-muted))]">
                  • {entry.name}
                </span>
              </div>
              <h2 className="font-serif text-2xl font-semibold text-[hsl(var(--foreground))]">
                Samagri & Preparations
              </h2>
              <p className="text-xs text-[hsl(var(--foreground-muted))]">
                Vedic ritual requirements, deity offerings, and auspicious guidance.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-md p-2 text-[hsl(var(--foreground-muted))] hover:bg-[hsl(var(--surface-alt))] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="rounded-md border border-[hsl(var(--brand-accent))]/30 bg-[hsl(var(--brand-accent-soft))]/40 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-[hsl(var(--brand-secondary))] uppercase tracking-wider">
                <User className="w-4 h-4 text-[hsl(var(--brand-primary))]" />
                <span>Devotee Ritual Profile</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setTempProfile(profile);
                  setIsEditingProfile(!isEditingProfile);
                }}
                className="text-xs font-medium text-[hsl(var(--brand-primary))] hover:underline"
              >
                {isEditingProfile ? 'Cancel' : 'Edit Devotee Name'}
              </button>
            </div>

            {isEditingProfile ? (
              <div className="flex flex-col sm:flex-row gap-3 pt-2 items-end">
                <div className="flex-1 w-full">
                  <label className="block text-xs text-[hsl(var(--foreground-muted))] mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={tempProfile.fullName}
                    onChange={(e) =>
                      setTempProfile((p) => ({ ...p, fullName: e.target.value }))
                    }
                    className="w-full rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-2 text-xs text-[hsl(var(--foreground))]"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleSaveProfile}
                  className="rounded-md bg-[hsl(var(--brand-primary))] px-4 py-2 text-xs font-semibold text-white hover:bg-[hsl(var(--brand-primary-dark))] transition-colors h-8 shrink-0"
                >
                  Save Name
                </button>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="rounded-md bg-[hsl(var(--surface))] px-2.5 py-1 border border-[hsl(var(--border))] font-medium">
                  Name: <strong>{profile.fullName}</strong>
                </span>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Scroll className="w-4 h-4 text-[hsl(var(--advisor-accent))]" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-[hsl(var(--foreground-muted))]">
                Personalized Devotee Sankalp (संकल्प)
              </h3>
            </div>
            <div className="rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--surface-alt))] p-4 text-xs italic leading-relaxed text-[hsl(var(--foreground))] border-l-4 border-l-[hsl(var(--brand-primary))]">
              {sankalpParagraph}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[hsl(var(--foreground-muted))] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[hsl(var(--brand-primary))]" />
                Required Sacred Samagri Checklist ({entry.samagriList.length} items)
              </h3>
              <span className="text-xs text-[hsl(var(--foreground-muted))]">
                {Object.values(checkedSamagri).filter(Boolean).length} / {entry.samagriList.length} prepared
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {entry.samagriList.map((item, index) => {
                const isChecked = !!checkedSamagri[index];
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleSamagri(index)}
                    className="flex items-center gap-2 text-left rounded-md p-2 border border-[hsl(var(--border))] bg-[hsl(var(--surface))] hover:bg-[hsl(var(--surface-alt))] transition-colors text-xs"
                  >
                    {isChecked ? (
                      <CheckSquare className="w-4 h-4 text-[hsl(var(--success))] shrink-0" />
                    ) : (
                      <Square className="w-4 h-4 text-[hsl(var(--foreground-muted))] shrink-0" />
                    )}
                    <span className={isChecked ? 'line-through text-[hsl(var(--foreground-muted))]' : 'text-[hsl(var(--foreground))]'}>
                      {item}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[hsl(var(--foreground-muted))]">
              Vedic Vidhi Steps Sequence
            </h3>
            <div className="space-y-2">
              {entry.steps.map((step, index) => (
                <div
                  key={step}
                  className="flex items-start gap-3 rounded-md border border-[hsl(var(--border))] p-3 text-xs"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[hsl(var(--advisor-accent-soft))] text-[hsl(var(--advisor-accent))] font-bold text-[10px]">
                    {index + 1}
                  </span>
                  <span className="text-[hsl(var(--foreground))] pt-0.5">{step}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-md bg-[hsl(var(--surface-alt))] p-3 text-xs text-[hsl(var(--foreground-muted))] border border-[hsl(var(--border))]">
            <Calendar className="w-4 h-4 text-[hsl(var(--brand-accent))] shrink-0" />
            <span>
              <strong>Auspicious Timing & Tradition Note:</strong> {entry.timingNote}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-[hsl(var(--border))]">
            <motion.button
              type="button"
              whileTap={buttonPress}
              onClick={handleDownloadPdf}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-md border border-[hsl(var(--advisor-accent))] bg-transparent px-4 py-2.5 text-xs font-semibold text-[hsl(var(--advisor-accent))] hover:bg-[hsl(var(--advisor-accent-soft))] transition-all"
            >
              {downloadSuccess ? (
                <>
                  <Check className="w-4 h-4 text-[hsl(var(--success))]" />
                  <span>PDF Ready / Printed</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Download Ritual Kit PDF</span>
                </>
              )}
            </motion.button>

            <motion.button
              type="button"
              whileTap={buttonPress}
              onClick={() => {
                onClose();
                onSelectPriest(entry.name);
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-md bg-[hsl(var(--brand-primary))] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[hsl(var(--brand-primary-dark))] transition-all shadow-sm"
            >
              <span>Select & Book Verified Priest</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
