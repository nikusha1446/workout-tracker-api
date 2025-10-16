import express from 'express';
import {
  createWorkoutLog,
  getWorkoutLogById,
  getWorkoutLogs,
  updateWorkoutLog,
} from '../controllers/logController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();
router.use(authenticate);

router.post('/', createWorkoutLog);
router.get('/', getWorkoutLogs);
router.get('/:id', getWorkoutLogById);
router.put('/:id', updateWorkoutLog);

export default router;
