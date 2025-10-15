import { z } from 'zod';

export const createScheduleWorkoutSchema = z.object({
  workoutPlanId: z.uuid('Invalid workout plan ID'),
  scheduledDate: z.iso.datetime('Invalid date format. Use ISO 8601 format'),
  scheduledTime: z
    .string()
    .regex(
      /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
      'Invalid time format. Use HH:MM format (e.g., 09:30)'
    ),
});
