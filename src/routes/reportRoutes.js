import express from 'express';
import { getWorkoutSummary } from '../controllers/reportController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();
router.use(authenticate);

router.get('/summary', getWorkoutSummary);

export default router;
