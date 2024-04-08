import { z } from 'zod'

export const formGeneralSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: 'You must enter a name' })
    .max(255, { message: 'Name must be shorter than 255 characters' }),
  username: z
    .string()
    .trim()
    .min(3, { message: 'Name must be longer than 3 characters' })
    .max(255, { message: 'Name must be shorter than 255 characters' }),
})
