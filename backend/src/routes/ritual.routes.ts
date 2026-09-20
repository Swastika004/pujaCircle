import { Router, Request, Response, NextFunction } from 'express';
import { sendSuccess } from '../views/response.view.js';

const router = Router();

/**
 * [ROUTE] /api/v1/rituals
 * Retrieves ceremonial rituals (Teammate Skeleton).
 */
router.get('/', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    // TODO: [Teammate - Rituals] Fetch sacred rituals from database catalog
    sendSuccess(res, 'Sacred rituals retrieved.', []);
  } catch (error) {
    next(error);
  }
});

export const ritualRoutes = router;
