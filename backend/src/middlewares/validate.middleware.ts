import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { ApiResponse } from '../utils/api-response.js';

/**
 * Zod Request Validation Middleware
 * Validates req.body against strict schema; rejects invalid or unexpected properties with 400.
 */
export const validate = (schema: ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      const errorDetails = parsed.error.errors.map((e) => ({
        field: e.path.join('.'),
        message: e.message,
      }));
      return ApiResponse.error(res, 'Validation failed. Please verify input parameters.', 400, errorDetails);
    }
    req.body = parsed.data;
    next();
  };
};
