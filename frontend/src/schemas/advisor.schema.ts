import { z } from 'zod';

export const advisorIntakeSchema = z.object({
  rawInput: z
    .string()
    .min(3, 'Please describe your situation or requirement in at least 3 characters.'),
  occasion: z.string().optional(),
  concern: z.string().optional(),
  urgency: z.enum(['low', 'medium', 'high']).optional(),
});

export type AdvisorIntakeFormData = z.infer<typeof advisorIntakeSchema>;
