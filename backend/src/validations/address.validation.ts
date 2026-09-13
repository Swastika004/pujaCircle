import { z } from 'zod';

const indianPhoneRegex = /^(\+91)?[6-9]\d{9}$/;

export const createAddressValidation = z
  .object({
    label: z.enum(['HOME', 'OFFICE', 'TEMPLE', 'OTHER']).default('HOME'),
    recipientName: z.string().trim().min(2, 'Name must be at least 2 characters').max(100).optional(),
    phoneNumber: z
      .string()
      .trim()
      .regex(indianPhoneRegex, 'Enter a valid Indian mobile number')
      .optional(),
    houseBuilding: z.string().trim().min(1, 'House/Building is required').max(150),
    street: z.string().trim().max(150).optional(),
    locality: z.string().trim().max(150).optional(),
    pincode: z
      .string()
      .trim()
      .length(6, 'PIN code must be exactly 6 digits')
      .regex(/^[1-9][0-9]{5}$/, 'Valid 6-digit Indian PIN code required'),
    city: z.string().trim().min(2, 'City is required').max(100),
    district: z.string().trim().min(2, 'District is required').max(100),
    state: z.string().trim().min(2, 'State is required').max(100),
  })
  .strict();
