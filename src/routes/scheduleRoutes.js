import express from 'express';
import { createScheduleWorkout } from '../controllers/scheduleController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();
router.use(authenticate);

router.post('/', createScheduleWorkout);

export default router;
