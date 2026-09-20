import { Request, Response, NextFunction } from 'express';
import { sendSuccess } from '../views/response.view.js';
import { catalogService } from '../services/catalog.service.js';

/**
 * [CONTROLLER] Catalog Controller (Teammate Skeleton)
 * 
 * Responsibility: Public sacred puja catalog queries and catalog administration.
 * Assigned to: Teammate (Catalog Module)
 */
export class CatalogController {
  // GET /api/v1/catalog
  async getCatalog(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // Query sacred ceremonies from puja_catalog
      const catalog = await catalogService.getCatalog();
      sendSuccess(res, 'Puja catalog retrieved successfully.', catalog);
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/v1/catalog/:id
   */
  async getCatalogById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // TODO: [Teammate - Catalog] Query single ceremony from puja_catalog table by id
      sendSuccess(res, `Catalog entry ${req.params.id} retrieved.`, null);
    } catch (error) {
      next(error);
    }
  }

  // POST /api/v1/catalog
  async createCatalogEntry(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // Create new sacred ceremony in catalog
      const entry = await catalogService.createCatalogEntry(req.body);
      sendSuccess(res, 'Ceremony catalog entry created successfully.', entry, 201);
    } catch (error) {
      next(error);
    }
  }

  /**
   * PUT /api/v1/catalog/:id
   */
  async updateCatalogEntry(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // TODO: [Teammate - Catalog] Update ceremony in puja_catalog table by id
      sendSuccess(res, `Ceremony catalog entry ${req.params.id} updated successfully.`);
    } catch (error) {
      next(error);
    }
  }

  /**
   * DELETE /api/v1/catalog/:id
   */
  async deleteCatalogEntry(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // TODO: [Teammate - Catalog] Delete or deactivate ceremony from puja_catalog table by id
      sendSuccess(res, `Ceremony ${req.params.id} removed from catalog.`);
    } catch (error) {
      next(error);
    }
  }
}

export const catalogController = new CatalogController();
