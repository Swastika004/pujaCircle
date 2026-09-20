import { z } from 'zod';

/**
 * [VALIDATOR] Auth Validation Schemas
 * Type-safe input checking for authentication, registration, and OTP flows.
 */

// Phone number validator: Allows +91 prefix or 10-digit format
const phoneRegex = /^(\+91[\-\s]?)?[6-9]\d{9}$/;

export const loginSchema = z
  .object({
    identifier: z.string().optional(),
    email: z.string().email('Invalid email address').optional(),
    phoneNumber: z.string().optional(),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
  })
  .refine((data) => data.identifier || data.email || data.phoneNumber, {
    message: 'Please provide either an email, phone number, or identifier.',
    path: ['identifier'],
  });

export const registerAddressSchema = z.object({
  houseNo: z.string().min(1, 'House/Flat number is required'),
  houseBuilding: z.string().optional(),
  street: z.string().optional(),
  locality: z.string().optional(),
  villageTown: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  district: z.string().min(1, 'District is required'),
  state: z.string().min(1, 'State is required'),
  pincode: z.string().regex(/^\d{6}$/, 'PIN code must be a 6-digit number'),
});

export const registerUserSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  phoneNumber: z.string().regex(phoneRegex, 'Please enter a valid 10-digit Indian phone number'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters').optional(),
  address: registerAddressSchema.optional(),
});

export const registerPriestSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  phoneNumber: z.string().regex(phoneRegex, 'Please enter a valid 10-digit Indian phone number'),
  email: z.string().email('Invalid email address').optional(),
  password: z.string().min(6, 'Password must be at least 6 characters').optional(),
  experienceYears: z.coerce.number().min(0).default(0),
  bio: z.string().max(1000).default(''),
  languages: z.array(z.string()).default([]),
  specializations: z.array(z.string()).default([]),
  serviceAreas: z.array(z.string()).default([]),
  city: z.string().default(''),
  state: z.string().default(''),
  pincode: z.string().optional(),
});

export const phoneOtpRequestSchema = z.object({
  phoneNumber: z.string().regex(phoneRegex, 'Please enter a valid 10-digit Indian phone number'),
});

export const verifyPhoneOtpSchema = z.object({
  phoneNumber: z.string().regex(phoneRegex, 'Please enter a valid 10-digit Indian phone number'),
  otp: z.string().min(4, 'OTP must be at least 4 digits').max(6, 'OTP must not exceed 6 digits'),
});

export const emailOtpRequestSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export const verifyEmailOtpSchema = z.object({
  email: z.string().email('Invalid email address'),
  otp: z.string().min(4, 'OTP must be at least 4 digits').max(6, 'OTP must not exceed 6 digits'),
  newPassword: z.string().min(6, 'New password must be at least 6 characters').optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterUserInput = z.infer<typeof registerUserSchema>;
export type RegisterPriestInput = z.infer<typeof registerPriestSchema>;
export type PhoneOtpRequestInput = z.infer<typeof phoneOtpRequestSchema>;
export type VerifyPhoneOtpInput = z.infer<typeof verifyPhoneOtpSchema>;
export type EmailOtpRequestInput = z.infer<typeof emailOtpRequestSchema>;
export type VerifyEmailOtpInput = z.infer<typeof verifyEmailOtpSchema>;
