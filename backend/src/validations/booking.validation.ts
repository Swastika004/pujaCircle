import { z } from 'zod';

export const createBookingValidation = z
  .object({
    priestId: z.string().trim().min(1, 'Priest ID required').max(100),
    ritualId: z.string().trim().max(100).optional(),
    priestServiceId: z.string().trim().max(100).optional(),
    addressId: z.string().trim().min(1, 'Address ID required').max(100),
    slotId: z.string().trim().min(1, 'Slot ID required').max(150),
    bookingDate: z.string().trim().regex(/^\d{4}-\d{2}-\d{2}$/, 'Booking date must be YYYY-MM-DD'),
    specialInstructions: z.string().trim().max(500).optional(),
    userNotes: z.string().trim().max(500).optional(),
  })
  .strict();
