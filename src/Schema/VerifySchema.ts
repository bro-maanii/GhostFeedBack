import {z} from 'zod';

export const VerifySchema = z.object({
    token: z
            .string()
            .min(6, 'Token must be at least 1 character long')
            .max(6, 'Token must be at most 6 characters long')
            .regex(/^[0-9]+$/, 'Token must only contain numbers'),
});