import { ZodError } from 'zod';
import { createWorkoutPlanSchema } from '../schemas/workoutSchemas.js';
import prisma from '../config/prisma.js';

export const createWorkoutPlan = async (req, res) => {
  try {
    const validatedData = createWorkoutPlanSchema.parse(req.body);
    const { name, description, exercises } = validatedData;
    const userId = req.user.id;

    const exerciseIds = exercises.map((ex) => ex.exerciseId);
    const existingExercises = await prisma.exercise.findMany({
      where: {
        id: {
          in: exerciseIds,
        },
      },
      select: {
        id: true,
      },
    });

    const existingExerciseIds = existingExercises.map((ex) => ex.id);
    const invalidExerciseIds = exerciseIds.filter(
      (id) => !existingExerciseIds.includes(id)
    );

    if (invalidExerciseIds.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid exercise IDs',
        errors: invalidExerciseIds.map((id) => ({
          field: 'exerciseId',
          message: `Exercise with ID ${id} does not exist`,
        })),
      });
    }

    const workoutPlan = await prisma.workoutPlan.create({
      data: {
        name,
        description,
        userId,
        workoutPlanExercises: {
          create: exercises.map((ex) => ({
            exerciseId: ex.exerciseId,
            sets: ex.sets,
            reps: ex.reps,
            weight: ex.weight,
            duration: ex.duration,
            order: ex.order,
            notes: ex.notes,
          })),
        },
      },
      include: {
        workoutPlanExercises: {
          include: {
            exercise: {
              select: {
                id: true,
                name: true,
                category: true,
                muscleGroup: true,
              },
            },
          },
          orderBy: {
            order: 'asc',
          },
        },
      },
    });

    res.status(201).json({
      success: true,
      message: 'Workout plan created successfully',
      data: {
        workoutPlan,
      },
    });
  } catch (error) {
    if (error instanceof ZodError) {
      const formattedErrors = error.issues.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      }));

      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: formattedErrors,
      });
    }

    console.error('Create workout plan error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};
