import express from 'express';
import {
  createWorkoutPlan,
  getWorkoutPlanbyId,
  getWorkoutPlans,
} from '../controllers/workoutController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();
router.use(authenticate);

router.post('/', createWorkoutPlan);
router.get('/', getWorkoutPlans);
router.get('/:id', getWorkoutPlanbyId);

export default router;
