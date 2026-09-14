import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Download,
  User,
  CheckSquare,
  Square,
  Calendar,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
} from 'lucide-react';
import { mockDb } from '@/mocks/data';
import { useRitualProfileStore } from '@/store/ritualProfile.store';
import { exportRitualKitPdf } from '@/lib/pdfExport';
import { RitualProfile } from '@/types/advisor';

// Dedicated standalone page for reviewing ritual kit, samagri, and vidhi steps
export const RitualKitPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { profile, setProfile } = useRitualProfileStore();

  const [checkedSamagri, setCheckedSamagri] = useState<Record<number, boolean>>({});
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [tempProfile, setTempProfile] = useState<RitualProfile>(profile);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Retrieve matching catalog entry from query param or fallback to first entry
  const entryId = searchParams.get('id');
  const catalogList = mockDb.pujaCatalog;
  const entry = catalogList.find((item) => item.id === entryId) || catalogList[0];

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

  // Personalized Sanskrit & English Sankalp declaration (Name-based only)
  const devoteeName = profile.fullName || 'Devotee';
  const sankalpParagraph = `मम आत्मनः सकलदुरितोपशमनार्थं ... I, ${devoteeName}, do hereby take this sacred Sankalp to perform the holy ${entry.name} dedicated to ${entry.deity}. With sincere devotion, pure heart, and reverence to Vedic traditions, I pray for peace, spiritual illumination, health, and family prosperity.`;

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
      }, 2500);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm text-[hsl(var(--foreground-muted))] hover:text-[hsl(var(--foreground))] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <span className="rounded-sm bg-[hsl(var(--advisor-accent-soft))] px-2.5 py-1 text-xs font-semibold text-[hsl(var(--advisor-accent))] border border-[hsl(var(--advisor-accent))]/20">
          Vedic Ritual Kit & Vidhi
        </span>
      </div>

      
      <div className="bg-[hsl(var(--surface))] rounded-xl border border-[hsl(var(--border))] shadow-xs space-y-4 overflow-hidden">
        {/* Cover Image Banner */}
        <div className="relative h-48 sm:h-64 w-full overflow-hidden bg-stone-900">
          <img
            src={entry.coverImage}
            alt={entry.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/images/hero_vedic_puja.jpg";
            }}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/35 to-transparent" />
          <div className="absolute bottom-4 left-6 right-6 text-white space-y-1">
            <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wider uppercase bg-amber-400 text-red-950 shadow-sm">
              {entry.category.replace('-', ' ')}
            </span>
            <h1 className="font-serif text-2xl sm:text-4xl font-bold text-white tracking-tight drop-shadow-md">
              {entry.name}
            </h1>
            <p className="text-sm sm:text-base text-amber-200 font-medium drop-shadow-sm">
              Presiding Deity: {entry.deity}
            </p>
          </div>
        </div>

        <div className="p-6 sm:p-8 pt-2 space-y-4">
          <p className="text-sm text-[hsl(var(--foreground-muted))] leading-relaxed">
            {entry.description}
          </p>

        
        <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[hsl(var(--border))]">
          <button
            type="button"
            onClick={handleDownloadPdf}
            className="inline-flex items-center gap-2 rounded-md bg-[hsl(var(--brand-primary))] px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-xs hover:bg-[hsl(var(--brand-primary-hover))] transition-colors"
          >
            {downloadSuccess ? (
              <>
                <Check className="w-4 h-4" />
                <span>Downloaded PDF</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Download Printable PDF</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => navigate('/priests')}
            className="inline-flex items-center gap-2 rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--surface))] px-4 py-2.5 text-xs sm:text-sm font-semibold text-[hsl(var(--foreground))] hover:bg-[hsl(var(--surface-alt))] transition-colors"
          >
            <span>Find a Verified Purohit</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>

      
      <div className="rounded-lg border border-[hsl(var(--brand-accent))]/40 bg-[hsl(var(--brand-accent-soft))]/30 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-[hsl(var(--brand-secondary))] uppercase tracking-wider">
            <User className="w-4 h-4 text-[hsl(var(--brand-primary))]" />
            <span>Devotee Ritual Sankalp Profile</span>
          </div>
          <button
            type="button"
            onClick={() => setIsEditingProfile(!isEditingProfile)}
            className="text-xs font-medium text-[hsl(var(--brand-primary))] hover:underline"
          >
            {isEditingProfile ? 'Cancel' : 'Edit Devotee Name'}
          </button>
        </div>

        {isEditingProfile ? (
          <div className="flex flex-col sm:flex-row gap-3 pt-2 items-end">
            <div className="flex-1 w-full">
              <label className="block text-[11px] font-medium text-[hsl(var(--foreground-muted))] mb-1">
                Full Devotee Name
              </label>
              <input
                type="text"
                value={tempProfile.fullName}
                onChange={(e) => setTempProfile({ ...tempProfile, fullName: e.target.value })}
                placeholder="e.g. Debabrata Banerjee"
                className="w-full rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-2 text-xs"
              />
            </div>
            <button
              type="button"
              onClick={handleSaveProfile}
              className="rounded-md bg-[hsl(var(--brand-primary))] px-4 py-2 text-xs font-medium text-white shadow-xs hover:bg-[hsl(var(--brand-primary-hover))] h-8 shrink-0"
            >
              Save Name
            </button>
          </div>
        ) : (
          <div className="py-1 text-xs">
            <span className="text-[hsl(var(--foreground-muted))] block text-[10px] uppercase">Devotee</span>
            <span className="font-semibold text-[hsl(var(--foreground))]">{profile.fullName || 'Not Provided'}</span>
          </div>
        )}

        
        <div className="rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-4">
          <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-[hsl(var(--brand-secondary))]">
            <Sparkles className="w-3.5 h-3.5 text-[hsl(var(--brand-primary))]" />
            <span>Personalized Sankalp Text (Resolve)</span>
          </div>
          <p className="text-xs text-[hsl(var(--foreground-muted))] italic leading-relaxed">
            "{sankalpParagraph}"
          </p>
        </div>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-[hsl(var(--border))] pb-3">
            <h2 className="font-serif text-lg font-bold text-[hsl(var(--foreground))]">
              Sacred Samagri Checklist
            </h2>
            <span className="text-xs text-[hsl(var(--foreground-muted))] font-medium">
              {Object.values(checkedSamagri).filter(Boolean).length} of {entry.samagriList.length} ready
            </span>
          </div>

          <p className="text-xs text-[hsl(var(--foreground-muted))]">
            Check off items as you gather them before the Purohit arrives at your residence:
          </p>

          <div className="space-y-2.5">
            {entry.samagriList.map((item, index) => {
              const isChecked = !!checkedSamagri[index];
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggleSamagri(index)}
                  className={`w-full flex items-start gap-3 p-3 rounded-md border text-left transition-all text-xs ${
                    isChecked
                      ? 'border-emerald-200 bg-emerald-50/50 text-emerald-900'
                      : 'border-[hsl(var(--border))] bg-[hsl(var(--surface-alt))] text-[hsl(var(--foreground))] hover:border-[hsl(var(--brand-primary))]/40'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {isChecked ? (
                      <CheckSquare className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Square className="w-4 h-4 text-[hsl(var(--foreground-muted))]" />
                    )}
                  </div>
                  <span className={`leading-relaxed ${isChecked ? 'line-through opacity-70' : ''}`}>
                    {item}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        
        <div className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-6 space-y-4 shadow-xs">
          <div className="border-b border-[hsl(var(--border))] pb-3">
            <h2 className="font-serif text-lg font-bold text-[hsl(var(--foreground))]">
              Step-by-Step Vidhi Order
            </h2>
            <p className="text-xs text-[hsl(var(--foreground-muted))] mt-0.5">
              Sequence of liturgical stages performed during the sacred ceremony
            </p>
          </div>

          <div className="space-y-3.5">
            {entry.steps.map((step, index) => (
              <div key={step} className="flex items-start gap-3 text-xs">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[hsl(var(--brand-primary-soft))] font-bold text-[hsl(var(--brand-primary))] text-[11px]">
                  {index + 1}
                </span>
                <p className="text-[hsl(var(--foreground))] leading-relaxed pt-0.5">
                  {step}
                </p>
              </div>
            ))}
          </div>

          
          <div className="mt-6 rounded-md border border-[hsl(var(--advisor-accent))]/30 bg-[hsl(var(--advisor-accent-soft))]/40 p-4 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-[hsl(var(--advisor-accent))]">
              <Calendar className="w-4 h-4" />
              <span>Auspicious Timing & Tradition Note</span>
            </div>
            <p className="text-xs text-[hsl(var(--foreground-muted))] leading-relaxed">
              {entry.timingNote}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RitualKitPage;
