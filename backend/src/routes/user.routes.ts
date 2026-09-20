import { Router } from 'express';
import { userController } from '../controllers/user.controller.js';
import { requireAuth } from '../middlewares/auth.middleware.js';

const router = Router();

/**
 * [ROUTE] /api/v1/users
 * Devotee profile and address management routes (Teammate Skeleton)
 */
router.use(requireAuth);

router.get('/profile', userController.getProfile);
router.put('/profile', userController.updateProfile);
router.post('/change-password', userController.changePassword);
router.get('/addresses', userController.getAddresses);
router.post('/addresses', userController.addAddress);
router.delete('/addresses/:id', userController.deleteAddress);

export const userRoutes = router;
