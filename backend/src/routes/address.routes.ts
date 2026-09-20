import { Router } from 'express';
import { addressController } from '../controllers/address.controller.js';
import { requireAuth } from '../middlewares/auth.middleware.js';

const router = Router();

/**
 * [ROUTE] /api/v1/addresses
 * Devotee addresses for ceremonial ceremonies.
 */
router.get('/', addressController.getAddresses);
router.post('/', requireAuth, addressController.createAddress);
router.put('/:id', requireAuth, addressController.updateAddress);
router.delete('/:id', requireAuth, addressController.deleteAddress);
router.patch('/:id/default', requireAuth, addressController.setDefaultAddress);

export const addressRoutes = router;
