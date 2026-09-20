import { Response } from 'express';

/**
 * [VIEW] Standard JSON Response Presenter
 * Enforces consistent API payload formatting across all PujaCircle controllers.
 */
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: any;
}

export const sendSuccess = <T>(res: Response, message: string, data?: T, statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    ...(data !== undefined ? { data } : {}),
  } satisfies ApiResponse<T>);
};

export const sendError = (res: Response, message: string, statusCode = 400, errors?: any) => {
  return res.status(statusCode).json({
    success: false,
    message,
    ...(errors !== undefined ? { errors } : {}),
  } satisfies ApiResponse);
};
