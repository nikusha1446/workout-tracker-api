import { z } from 'zod';

export const signupSchema = z.object({
  email: z.email('Invalid email format').toLowerCase().trim(),

  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(6, 'Password must be at least 6 characters long')
    .max(100, 'Password must not exceed 100 characters'),

  name: z
    .string({
      required_error: 'Name is required',
    })
    .trim()
    .min(2, 'Name must be at least 2 characters long')
    .max(50, 'Name must not exceed 50 characters'),
});
