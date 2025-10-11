import prisma from '../src/config/prisma.js';

const exercises = [
  // CHEST - STRENGTH
  {
    name: 'Barbell Bench Press',
    description:
      'Compound exercise targeting the chest, shoulders, and triceps. Lie on a bench and press the barbell up from chest level.',
    category: 'STRENGTH',
    muscleGroup: 'CHEST',
  },
  {
    name: 'Dumbbell Bench Press',
    description:
      'Similar to barbell bench press but allows for greater range of motion and independent arm movement.',
    category: 'STRENGTH',
    muscleGroup: 'CHEST',
  },
  {
    name: 'Incline Bench Press',
    description:
      'Bench press performed on an inclined bench to target the upper chest.',
    category: 'STRENGTH',
    muscleGroup: 'CHEST',
  },
  {
    name: 'Decline Bench Press',
    description:
      'Bench press performed on a declined bench to target the lower chest.',
    category: 'STRENGTH',
    muscleGroup: 'CHEST',
  },
  {
    name: 'Push-Ups',
    description:
      'Bodyweight exercise that targets chest, shoulders, and triceps. Great for beginners and can be modified for difficulty.',
    category: 'STRENGTH',
    muscleGroup: 'CHEST',
  },
  {
    name: 'Dumbbell Fly',
    description:
      'Isolation exercise for chest. Lie on bench with dumbbells extended, lower arms in arc motion.',
    category: 'STRENGTH',
    muscleGroup: 'CHEST',
  },
  {
    name: 'Cable Crossover',
    description:
      'Cable exercise targeting inner and outer chest through crossover motion.',
    category: 'STRENGTH',
    muscleGroup: 'CHEST',
  },

  // BACK - STRENGTH
  {
    name: 'Deadlift',
    description:
      'Compound exercise targeting back, glutes, and hamstrings. Lift barbell from ground to hip level.',
    category: 'STRENGTH',
    muscleGroup: 'BACK',
  },
  {
    name: 'Barbell Row',
    description: 'Bent-over row targeting mid-back, lats, and rear delts.',
    category: 'STRENGTH',
    muscleGroup: 'BACK',
  },
  {
    name: 'Pull-Ups',
    description:
      'Bodyweight exercise pulling body up to bar. Targets lats, biceps, and upper back.',
    category: 'STRENGTH',
    muscleGroup: 'BACK',
  },
  {
    name: 'Chin-Ups',
    description:
      'Similar to pull-ups but with underhand grip, emphasizing biceps more.',
    category: 'STRENGTH',
    muscleGroup: 'BACK',
  },
  {
    name: 'Lat Pulldown',
    description:
      'Machine exercise simulating pull-up motion, great for building lat width.',
    category: 'STRENGTH',
    muscleGroup: 'BACK',
  },
  {
    name: 'Seated Cable Row',
    description: 'Cable row targeting mid-back thickness and lats.',
    category: 'STRENGTH',
    muscleGroup: 'BACK',
  },
  {
    name: 'T-Bar Row',
    description:
      'Row variation using T-bar attachment, excellent for back thickness.',
    category: 'STRENGTH',
    muscleGroup: 'BACK',
  },
  {
    name: 'Single-Arm Dumbbell Row',
    description:
      'Unilateral rowing exercise allowing focus on each side independently.',
    category: 'STRENGTH',
    muscleGroup: 'BACK',
  },

  // LEGS - STRENGTH
  {
    name: 'Barbell Squat',
    description:
      'Compound leg exercise. Squat down with barbell on shoulders, engaging quads, glutes, and hamstrings.',
    category: 'STRENGTH',
    muscleGroup: 'LEGS',
  },
  {
    name: 'Front Squat',
    description:
      'Squat variation with barbell held in front, emphasizing quads and core.',
    category: 'STRENGTH',
    muscleGroup: 'LEGS',
  },
  {
    name: 'Romanian Deadlift',
    description:
      'Deadlift variation targeting hamstrings and glutes with slight knee bend.',
    category: 'STRENGTH',
    muscleGroup: 'LEGS',
  },
  {
    name: 'Leg Press',
    description:
      'Machine exercise targeting quads, glutes, and hamstrings with heavy loads.',
    category: 'STRENGTH',
    muscleGroup: 'LEGS',
  },
  {
    name: 'Lunges',
    description: 'Single-leg exercise targeting quads, glutes, and balance.',
    category: 'STRENGTH',
    muscleGroup: 'LEGS',
  },
  {
    name: 'Bulgarian Split Squat',
    description: 'Advanced single-leg squat with rear foot elevated.',
    category: 'STRENGTH',
    muscleGroup: 'LEGS',
  },
  {
    name: 'Leg Extension',
    description: 'Isolation exercise for quadriceps using machine.',
    category: 'STRENGTH',
    muscleGroup: 'LEGS',
  },
  {
    name: 'Leg Curl',
    description: 'Isolation exercise for hamstrings using machine.',
    category: 'STRENGTH',
    muscleGroup: 'LEGS',
  },
  {
    name: 'Calf Raise',
    description: 'Standing or seated exercise targeting calf muscles.',
    category: 'STRENGTH',
    muscleGroup: 'LEGS',
  },

  // SHOULDERS - STRENGTH
  {
    name: 'Overhead Press',
    description:
      'Compound shoulder exercise pressing barbell overhead from shoulder level.',
    category: 'STRENGTH',
    muscleGroup: 'SHOULDERS',
  },
  {
    name: 'Dumbbell Shoulder Press',
    description: 'Pressing dumbbells overhead, allowing natural arm path.',
    category: 'STRENGTH',
    muscleGroup: 'SHOULDERS',
  },
  {
    name: 'Lateral Raise',
    description:
      'Isolation exercise for side delts, raising dumbbells to sides.',
    category: 'STRENGTH',
    muscleGroup: 'SHOULDERS',
  },
  {
    name: 'Front Raise',
    description: 'Isolation exercise for front delts, raising weight to front.',
    category: 'STRENGTH',
    muscleGroup: 'SHOULDERS',
  },
  {
    name: 'Rear Delt Fly',
    description: 'Isolation exercise targeting rear deltoids.',
    category: 'STRENGTH',
    muscleGroup: 'SHOULDERS',
  },
  {
    name: 'Arnold Press',
    description:
      'Dumbbell press with rotation, targeting all three deltoid heads.',
    category: 'STRENGTH',
    muscleGroup: 'SHOULDERS',
  },
  {
    name: 'Upright Row',
    description:
      'Row pulling barbell/dumbbells up to chin, targeting delts and traps.',
    category: 'STRENGTH',
    muscleGroup: 'SHOULDERS',
  },

  // ARMS - STRENGTH
  {
    name: 'Barbell Curl',
    description:
      'Classic bicep exercise curling barbell from thigh to shoulder.',
    category: 'STRENGTH',
    muscleGroup: 'ARMS',
  },
  {
    name: 'Dumbbell Curl',
    description:
      'Bicep curl with dumbbells, allowing supination and independent arm movement.',
    category: 'STRENGTH',
    muscleGroup: 'ARMS',
  },
  {
    name: 'Hammer Curl',
    description: 'Neutral grip curl targeting biceps and brachialis.',
    category: 'STRENGTH',
    muscleGroup: 'ARMS',
  },
  {
    name: 'Preacher Curl',
    description: 'Isolated bicep curl on preacher bench preventing momentum.',
    category: 'STRENGTH',
    muscleGroup: 'ARMS',
  },
  {
    name: 'Tricep Dips',
    description:
      'Bodyweight exercise targeting triceps using parallel bars or bench.',
    category: 'STRENGTH',
    muscleGroup: 'ARMS',
  },
  {
    name: 'Tricep Pushdown',
    description: 'Cable exercise for triceps pushing rope or bar down.',
    category: 'STRENGTH',
    muscleGroup: 'ARMS',
  },
  {
    name: 'Overhead Tricep Extension',
    description: 'Tricep isolation exercise with weight extended overhead.',
    category: 'STRENGTH',
    muscleGroup: 'ARMS',
  },
  {
    name: 'Close-Grip Bench Press',
    description: 'Bench press variation with narrow grip emphasizing triceps.',
    category: 'STRENGTH',
    muscleGroup: 'ARMS',
  },
  {
    name: 'Skull Crushers',
    description: 'Lying tricep extension lowering weight to forehead.',
    category: 'STRENGTH',
    muscleGroup: 'ARMS',
  },

  // CORE - STRENGTH
  {
    name: 'Plank',
    description: 'Isometric core exercise holding push-up position.',
    category: 'STRENGTH',
    muscleGroup: 'CORE',
  },
  {
    name: 'Crunches',
    description: 'Classic abdominal exercise curling torso up.',
    category: 'STRENGTH',
    muscleGroup: 'CORE',
  },
  {
    name: 'Russian Twists',
    description: 'Rotational core exercise twisting torso side to side.',
    category: 'STRENGTH',
    muscleGroup: 'CORE',
  },
  {
    name: 'Leg Raises',
    description: 'Lower ab exercise raising legs while lying or hanging.',
    category: 'STRENGTH',
    muscleGroup: 'CORE',
  },
  {
    name: 'Mountain Climbers',
    description:
      'Dynamic core exercise alternating knee drives in plank position.',
    category: 'STRENGTH',
    muscleGroup: 'CORE',
  },
  {
    name: 'Bicycle Crunches',
    description: 'Crunch variation with alternating elbow-to-knee movement.',
    category: 'STRENGTH',
    muscleGroup: 'CORE',
  },
  {
    name: 'Dead Bug',
    description:
      'Core stability exercise with alternating arm and leg extensions.',
    category: 'STRENGTH',
    muscleGroup: 'CORE',
  },
  {
    name: 'Ab Wheel Rollout',
    description: 'Advanced core exercise rolling ab wheel forward and back.',
    category: 'STRENGTH',
    muscleGroup: 'CORE',
  },

  // CARDIO
  {
    name: 'Running',
    description: 'Outdoor or treadmill running for cardiovascular endurance.',
    category: 'CARDIO',
    muscleGroup: 'CARDIO',
  },
  {
    name: 'Cycling',
    description: 'Stationary or outdoor cycling for cardio and leg endurance.',
    category: 'CARDIO',
    muscleGroup: 'CARDIO',
  },
  {
    name: 'Jump Rope',
    description: 'High-intensity cardio using jump rope.',
    category: 'CARDIO',
    muscleGroup: 'CARDIO',
  },
  {
    name: 'Rowing',
    description: 'Full-body cardio exercise using rowing machine.',
    category: 'CARDIO',
    muscleGroup: 'CARDIO',
  },
  {
    name: 'Swimming',
    description: 'Low-impact full-body cardio in water.',
    category: 'CARDIO',
    muscleGroup: 'CARDIO',
  },
  {
    name: 'Elliptical',
    description: 'Low-impact cardio machine simulating running motion.',
    category: 'CARDIO',
    muscleGroup: 'CARDIO',
  },
  {
    name: 'Stair Climber',
    description: 'Cardio machine simulating stair climbing.',
    category: 'CARDIO',
    muscleGroup: 'CARDIO',
  },
  {
    name: 'Burpees',
    description:
      'High-intensity full-body exercise combining squat, plank, and jump.',
    category: 'CARDIO',
    muscleGroup: 'FULL_BODY',
  },

  // FLEXIBILITY
  {
    name: 'Hamstring Stretch',
    description: 'Stretch targeting hamstring flexibility.',
    category: 'FLEXIBILITY',
    muscleGroup: 'LEGS',
  },
  {
    name: 'Quad Stretch',
    description: 'Standing or lying stretch for quadriceps.',
    category: 'FLEXIBILITY',
    muscleGroup: 'LEGS',
  },
  {
    name: 'Shoulder Stretch',
    description: 'Various stretches targeting shoulder flexibility.',
    category: 'FLEXIBILITY',
    muscleGroup: 'SHOULDERS',
  },
  {
    name: 'Chest Stretch',
    description: 'Stretch opening chest and shoulders.',
    category: 'FLEXIBILITY',
    muscleGroup: 'CHEST',
  },
  {
    name: 'Cat-Cow Stretch',
    description: 'Yoga-inspired spinal flexibility exercise.',
    category: 'FLEXIBILITY',
    muscleGroup: 'BACK',
  },
  {
    name: "Child's Pose",
    description: 'Relaxing stretch for back, shoulders, and hips.',
    category: 'FLEXIBILITY',
    muscleGroup: 'FULL_BODY',
  },

  // BALANCE
  {
    name: 'Single-Leg Stand',
    description: 'Balance exercise standing on one leg.',
    category: 'BALANCE',
    muscleGroup: 'LEGS',
  },
  {
    name: 'Bosu Ball Squats',
    description: 'Squats performed on unstable surface for balance.',
    category: 'BALANCE',
    muscleGroup: 'LEGS',
  },
  {
    name: 'Balance Board',
    description: 'Various exercises performed on balance board.',
    category: 'BALANCE',
    muscleGroup: 'FULL_BODY',
  },
];

async function main() {
  console.log('Starting seed...');

  await prisma.exercise.deleteMany({});

  console.log('Seeding exercises...');
  for (const exercise of exercises) {
    await prisma.exercise.create({
      data: exercise,
    });
  }

  console.log(`Successfully seeded ${exercises.length} exercises!`);
}

main()
  .catch((error) => {
    console.error('Error seeding database:');
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
