import { z } from 'zod'

// const MAX_FILE_SIZE = 2 * 1024 * 1024;// 2MB in bytes
// const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const formGeneralSchema = z.object({
  // profileImage: z
  //   .any()
  //   .refine((files) => files?.length == 1, 'Image is required.')
  //   .refine(
  //     (files) => files?.[0]?.size <= MAX_FILE_SIZE,
  //     `Max file size is 2MB.`,
  //   )
  //   .refine(
  //     (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
  //     '.jpg, .jpeg, .png and .webp files are accepted.',
  //   ),
  name: z
    .string()
    .trim()
    .min(1, { message: 'You must enter a name' })
    .max(255, { message: 'Name must be shorter than 255 characters' }),
  username: z
    .string()
    .trim()
    .min(3, { message: 'Name must be longer than 3 characters' })
    .max(255, { message: 'Name must be shorter than 255 characters' })
    .regex(/^[a-zA-Z0-9]*$/, 'Username can only contain letters and numbers'),
  brandDescription: z
    .string()
    .trim()
    .min(5, { message: 'Name must be longer than 5 characters' })
    .max(255, { message: 'Name must be shorter than 255 characters' }),
  link: z
    .string()
    .trim()
    .max(255, { message: 'Name must be shorter than 255 characters' })
    .optional(),
  brand: z
    .string()
    .trim()
    .min(1, { message: 'You must enter a brand name' })
    .max(255, { message: 'Brand must be shorter than 255 characters' }),
})
