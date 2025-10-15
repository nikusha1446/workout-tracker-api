import express from 'express';
import {
  createScheduledWorkout,
  deleteScheduledWorkout,
  getScheduledWorkoutById,
  getScheduledWorkouts,
  updateScheduledWorkout,
} from '../controllers/scheduleController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();
router.use(authenticate);

router.post('/', createScheduledWorkout);
router.get('/', getScheduledWorkouts);
router.get('/:id', getScheduledWorkoutById);
router.put('/:id', updateScheduledWorkout);
router.delete('/:id', deleteScheduledWorkout);

export default router;
