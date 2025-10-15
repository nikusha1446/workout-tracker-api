import express from 'express';
import { createWorkoutLog } from '../controllers/logController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();
router.use(authenticate);

router.post('/', createWorkoutLog);

export default router;
