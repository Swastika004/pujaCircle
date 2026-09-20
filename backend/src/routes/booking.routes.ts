import { Router } from 'express';
import { bookingController } from '../controllers/booking.controller.js';
import { requireAuth } from '../middlewares/auth.middleware.js';

const router = Router();

/**
 * [ROUTE] /api/v1/bookings
 * Reservation and ceremony lifecycle routes.
 */
router.get('/', bookingController.getBookings);
router.post('/', requireAuth, bookingController.createBooking);
router.get('/:id', bookingController.getBookingById);
router.post('/:id/accept', requireAuth, bookingController.acceptBooking);
router.post('/:id/reject', requireAuth, bookingController.rejectBooking);
router.post('/:id/cancel', requireAuth, bookingController.cancelBooking);
router.post('/:id/complete', requireAuth, bookingController.completeBooking);

export const bookingRoutes = router;
