import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Sparkles, HelpCircle, ArrowRight } from 'lucide-react';
import { advisorIntakeSchema, AdvisorIntakeFormData } from '@/schemas/advisor.schema';
import { buttonPress } from '@/motion/variants';

export interface IntakeFormProps {
  onSubmit: (data: AdvisorIntakeFormData) => void;
  isLoading?: boolean;
  initialValues?: Partial<AdvisorIntakeFormData>;
  submitButtonText?: string;
}

const QUICK_PROMPTS = [
  'I just bought a new flat and want positive energy before moving in.',
  "My exams are coming up and I'm anxious about focus and recall.",
  'Recurring bad luck, nothing is working out lately despite efforts.',
  'Starting a new business and retail shop next month.',
  "It's my father's death anniversary and we wish to perform rites.",
  "Planning my daughter's wedding and need divine blessings for harmony.",
];

export const IntakeForm: React.FC<IntakeFormProps> = ({
  onSubmit,
  isLoading = false,
  initialValues,
  submitButtonText = 'Discover Recommended Pujas',
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AdvisorIntakeFormData>({
    resolver: zodResolver(advisorIntakeSchema),
    defaultValues: {
      rawInput: initialValues?.rawInput || '',
      occasion: initialValues?.occasion || '',
      concern: initialValues?.concern || '',
      urgency: initialValues?.urgency || 'medium',
    },
  });

  const rawInputValue = watch('rawInput');

  const handleQuickPromptClick = (prompt: string) => {
    setValue('rawInput', prompt, { shouldValidate: true });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <label
          htmlFor="rawInput"
          className="block text-sm font-medium text-[hsl(var(--foreground))] flex items-center justify-between"
        >
          <span>Describe your situation or spiritual intent</span>
          <span className="text-xs text-[hsl(var(--foreground-muted))]">Plain language</span>
        </label>
        <textarea
          id="rawInput"
          rows={4}
          {...register('rawInput')}
          disabled={isLoading}
          placeholder="e.g. We recently bought our first home and want to conduct a housewarming before Navratri, or I am experiencing persistent career obstacles..."
          className="w-full rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-3 text-sm text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--foreground-muted))] focus:border-[hsl(var(--advisor-accent))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--advisor-accent))]/20 transition-colors"
        />
        {errors.rawInput && (
          <p className="text-xs text-[hsl(var(--danger))] mt-1">{errors.rawInput.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <span className="text-xs font-medium text-[hsl(var(--foreground-muted))] flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-[hsl(var(--advisor-accent))]" />
          Common situations to try:
        </span>
        <div className="flex flex-wrap gap-2">
          {QUICK_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => handleQuickPromptClick(prompt)}
              className="text-xs rounded-full px-3 py-1 bg-[hsl(var(--surface-alt))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--advisor-accent-soft))] hover:text-[hsl(var(--advisor-accent))] border border-transparent hover:border-[hsl(var(--advisor-accent))]/30 transition-all text-left"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--surface-alt))]/50 p-4 space-y-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-[hsl(var(--advisor-accent))]" />
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--foreground-muted))]">
            Optional Guided Context
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label htmlFor="occasion" className="block text-xs font-medium text-[hsl(var(--foreground-muted))] mb-1">
              Occasion
            </label>
            <select
              id="occasion"
              {...register('occasion')}
              disabled={isLoading}
              className="w-full rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-2 text-xs text-[hsl(var(--foreground))] focus:border-[hsl(var(--advisor-accent))] focus:outline-none"
            >
              <option value="">Any Occasion</option>
              <option value="new-home">New Home / Griha Pravesh</option>
              <option value="marriage">Marriage / Vivah Sanskar</option>
              <option value="business">New Business / Shop Opening</option>
              <option value="education">Exam / Academic Success</option>
              <option value="ancestral">Ancestral / Shraddha Memorial</option>
              <option value="festival">Festival / Seasonal Vrat</option>
            </select>
          </div>

          <div>
            <label htmlFor="concern" className="block text-xs font-medium text-[hsl(var(--foreground-muted))] mb-1">
              Primary Concern
            </label>
            <select
              id="concern"
              {...register('concern')}
              disabled={isLoading}
              className="w-full rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-2 text-xs text-[hsl(var(--foreground))] focus:border-[hsl(var(--advisor-accent))] focus:outline-none"
            >
              <option value="">General Well-being</option>
              <option value="dosha-nivaran">Planetary Dosha / Astrological</option>
              <option value="health">Health & Longevity (Ayushya)</option>
              <option value="debt">Debt Clearance / Financial Relief</option>
              <option value="peace">Domestic Peace & Harmony</option>
            </select>
          </div>

          <div>
            <label htmlFor="urgency" className="block text-xs font-medium text-[hsl(var(--foreground-muted))] mb-1">
              Timeframe
            </label>
            <select
              id="urgency"
              {...register('urgency')}
              disabled={isLoading}
              className="w-full rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-2 text-xs text-[hsl(var(--foreground))] focus:border-[hsl(var(--advisor-accent))] focus:outline-none"
            >
              <option value="low">Flexible / Future planning</option>
              <option value="medium">This Month</option>
              <option value="high">Urgent (Within 7 days)</option>
            </select>
          </div>
        </div>
      </div>

      <motion.button
        type="submit"
        disabled={isLoading || !rawInputValue?.trim()}
        whileTap={buttonPress}
        className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-[hsl(var(--advisor-accent))] px-5 py-3 text-sm font-medium text-white shadow-sm hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        <span>{isLoading ? 'Reasoning and matching rituals...' : submitButtonText}</span>
        {!isLoading && <ArrowRight className="w-4 h-4" />}
      </motion.button>
    </form>
  );
};
