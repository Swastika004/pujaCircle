import { Request, Response, NextFunction } from 'express';
import { Role } from '../types/express.js';
import { sendError } from '../views/response.view.js';
import { isAdmin } from '../utils/auth.util.js';

/**
 * [MIDDLEWARE] Role-Based Access Control (RBAC) Guard
 * Restricts access to routes based on user role ('USER', 'PRIEST', 'ADMIN').
 * 
 * Usage:
 * router.get('/admin/priests', requireAuth, requireRole('ADMIN'), adminController.getAllPriests);
 */
export const requireRole = (...allowedRoles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      sendError(res, 'Authentication required.', 401);
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      sendError(
        res,
        `Access denied. Requires one of the following roles: [${allowedRoles.join(', ')}].`,
        403
      );
      return;
    }

    next();
  };
};

// Convenient DRY middleware dedicated for admin-only routes
export const requireAdmin = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.user) {
    sendError(res, 'Authentication required.', 401);
    return;
  }

  if (!isAdmin(req)) {
    sendError(res, 'Access denied. Administrative privileges required.', 403);
    return;
  }

  next();
};

