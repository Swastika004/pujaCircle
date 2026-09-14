import { z } from 'zod';

export const advisorIntakeSchema = z
  .object({
    rawInput: z
      .string()
      .trim()
      .min(3, 'Please describe your situation or requirement in at least 3 characters.')
      .max(1000, 'Situation description cannot exceed 1000 characters.'),
    occasion: z.string().trim().max(100, 'Occasion text too long').optional(),
    concern: z.string().trim().max(100, 'Concern text too long').optional(),
    urgency: z.enum(['low', 'medium', 'high']).optional(),
  })
  .strict();

export type AdvisorIntakeFormData = z.infer<typeof advisorIntakeSchema>;
