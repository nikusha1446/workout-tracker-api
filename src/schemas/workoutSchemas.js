import { z } from 'zod';

export const workoutPlanExerciseSchema = z.object({
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
  order: z.number().int().min(1, 'Order must be at least 1'),
  notes: z
    .string()
    .max(500, 'Notes must not exceed 500 characters')
    .optional()
    .nullable(),
});

export const createWorkoutPlanSchema = z
  .object({
    name: z
      .string({
        required_error: 'Workout plan name is required',
      })
      .min(3, 'Name must be at least 3 characters long')
      .max(100, 'Name must not exceed 100 characters')
      .trim(),

    description: z
      .string()
      .max(500, 'Description must not exceed 500 characters')
      .trim()
      .optional()
      .nullable(),

    exercises: z
      .array(workoutPlanExerciseSchema)
      .min(1, 'At least one exercise is required')
      .max(20, 'Maximum 20 exercises per workout plan'),
  })
  .refine(
    (data) => {
      const orders = data.exercises.map((ex) => ex.order);
      const uniqueOrders = new Set(orders);
      return orders.length === uniqueOrders.size;
    },
    {
      message: 'Each exercise must have a unique order number',
      path: ['exercises'],
    }
  );
