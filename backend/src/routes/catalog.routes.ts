import { Router } from 'express';
import { catalogController } from '../controllers/catalog.controller.js';

const router = Router();

/**
 * [ROUTE] /api/v1/catalog
 * Public sacred puja catalog exploration and management.
 */
router.get('/', catalogController.getCatalog);
router.get('/:id', catalogController.getCatalogById);
router.post('/', catalogController.createCatalogEntry);
router.put('/:id', catalogController.updateCatalogEntry);
router.delete('/:id', catalogController.deleteCatalogEntry);

export const catalogRoutes = router;
