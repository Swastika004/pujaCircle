/**
 * Backend Environment Configuration
 * Validates environment variables using Zod schema to ensure no missing secrets.
 */
import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z
  .object({
    PORT: z.coerce.number().default(5000),
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    DATABASE_URL: z.string().optional().default(''),
    JWT_SECRET: z
      .string()
      .min(16, 'JWT_SECRET must be at least 16 characters')
      .default('development_jwt_secret_key_minimum_16_chars'),
    JWT_EXPIRES_IN: z.string().default('7d'),
    COOKIE_SECRET: z.string().optional().default(''),
    IMAGEKIT_PUBLIC_KEY: z.string().optional().default(''),
    IMAGEKIT_PRIVATE_KEY: z.string().optional().default(''),
    IMAGEKIT_URL_ENDPOINT: z.string().optional().default(''),
    OTP_PROVIDER_API_KEY: z.string().optional().default(''),
  })
  .refine(
    (data) => {
      if (data.NODE_ENV === 'production') {
        return (
          data.JWT_SECRET !== 'development_jwt_secret_key_minimum_16_chars' &&
          data.JWT_SECRET.length >= 32
        );
      }
      return true;
    },
    {
      message:
        'In production mode, a non-default cryptographically secure JWT_SECRET of at least 32 characters must be supplied.',
      path: ['JWT_SECRET'],
    }
  );

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ FATAL: Invalid backend environment configuration:', parsed.error.format());
  process.exit(1);
}

export const env = parsed.data;
