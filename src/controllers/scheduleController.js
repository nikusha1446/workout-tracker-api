import { ZodError } from 'zod';
import prisma from '../config/prisma.js';
import { createScheduleWorkoutSchema } from '../schemas/scheduleSchemas.js';

export const createScheduleWorkout = async (req, res) => {
  try {
    const userId = req.user.id;
    const validatedData = createScheduleWorkoutSchema.parse(req.body);
    const { workoutPlanId, scheduledDate, scheduledTime } = validatedData;

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

    const scheduledWorkout = await prisma.scheduledWorkout.create({
      data: {
        userId,
        workoutPlanId,
        scheduledDate: new Date(scheduledDate),
        scheduledTime,
        status: 'PENDING',
      },
      include: {
        workoutPlan: {
          select: {
            id: true,
            name: true,
            description: true,
          },
        },
      },
    });

    res.status(201).json({
      success: true,
      message: 'Workout scheduled successfully',
      data: {
        scheduledWorkout,
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

    console.error('Create scheduled workout error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

export const getScheduledWorkouts = async (req, res) => {
  try {
    const userId = req.user.id;
    const { status, startDate, endDate } = req.query;

    const where = {
      userId,
    };

    if (status) {
      where.status = status;
    }

    if (startDate || endDate) {
      where.scheduledDate = {};

      if (startDate) {
        where.scheduledDate.gte = new Date(startDate);
      }
      if (endDate) {
        where.scheduledDate.lte = new Date(endDate);
      }
    }

    const scheduledWorkoutPlans = await prisma.scheduledWorkout.findMany({
      where,
      include: {
        workoutPlan: {
          select: {
            id: true,
            name: true,
            description: true,
          },
        },
      },
      orderBy: {
        scheduledDate: 'asc',
      },
    });

    res.status(200).json({
      success: true,
      data: {
        scheduledWorkoutPlans,
        count: scheduledWorkoutPlans.length,
      },
    });
  } catch (error) {
    console.error('Get scheduled workouts error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

export const getScheduledWorkoutById = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const scheduledWorkoutPlan = await prisma.scheduledWorkout.findFirst({
      where: {
        id,
        userId,
      },
      include: {
        workoutPlan: {
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
        },
      },
    });

    if (!scheduledWorkoutPlan) {
      return res.status(404).json({
        success: false,
        message: 'Scheduled workout not found',
      });
    }

    res.status(200).json({
      success: true,
      data: {
        scheduledWorkoutPlan,
      },
    });
  } catch (error) {
    console.error('Get scheduled workout by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};
