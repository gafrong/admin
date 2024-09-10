import { clsx } from 'clsx'
import { format } from 'date-fns'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function ifDate(date, msg = '') {
  return date ? format(new Date(date), 'dd.MM.yyyy') : msg
}
export const getInitials = (name) =>
  name
    ? name
        .split(' ')
        .map((n) => n[0])
        .join('')
    : ''
