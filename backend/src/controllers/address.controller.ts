import { Request, Response, NextFunction } from 'express';
import { sendSuccess } from '../views/response.view.js';

/**
 * [CONTROLLER] Address Controller (Teammate Skeleton)
 * 
 * Responsibility: Devotee ceremonial address management.
 * Assigned to: Teammate (Address Module)
 */
export class AddressController {
  /**
   * GET /api/v1/addresses
   */
  async getAddresses(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // TODO: [Teammate - Address] Query addresses table for user addresses
      sendSuccess(res, 'Addresses retrieved.', []);
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /api/v1/addresses
   */
  async createAddress(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // TODO: [Teammate - Address] Insert new address into addresses table
      sendSuccess(res, 'Address saved successfully.', null, 201);
    } catch (error) {
      next(error);
    }
  }

  /**
   * PUT /api/v1/addresses/:id
   */
  async updateAddress(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // TODO: [Teammate - Address] Update address in addresses table by id
      sendSuccess(res, `Address ${req.params.id} updated successfully.`);
    } catch (error) {
      next(error);
    }
  }

  /**
   * DELETE /api/v1/addresses/:id
   */
  async deleteAddress(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // TODO: [Teammate - Address] Delete address from addresses table by id
      sendSuccess(res, `Address ${req.params.id} deleted successfully.`);
    } catch (error) {
      next(error);
    }
  }

  /**
   * PATCH /api/v1/addresses/:id/default
   */
  async setDefaultAddress(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // TODO: [Teammate - Address] Set isDefault = true for this address and false for other addresses of user
      sendSuccess(res, `Default address set to ${req.params.id}.`);
    } catch (error) {
      next(error);
    }
  }
}

export const addressController = new AddressController();
