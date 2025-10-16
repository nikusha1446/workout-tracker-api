# Workout Tracker API

A comprehensive RESTful API for tracking workouts, managing workout plans, scheduling exercises, and monitoring fitness progress. Built with Node.js, Express, PostgreSQL, and Prisma ORM.

## ✨ Features

- **User Authentication** - JWT-based authentication with secure password hashing
- **Workout Plans** - Create, read, update, and delete custom workout plans
- **Workout Scheduling** - Schedule workouts for specific dates and times
- **Workout Logging** - Log completed workouts with actual performance data
- **Progress Reports** - Track workout statistics
- **Exercise Library** - Pre-seeded database with 65 exercises

## 🛠️ Tech Stack

- **Runtime:** Node.js (v18+)
- **Framework:** Express.js
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** JWT (jsonwebtoken + bcryptjs)
- **Validation:** Zod
- **API Design:** RESTful with ES Modules

## 🚀 Getting Started

### 📋 Prerequisites

- Node.js (v18.11.0+)
- PostgreSQL (v13+)
- npm or yarn

### 📦 Installation

**1. Clone the repository**
```bash
git clone https://github.com/nikusha1446/workout-tracker-api.git
cd workout-tracker-api
```

**2. Install dependencies**
```bash
npm install
```

**3. Set up environment variables**

Create a `.env` file in the root directory:
```env
# Server Configuration
PORT=3000

# Database
DATABASE_URL="postgresql://username:password@localhost:5432/workout_tracker?schema=public"

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d
```

**4. Run database migrations**
```bash
npm run prisma:migrate
```

**5. Seed the database with exercises**
```bash
npm run prisma:seed
```

**6. Start the development server**
```bash
npm run dev
```

The API will be running at `http://localhost:3000`

## 📜 Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server with auto-reload
- `npm run prisma:generate` - Generate Prisma Client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio (database GUI)
- `npm run prisma:seed` - Seed the database with exercise data

## 🌐 API Endpoints

### 🔐 Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/v1/auth/signup` | Create a new user account | No |
| POST | `/api/v1/auth/login` | Login and receive JWT token | No |

### 💪 Workout Plans

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/v1/workouts` | Create a new workout plan | Yes |
| GET | `/api/v1/workouts` | Get all workout plans | Yes |
| GET | `/api/v1/workouts/:id` | Get a specific workout plan | Yes |
| PUT | `/api/v1/workouts/:id` | Update a workout plan | Yes |
| DELETE | `/api/v1/workouts/:id` | Delete a workout plan | Yes |

### 📅 Scheduled Workouts

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/v1/schedules` | Schedule a workout | Yes |
| GET | `/api/v1/schedules` | Get all scheduled workouts | Yes |
| GET | `/api/v1/schedules/:id` | Get a specific scheduled workout | Yes |
| PUT | `/api/v1/schedules/:id` | Update a scheduled workout | Yes |
| DELETE | `/api/v1/schedules/:id` | Delete a scheduled workout | Yes |

**Query Parameters for GET `/api/v1/schedules`:**
- `status` - Filter by status (PENDING, COMPLETED, SKIPPED, CANCELLED)
- `startDate` - Filter by start date (ISO 8601 format)
- `endDate` - Filter by end date (ISO 8601 format)

### 📊 Workout Logs

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/v1/logs` | Log a completed workout | Yes |
| GET | `/api/v1/logs` | Get all workout logs | Yes |
| GET | `/api/v1/logs/:id` | Get a specific workout log | Yes |
| PUT | `/api/v1/logs/:id` | Update a workout log | Yes |
| DELETE | `/api/v1/logs/:id` | Delete a workout log | Yes |

**Query Parameters for GET `/api/v1/logs`:**
- `workoutPlanId` - Filter by workout plan
- `startDate` - Filter by start date (ISO 8601 format)
- `endDate` - Filter by end date (ISO 8601 format)

### 📈 Reports

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/v1/reports/summary` | Get workout summary statistics | Yes |

**Query Parameters for GET `/api/v1/reports/summary`:**
- `startDate` - Start date for report (ISO 8601 format)
- `endDate` - End date for report (ISO 8601 format)

## 📝 Example Requests

### Sign Up
```bash
curl -X POST http://localhost:3000/api/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

### Create Workout Plan
```bash
curl -X POST http://localhost:3000/api/v1/workouts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name": "Push Day",
    "description": "Chest, shoulders, and triceps workout",
    "exercises": [
      {
        "exerciseId": "EXERCISE_UUID",
        "sets": 4,
        "reps": 8,
        "weight": 225,
        "order": 1,
        "notes": "Focus on form"
      }
    ]
  }'
```

### Schedule Workout
```bash
curl -X POST http://localhost:3000/api/v1/schedules \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "workoutPlanId": "WORKOUT_PLAN_UUID",
    "scheduledDate": "2025-10-20T09:00:00Z",
    "scheduledTime": "09:00"
  }'
```

### Log Completed Workout
```bash
curl -X POST http://localhost:3000/api/v1/logs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "scheduledWorkoutId": "SCHEDULED_WORKOUT_UUID",
    "workoutPlanId": "WORKOUT_PLAN_UUID",
    "completedAt": "2025-10-20T10:30:00Z",
    "duration": 3600,
    "notes": "Great workout!",
    "exercises": [
      {
        "exerciseId": "EXERCISE_UUID",
        "sets": 4,
        "reps": 8,
        "weight": 225,
        "notes": "Felt strong today"
      }
    ]
  }'
```

### Get Workout Summary
```bash
curl -X GET "http://localhost:3000/api/v1/reports/summary?startDate=2025-10-01T00:00:00Z&endDate=2025-10-31T23:59:59Z" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 🗄️ Database Schema

### Core Models

- **User** - User accounts with authentication
- **Exercise** - Master library of exercises (seeded)
- **WorkoutPlan** - User's custom workout templates
- **WorkoutPlanExercise** - Exercises within a workout plan
- **ScheduledWorkout** - Scheduled instances of workout plans
- **WorkoutLog** - Completed workout records
- **ExerciseLog** - Individual exercise performance within a workout

### Enums

- **ExerciseCategory** - CARDIO, STRENGTH, FLEXIBILITY, BALANCE, SPORTS
- **MuscleGroup** - CHEST, BACK, LEGS, ARMS, SHOULDERS, CORE, FULL_BODY, CARDIO
- **WorkoutStatus** - PENDING, COMPLETED, SKIPPED, CANCELLED

## 🔒 Security Features

- ✅ Password hashing with bcrypt (10 salt rounds)
- ✅ JWT-based authentication
- ✅ Protected routes with middleware
- ✅ User data isolation (users can only access their own data)
- ✅ Input validation with Zod schemas
- ✅ CORS enabled
- ✅ Environment variables for sensitive data

## 📄 License

ISC
