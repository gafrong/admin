import { z } from 'zod'

export const formStoreManagerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: 'Name must be longer than 3 characters' })
    .max(255, { message: 'Name must be shorter than 255 characters' }),
  username: z
    .string()
    .trim()
    .min(1, { message: 'Name must be longer than 3 characters' })
    .max(255, { message: 'Name must be shorter than 255 characters' }),
})
