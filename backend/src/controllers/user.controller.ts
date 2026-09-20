import { Request, Response, NextFunction } from 'express';
import { sendSuccess } from '../views/response.view.js';

/**
 * [CONTROLLER] User Controller (Teammate Skeleton)
 * 
 * Responsibility: Devotee profile management and user address book.
 * Assigned to: Teammate (User Module)
 */
export class UserController {
  /**
   * GET /api/v1/users/profile
   */
  async getProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // TODO: [Teammate - User] Query user profile details from DB
      sendSuccess(res, 'Profile retrieved successfully.', req.user || null);
    } catch (error) {
      next(error);
    }
  }

  /**
   * PUT /api/v1/users/profile
   */
  async updateProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // TODO: [Teammate - User] Update user name and avatar in DB
      sendSuccess(res, 'Profile updated successfully.', req.user || null);
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /api/v1/users/change-password
   */
  async changePassword(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // TODO: [Teammate - User] Change password via Supabase Auth
      sendSuccess(res, 'Password updated successfully.');
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/v1/users/addresses
   */
  async getAddresses(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // TODO: [Teammate - User] Query addresses table for user's addresses
      sendSuccess(res, 'Addresses retrieved.', []);
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /api/v1/users/addresses
   */
  async addAddress(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // TODO: [Teammate - User] Insert new address into addresses table
      sendSuccess(res, 'Address saved successfully.', null, 201);
    } catch (error) {
      next(error);
    }
  }

  /**
   * DELETE /api/v1/users/addresses/:id
   */
  async deleteAddress(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // TODO: [Teammate - User] Delete address from addresses table by id
      sendSuccess(res, `Address ${req.params.id} deleted successfully.`);
    } catch (error) {
      next(error);
    }
  }
}

export const userController = new UserController();
