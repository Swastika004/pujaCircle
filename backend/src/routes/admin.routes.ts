import { Router } from 'express';
import { adminController } from '../controllers/admin.controller.js';
import { requireAuth } from '../middlewares/auth.middleware.js';
import { requireAdmin } from '../middlewares/role.middleware.js';

const router = Router();

/**
 * [ROUTE] /api/v1/admin
 * Protected Admin Console Endpoints (ADMIN role required)
 */
router.use(requireAuth);
router.use(requireAdmin);

// Platform KPIs & Stats
router.get('/dashboard/stats', adminController.getDashboardStats);

// Priest Verification & Lifecycle Management
router.get('/priests', adminController.getAllPriests);
router.get('/priests/pending', adminController.getPendingPriests);
router.post('/priests/:id/approve', adminController.approvePriest);
router.post('/priests/:id/reject', adminController.rejectPriest);
router.post('/priests/:id/ban', adminController.banPriest);
router.post('/priests/:id/unban', adminController.unbanPriest);
router.post('/priests/:id/reopen', adminController.reopenPriestApplication);

// Devotee Moderation
router.get('/users', adminController.getAllUsers);
router.post('/users/:id/suspend', adminController.suspendUser);
router.post('/users/:id/unsuspend', adminController.unsuspendUser);

// Platform Bookings Oversight
router.get('/bookings', adminController.getAllBookings);

export const adminRoutes = router;
