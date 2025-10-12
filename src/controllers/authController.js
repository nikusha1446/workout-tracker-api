import { ZodError } from 'zod';
import prisma from '../config/prisma.js';
import { signupSchema } from '../schemas/authSchemas.js';
import { hashPassword } from '../utils/password.js';

export const signup = async (req, res) => {
  try {
    const validatedData = signupSchema.parse(req.body);
    const { email, name, password } = validatedData;

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'User with this email already exists',
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user,
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

    console.error('Signup error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};
