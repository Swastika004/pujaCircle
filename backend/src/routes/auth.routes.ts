import { Router } from 'express';
import { authController } from '../controllers/auth.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import {
  sendOtpValidation,
  verifyOtpValidation,
  registerUserValidation,
} from '../validations/auth.validation.js';

const router = Router();

router.post('/send-otp', validate(sendOtpValidation), authController.sendOtp);
router.post('/verify-otp', validate(verifyOtpValidation), authController.verifyOtp);
router.post('/register', validate(registerUserValidation), authController.register);
router.post('/logout', authController.logout);

export default router;
