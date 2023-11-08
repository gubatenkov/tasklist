import type { TaskPriority, TaskId, TTask } from '@/lib/types.ts'

import { createJSONStorage, persist } from 'zustand/middleware'
import { queryClient } from '@/main.tsx'
import { create } from 'zustand'

type Store = {
  setFilterByPriority: (value: TaskPriority['value'] | '') => void
  filterByPriority: TaskPriority['value'] | ''
  updateEditTask: (updatedTask: TTask) => void
  setBoardTitle: (newTitle: string) => void
  setSearchQuery: (query: string) => void
  setEditTask: (taskId: TaskId) => void
  disableEditMode: () => void
  enableEditMode: () => void
  clearEditTask: () => void
  editTask: TTask | null
  isInEditMode: boolean
  searchQuery: string
  boardTitle: string
}

export const useStore = create<Store>()(
  persist(
    (set): Store => ({
      setEditTask: (editTaskId) => {
        // Query task from the cache
        const tasks = queryClient.getQueryData<TTask[]>(['tasks'])
        const editTask = tasks?.find((task) => task.id === editTaskId)
        if (!editTask) return
        set({ editTask: editTask ? editTask : null })
      },
      setFilterByPriority: (priorityValue) =>
        set({
          filterByPriority: priorityValue,
        }),
      updateEditTask: (updatedTask) =>
        set({
          editTask: updatedTask,
        }),
      setBoardTitle: (newTitle) => set({ boardTitle: newTitle }),
      setSearchQuery: (searchQuery) => set({ searchQuery }),
      disableEditMode: () => set({ isInEditMode: false }),
      enableEditMode: () => set({ isInEditMode: true }),
      clearEditTask: () => set({ editTask: null }),
      filterByPriority: '',
      isInEditMode: false,
      boardTitle: 'Tasks',
      searchQuery: '',
      editTask: null,
    }),
    {
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
      name: 'defaultStorage', // name of the item in the storage (must be unique)
    }
  )
)
