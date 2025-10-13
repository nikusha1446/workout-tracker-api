import express from 'express';
import { createWorkoutPlan } from '../controllers/workoutController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authenticate, createWorkoutPlan);

export default router;
