import { TColumn, TaskId, ColId, TTask } from '@/lib/types.ts'
import { basePath } from '@/lib/functions.ts'
import { queryClient } from '@/main.tsx'

type TVariables = {
  fromSourceIndex: number
  toTargetIndex: number
  sourceColId: ColId
  targetColId: ColId
  taskId: TaskId
}

export const updateRemoteColumn = async ({
  fromSourceIndex,
  toTargetIndex,
  sourceColId,
  targetColId, // taskId,
}: TVariables) => {
  // In case when task was dropped on its previous place
  if (sourceColId === targetColId && fromSourceIndex === toTargetIndex) return
  // Get snapshot of the cache
  const columns = structuredClone(
    queryClient.getQueryData<TColumn[]>(['columns'])
  )
  const sourceCol = columns?.find((col) => col.id === sourceColId)
  const targetCol = columns?.find((col) => col.id === targetColId)
  if (!sourceCol || !targetCol) return
  try {
    const result1 = await fetch(`${basePath}/columns/${sourceColId}`, {
      body: JSON.stringify({ tasks: sourceCol.tasks }),
      headers: { 'content-type': 'application/json' },
      method: 'PUT',
    })
    const result2 = await fetch(`${basePath}/columns/${targetColId}`, {
      body: JSON.stringify({ tasks: targetCol.tasks }),
      headers: { 'content-type': 'application/json' },
      method: 'PUT',
    })
    ;[result1, result2].forEach((result) =>
      console.log('Column update status:', result.status)
    )
  } catch (e) {
    // Handle errors (in this case just show in console)
    console.log('Column update error:', e)
  }
}

export const updateCachedColumn = async ({
  fromSourceIndex,
  toTargetIndex,
  sourceColId,
  targetColId,
  taskId,
}: TVariables) => {
  // In case when task was dropped on its previous place
  if (targetColId === sourceColId && fromSourceIndex === toTargetIndex) return
  // Cancel any outgoing refetches so they don't overwrite optimistic update
  await queryClient.cancelQueries({ queryKey: ['columns'] })
  // Get snapshot of the cache
  const prevColumns = queryClient.getQueryData<TColumn[]>(['columns'])
  // Optimistically update cache
  queryClient.setQueryData<TColumn[]>(['columns'], (prev) => {
    const emptyContext: [] = []
    const sourceCol = prev?.find((col) => col.id === sourceColId)
    const targetCol = prev?.find((col) => col.id === targetColId)
    if (!sourceCol || !targetCol) return emptyContext
    // Make updates
    sourceCol.tasks.splice(fromSourceIndex, 1)
    targetCol.tasks.splice(toTargetIndex, 0, taskId)
    return prev
  })
  // Return a context object with the snapshotted value
  return { prevColumns }
}

export const createRemoteTask = async (colId?: ColId) => {
  const newTask = {
    priority: {
      label: 'Low',
      value: '0',
    },
    description: 'Add task description',
    title: 'Untitled',
  }
  const columns = structuredClone(
    queryClient.getQueryData<TColumn[]>(['columns'])
  )
  if (!columns) return
  try {
    // create new task
    const result1 = await fetch(`${basePath}/tasks/`, {
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newTask),
      method: 'POST',
    })
    const createdTask: TTask = await result1.json()
    const targetColumn = columns.find((col) => col.id === colId) ?? columns[0]
    targetColumn.tasks = [
      // Ensure that we do not have duplicates in data from cache
      ...targetColumn.tasks.filter((taskId) => taskId !== createdTask.id),
      createdTask.id,
    ]
    // update target column with new task
    const result2 = await fetch(`${basePath}/columns/${targetColumn.id}`, {
      body: JSON.stringify({ tasks: targetColumn.tasks }),
      headers: { 'content-type': 'application/json' },
      method: 'PUT',
    })
    ;[result1, result2].forEach((res) =>
      console.log('Create task result', res.status)
    )
  } catch (e) {
    console.log('Task create error:', e)
  }
}

export const updateRemoteTask = async (editTask: TTask) => {
  try {
    const result = await fetch(`${basePath}/tasks/${editTask.id}`, {
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ ...editTask }),
      method: 'PUT',
    })
    console.log('Task update status:', result.status)
  } catch (e) {
    console.log('Task update error:', e)
  }
}

export const deleteRemoteTask = async (taskId: TaskId) => {
  const columns = queryClient.getQueryData<TColumn[]>(['columns'])
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const targetColumn = columns?.find((col) => col.tasks.includes(taskId))
  if (!targetColumn) return
  targetColumn.tasks = targetColumn.tasks.filter((id) => id !== taskId)
  try {
    const results = await Promise.allSettled([
      // delete task
      fetch(`${basePath}/tasks/${taskId}`, {
        headers: { 'content-type': 'application/json' },
        method: 'DELETE',
      }),
      // remove taskId from column list
      fetch(`${basePath}/columns/${targetColumn.id}`, {
        body: JSON.stringify({ tasks: targetColumn.tasks }),
        headers: { 'content-type': 'application/json' },
        method: 'PUT',
      }),
    ])
    results.forEach((result) =>
      console.log('Task delete result:', result.status)
    )
  } catch (e) {
    console.log('Task delete error:', e)
  }
}

export const deleteCachedTask = (taskId: TaskId) => {
  const prevTasks = queryClient.getQueryData<TTask[]>(['tasks'])
  // Optimistically update cache
  queryClient.setQueryData<TTask[]>(['tasks'], (prev) => {
    const emptyContext: [] = []
    if (!prev) return emptyContext
    // Make updates
    return prev.filter((task) => task.id !== taskId)
  })
  return { prevTasks }
}
