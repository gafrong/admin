import parsePhoneNumberFromString from 'libphonenumber-js'
import { z } from 'zod'

export const validationKoreanPhone = z.string().transform((arg, ctx) => {
  const phone = parsePhoneNumberFromString(arg, {
    // set this to use a default country when the phone number omits country code
    defaultCountry: 'KR', //ISO standard South Korea country code.

    // we don't need to extract phone number from inside the string
    extract: false,
  })

  if (!phone?.isValid()) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Invalid Korean phone number',
    })
    return z.NEVER
  }
  // return phone.formatInternational()
  return phone.number
})

//examples

const validationName = z.string().trim().min(1, { message: 'Name is required' })

const validationEmail = z
  .string({ required_error: 'Email is required' })
  .email('Please enter a valid email address')
