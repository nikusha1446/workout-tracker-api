import prisma from '../config/prisma.js';

export const getWorkoutSummary = async (req, res) => {
  try {
    const userId = req.user.id;
    const { startDate, endDate } = req.query;

    const dateFilter = {};

    if (startDate || endDate) {
      dateFilter.completedAt = {};

      if (startDate) {
        dateFilter.completedAt.gte = new Date(startDate);
      }

      if (endDate) {
        dateFilter.completedAt.lte = new Date(endDate);
      }
    }

    const workoutLogs = await prisma.workoutLog.findMany({
      where: {
        userId,
        ...dateFilter,
      },
      include: {
        exerciseLogs: {
          include: {
            exercise: {
              select: {
                muscleGroup: true,
                category: true,
              },
            },
          },
        },
      },
    });

    const totalWorkouts = workoutLogs.length;
    const totalDuration = workoutLogs.reduce(
      (sum, log) => sum + (log.duration || 0),
      0
    );
    const averageDuration =
      totalWorkouts > 0 ? Math.round(totalDuration / totalWorkouts) : 0;

    const muscleGroupCount = {};
    workoutLogs.forEach((log) => {
      log.exerciseLogs.forEach((exLog) => {
        const muscleGroup = exLog.exercise.muscleGroup;

        if (muscleGroupCount[muscleGroup]) {
          muscleGroupCount[muscleGroup] = muscleGroupCount[muscleGroup] + 1;
        } else {
          muscleGroupCount[muscleGroup] = 1;
        }
      });
    });

    const categoryCount = {};
    workoutLogs.forEach((log) => {
      log.exerciseLogs.forEach((exLog) => {
        const category = exLog.exercise.category;

        if (categoryCount[category]) {
          categoryCount[category] = categoryCount[category] + 1;
        } else {
          categoryCount[category] = 1;
        }
      });
    });

    res.status(200).json({
      success: true,
      data: {
        summary: {
          totalWorkouts,
          totalDuration,
          averageDuration,
          muscleGroupDistribution: muscleGroupCount,
          categoryDistribution: categoryCount,
        },
      },
    });
  } catch (error) {
    console.error('Get workout summary error:', error);

    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};
