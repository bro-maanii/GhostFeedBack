import {z} from 'zod';

export const MessageValidation = z
    .string()
    .min(1, 'Message must be at least 1 character long')
    .max(500, 'Message must be at most 500 characters long');

export const MessagesSchema = z.object({
    message: MessageValidation,
});