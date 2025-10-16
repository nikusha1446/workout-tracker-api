import express from 'express';
import {
  createWorkoutLog,
  deleteWorkoutLog,
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
router.delete('/:id', deleteWorkoutLog);

export default router;
