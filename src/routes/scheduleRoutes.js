import express from 'express';
import {
  createScheduleWorkout,
  getScheduledWorkout,
} from '../controllers/scheduleController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();
router.use(authenticate);

router.post('/', createScheduleWorkout);
router.get('/', getScheduledWorkout);

export default router;
