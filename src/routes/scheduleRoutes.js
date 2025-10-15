import express from 'express';
import {
  createScheduleWorkout,
  getScheduledWorkoutById,
  getScheduledWorkouts,
} from '../controllers/scheduleController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();
router.use(authenticate);

router.post('/', createScheduleWorkout);
router.get('/', getScheduledWorkouts);
router.get('/:id', getScheduledWorkoutById);

export default router;
