import { z } from 'zod';

const indianPhoneRegex = /^(\+91)?[6-9]\d{9}$/;
const numericOtpRegex = /^\d{6}$/;

/**
 * Strict Auth Request Validation Schemas
 */
export const sendOtpValidation = z
  .object({
    phoneNumber: z
      .string()
      .trim()
      .min(10, 'Mobile number must be at least 10 digits')
      .max(15, 'Mobile number cannot exceed 15 characters')
      .regex(indianPhoneRegex, 'Enter a valid Indian mobile number'),
  })
  .strict();

export const verifyOtpValidation = z
  .object({
    phoneNumber: z
      .string()
      .trim()
      .min(10, 'Mobile number must be at least 10 digits')
      .max(15, 'Mobile number cannot exceed 15 characters')
      .regex(indianPhoneRegex, 'Enter a valid Indian mobile number'),
    otp: z
      .string()
      .trim()
      .length(6, 'OTP must be exactly 6 digits')
      .regex(numericOtpRegex, 'OTP must contain numbers only'),
  })
  .strict();

export const registerUserValidation = z
  .object({
    fullName: z.string().trim().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long'),
    phoneNumber: z
      .string()
      .trim()
      .min(10, 'Mobile number must be at least 10 digits')
      .max(15, 'Mobile number cannot exceed 15 characters')
      .regex(indianPhoneRegex, 'Enter a valid Indian mobile number'),
    email: z.string().trim().email('Invalid email address').max(150).optional(),
    password: z.string().min(6, 'Password must be at least 6 characters').max(100).optional(),
  })
  .strict();
