import type { TaskId, TTask } from '@/lib/types.ts'

import { getAllColumns, getAllTasks } from '@/lib/functions.ts'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useCallback } from 'react'
import { useStore } from '@/store'

import TaskColumn from './TaskColumn.tsx'
import TaskList from './TaskList.tsx'

export default function ColumnList() {
  const { filterByPriority, searchQuery } = useStore()
  const { data } = useSuspenseQuery({
    queryFn: getAllColumns,
    queryKey: ['columns'],
  })
  const { data: taskList } = useSuspenseQuery({
    queryFn: getAllTasks,
    queryKey: ['tasks'],
  })

  const getColTasks = useCallback(
    (taskIds: TaskId[]) => {
      return taskIds
        .map((taskId) => {
          for (const task of taskList) {
            if (taskId === task.id) {
              return task
            }
          }
        })
        .filter((task): task is TTask => Boolean(task))
    },
    [taskList]
  )

  const applyFilters = useCallback(
    (tasks: TTask[]) => {
      return tasks
        .filter((task) => {
          const lowerTitle = task.title.toLowerCase()
          const lowerQuery = searchQuery.toLowerCase()
          return searchQuery ? lowerTitle.includes(lowerQuery) : task
        })
        .filter((task) => {
          return filterByPriority
            ? task.priority.value === filterByPriority
            : task
        })
    },
    [searchQuery, filterByPriority]
  )

  return data.map((col) => (
    <TaskColumn
      itemsNumber={getColTasks(col.tasks).length}
      key={col.id}
      {...col}
    >
      <TaskList items={applyFilters(getColTasks(col.tasks))} />
    </TaskColumn>
  ))
}
