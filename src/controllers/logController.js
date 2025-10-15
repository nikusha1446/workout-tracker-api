import { ZodError } from 'zod';
import prisma from '../config/prisma.js';
import { createWorkoutLogSchema } from '../schemas/logSchemas.js';

export const createWorkoutLog = async (req, res) => {
  try {
    const userId = req.user.id;
    const validatedData = createWorkoutLogSchema.parse(req.body);
    const {
      scheduledWorkoutId,
      workoutPlanId,
      completedAt,
      duration,
      notes,
      exercises,
    } = validatedData;

    if (scheduledWorkoutId) {
      const scheduledWorkout = await prisma.scheduledWorkout.findFirst({
        where: {
          id: scheduledWorkoutId,
          userId,
        },
      });

      if (!scheduledWorkout) {
        return res.status(404).json({
          success: false,
          message: 'Scheduled workout not found',
        });
      }
    }

    if (workoutPlanId) {
      const workoutPlan = await prisma.workoutPlan.findFirst({
        where: {
          id: workoutPlanId,
          userId,
        },
      });

      if (!workoutPlan) {
        return res.status(404).json({
          success: false,
          message: 'Workout plan not found',
        });
      }
    }

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

    const workoutLog = await prisma.workoutLog.create({
      data: {
        userId,
        scheduledWorkoutId,
        workoutPlanId,
        completedAt: new Date(completedAt),
        duration,
        notes,
        exerciseLogs: {
          create: exercises.map((ex) => ({
            exerciseId: ex.exerciseId,
            sets: ex.sets,
            reps: ex.reps,
            weight: ex.weight,
            duration: ex.duration,
            notes: ex.notes,
          })),
        },
      },
      include: {
        scheduledWorkout: {
          select: {
            id: true,
            scheduledDate: true,
            scheduledTime: true,
          },
        },
        workoutPlan: {
          select: {
            id: true,
            name: true,
            description: true,
          },
        },
        exerciseLogs: {
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
        },
      },
    });

    if (scheduledWorkoutId) {
      await prisma.scheduledWorkout.update({
        where: {
          id: scheduledWorkoutId,
        },
        data: {
          status: 'COMPLETED',
        },
      });
    }

    res.status(201).json({
      success: true,
      message: 'Workout log created successfully',
      data: {
        workoutLog,
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

    console.error('Create workout log error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};
