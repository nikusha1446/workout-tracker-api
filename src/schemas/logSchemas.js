import { z } from 'zod';

const exerciseLogSchema = z.object({
  exerciseId: z.uuid('Invalid exercise ID'),
  sets: z.number().int().positive('Sets must be a positive number'),
  reps: z
    .number()
    .int()
    .positive('Reps must be a positive number')
    .optional()
    .nullable(),
  weight: z
    .number()
    .positive('Weight must be a positive number')
    .optional()
    .nullable(),
  duration: z
    .number()
    .int()
    .positive('Duration must be a positive number')
    .optional()
    .nullable(),
  notes: z
    .string()
    .max(500, 'Notes must not exceed 500 characters')
    .optional()
    .nullable(),
});

export const createWorkoutLogSchema = z
  .object({
    scheduledWorkoutId: z
      .uuid('Invalid scheduled workout ID')
      .optional()
      .nullable(),
    workoutPlanId: z.uuid('Invalid workout plan ID').optional().nullable(),
    completedAt: z.iso.datetime('Invalid date format. Use ISO 8601 format'),
    duration: z
      .number()
      .int()
      .positive('Duration must be a positive number')
      .optional()
      .nullable(),
    notes: z
      .string()
      .max(1000, 'Notes must not exceed 1000 characters')
      .optional()
      .nullable(),
    exercises: z
      .array(exerciseLogSchema)
      .min(1, 'At least one exercise is required')
      .max(30, 'Maximum 30 exercises per workout log'),
  })
  .refine((data) => data.scheduledWorkoutId || data.workoutPlanId, {
    message: 'Either scheduledWorkoutId or workoutPlanId must be provided',
    path: ['scheduledWorkoutId'],
  });
