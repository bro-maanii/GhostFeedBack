import {z} from 'zod';

export const UsernameValidation = z
    .string()
    .min(3, 'Username must be at least 3 characters long')
    .max(20, 'Username must be at most 20 characters long')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username must only contain alphanumeric characters and underscores');


export const PasswordValidation = z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .max(20, 'Password must be at most 50 characters long')
    .regex(/^[a-zA-Z0-9_]+$/, 'Password must only contain alphanumeric characters and underscores');

export const SignupSchema = z.object({
    username: UsernameValidation,
    email: z.string().email('Invalid email address'),
    password: PasswordValidation,
});