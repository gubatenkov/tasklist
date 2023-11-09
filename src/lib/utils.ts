import type { TaskPriority } from '@/lib/types.ts'

import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const priorities: Record<
  Lowercase<TaskPriority['value']>,
  TaskPriority
> = {
  '1': {
    label: 'Middle',
    value: '1',
  },
  '2': {
    label: 'High',
    value: '2',
  },
  '0': {
    label: 'Low',
    value: '0',
  },
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
