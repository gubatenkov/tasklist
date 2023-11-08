import type { TColumn, TTask } from '@/lib/types.ts'

export const basePath = 'https://65495184dd8ebcd4ab2479dc.mockapi.io/api'

export const getAllColumns = async (): Promise<TColumn[] | []> => {
  const res = await fetch(`${basePath}/columns`)
  if (res.ok) return await res.json()
  return []
}

export const getAllTasks = async (): Promise<TTask[] | []> => {
  const res = await fetch(`${basePath}/tasks`)
  if (res.ok) return await res.json()
  return []
}
