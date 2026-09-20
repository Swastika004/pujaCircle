import { pgTable, uuid, integer, timestamp, pgEnum, text } from 'drizzle-orm/pg-core';
import { users } from './user.model.js';
import { priestProfiles } from './priest.model.js';
import { addresses } from './address.model.js';
import { pujaCatalog } from './catalog.model.js';

export const bookingStatusEnum = pgEnum('booking_status', [
  'PENDING',
  'CONFIRMED',
  'REJECTED',
  'EXPIRED',
  'CANCELLED',
  'COMPLETED',
]);

/**
 * [MODEL] Bookings Table
 * Represents devotee reservations with assigned verified priests.
 */
export const bookings = pgTable('bookings', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  priestId: uuid('priest_id').notNull().references(() => priestProfiles.id, { onDelete: 'cascade' }),
  pujaCatalogId: uuid('puja_catalog_id').references(() => pujaCatalog.id),
  addressId: uuid('address_id').references(() => addresses.id),
  status: bookingStatusEnum('status').default('PENDING').notNull(),
  scheduledDate: timestamp('scheduled_date').notNull(),
  totalPrice: integer('total_price').notNull(), // INR amount in rupees (₹)
  notes: text('notes'),
  cancellationReason: text('cancellation_reason'),
  rating: integer('rating'),
  review: text('review'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type Booking = typeof bookings.$inferSelect;
export type NewBooking = typeof bookings.$inferInsert;
