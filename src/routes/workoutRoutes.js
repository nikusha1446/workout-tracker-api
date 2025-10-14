import express from 'express';
import {
  createWorkoutPlan,
  deleteWorkoutPlan,
  getWorkoutPlanbyId,
  getWorkoutPlans,
  updateWorkoutPlan,
} from '../controllers/workoutController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();
router.use(authenticate);

router.post('/', createWorkoutPlan);
router.get('/', getWorkoutPlans);
router.get('/:id', getWorkoutPlanbyId);
router.put('/:id', updateWorkoutPlan);
router.delete('/:id', deleteWorkoutPlan);

export default router;
