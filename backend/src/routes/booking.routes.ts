import { Router } from 'express';
import { bookingController } from '../controllers/booking.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createBookingValidation } from '../validations/booking.validation.js';

const router = Router();

router.get('/', bookingController.getBookings);
router.get('/:id', bookingController.getBookingById);
router.post('/', validate(createBookingValidation), bookingController.createBooking);
router.patch('/:id/cancel', bookingController.cancelBooking);

export default router;
