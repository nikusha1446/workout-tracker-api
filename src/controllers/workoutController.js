import { ZodError } from 'zod';
import {
  createWorkoutPlanSchema,
  updateWorkoutPlanSchema,
} from '../schemas/workoutSchemas.js';
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

export const getWorkoutPlans = async (req, res) => {
  try {
    const userId = req.user.id;

    const workoutPlans = await prisma.workoutPlan.findMany({
      where: {
        userId,
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
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.status(200).json({
      success: true,
      data: {
        workoutPlans,
        count: workoutPlans.length,
      },
    });
  } catch (error) {
    console.error('Get all workout plans error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

export const getWorkoutPlanbyId = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const workoutPlan = await prisma.workoutPlan.findUnique({
      where: {
        id,
        userId,
      },
      include: {
        workoutPlanExercises: {
          include: {
            exercise: {
              select: {
                id: true,
                name: true,
                description: true,
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

    if (!workoutPlan) {
      return res.status(404).json({
        success: false,
        message: 'Workout plan not found',
      });
    }

    res.status(200).json({
      success: true,
      data: {
        workoutPlan,
      },
    });
  } catch (error) {
    console.error('Get workout plan by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

export const updateWorkoutPlan = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const validatedData = updateWorkoutPlanSchema.parse(req.body);

    const existingWorkoutPlan = await prisma.workoutPlan.findFirst({
      where: {
        userId,
        id,
      },
    });

    if (!existingWorkoutPlan) {
      return res.status(404).json({
        success: false,
        message: 'Workout plan not found',
      });
    }

    if (validatedData.exercises) {
      const exerciseIds = validatedData.exercises.map((ex) => ex.exerciseId);

      const existingExercises = await prisma.exercise.findMany({
        where: {
          id: {
            in: exerciseIds,
          },
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
    }

    const updateData = {};

    if (validatedData.name !== undefined) updateData.name = validatedData.name;
    if (validatedData.description !== undefined)
      updateData.description = validatedData.description;

    if (validatedData.exercises) {
      await prisma.workoutPlanExercise.deleteMany({
        where: {
          workoutPlanId: id,
        },
      });

      updateData.workoutPlanExercises = {
        create: validatedData.exercises.map((ex) => ({
          exerciseId: ex.exerciseId,
          sets: ex.sets,
          reps: ex.reps,
          weight: ex.weight,
          duration: ex.duration,
          order: ex.order,
          notes: ex.notes,
        })),
      };
    }

    const updatedWorkoutPlan = await prisma.workoutPlan.update({
      where: {
        id,
      },
      data: updateData,
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

    res.status(200).json({
      success: true,
      message: 'Workout plan updated successfully',
      data: {
        workoutPlan: updatedWorkoutPlan,
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

    console.error('Update workout plan error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};
