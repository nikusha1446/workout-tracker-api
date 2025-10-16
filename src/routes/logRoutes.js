import express from 'express';
import {
  createWorkoutLog,
  getWorkoutLogs,
} from '../controllers/logController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();
router.use(authenticate);

router.post('/', createWorkoutLog);
router.get('/', getWorkoutLogs);

export default router;
