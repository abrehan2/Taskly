// Imports:
import * as z from 'zod';

export const modalKeys = {
  TITLE: 'title',
  DESCRIPTION: 'description',
  PRIORITY: 'priority',
  STATUS: 'status',
};

export const modalSchema = z.object({
  [modalKeys.TITLE]: z.string().min(5, {
    message: 'Title must be at least 5 characters long',
  }),

  [modalKeys.DESCRIPTION]: z
    .string()
    .max(100, {
      message: 'Description must be at most 100 characters long',
    })
    .optional(),

  [modalKeys.PRIORITY]: z.string(),

  [modalKeys.STATUS]: z.string(),
});

export type TModalSchema = z.infer<typeof modalSchema>;
