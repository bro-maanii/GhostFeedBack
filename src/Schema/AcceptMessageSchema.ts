import {z} from 'zod';

export const AcceptMessageSchema = z.object({
    accept: z.boolean(),
});