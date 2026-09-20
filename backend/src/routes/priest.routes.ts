import { Router } from 'express';
import { priestController } from '../controllers/priest.controller.js';
import { requireAuth } from '../middlewares/auth.middleware.js';
import { requireRole } from '../middlewares/role.middleware.js';

const router = Router();

/**
 * [ROUTE] /api/v1/priests
 * Priest directory, profile customization, and service pricing (Teammate Skeleton)
 */

// Public priest listings for devotees
router.get('/', priestController.searchPriests);
router.get('/:id', priestController.getPriestById);

// Protected priest self-management
router.get('/me/profile', requireAuth, requireRole('PRIEST'), priestController.getMyProfile);
router.put('/me/profile', requireAuth, requireRole('PRIEST'), priestController.updateMyProfile);
router.get('/me/services', requireAuth, requireRole('PRIEST'), priestController.getMyServices);
router.post('/me/services', requireAuth, requireRole('PRIEST'), priestController.addService);
router.delete('/me/services/:serviceId', requireAuth, requireRole('PRIEST'), priestController.deleteService);

// Priest specific endpoints by ID
router.put('/:id', requireAuth, priestController.updatePriestProfile);
router.get('/:id/services', priestController.getPriestServices);
router.post('/:id/services', requireAuth, priestController.createPriestService);
router.put('/:id/services/:serviceId', requireAuth, priestController.updatePriestService);
router.delete('/:id/services/:serviceId', requireAuth, priestController.deletePriestService);
router.patch('/:id/services/:serviceId/toggle', requireAuth, priestController.togglePriestService);

// Availability Slots
router.get('/:id/slots', priestController.getPriestSlots);
router.get('/:id/slots/available', priestController.getPriestSlots);
router.post('/:id/slots', requireAuth, priestController.createPriestSlot);
router.put('/:id/slots/:slotId', requireAuth, priestController.updatePriestSlot);
router.delete('/:id/slots/:slotId', requireAuth, priestController.deletePriestSlot);

export const priestRoutes = router;
