import { createJSONStorage, persist } from 'zustand/middleware'
import { TaskId, TTask } from '@/lib/types.ts'
import { queryClient } from '@/main.tsx'
import { create } from 'zustand'

type Store = {
  updateEditTask: (updatedTask: TTask) => void
  setEditTask: (taskId: TaskId) => void
  disableEditMode: () => void
  enableEditMode: () => void
  clearEditTask: () => void
  editTask: TTask | null
  isInEditMode: boolean
}

export const useEditStore = create<Store>()(
  persist(
    (set): Store => ({
      setEditTask: (editTaskId) => {
        // Query task from the cache
        const tasks = queryClient.getQueryData<TTask[]>(['tasks'])
        const editTask = tasks?.find((task) => task.id === editTaskId)
        if (!editTask) return
        set({ editTask: editTask ? editTask : null })
      },
      updateEditTask: (updatedTask) =>
        set({
          editTask: updatedTask,
        }),
      disableEditMode: () => set({ isInEditMode: false }),
      enableEditMode: () => set({ isInEditMode: true }),
      clearEditTask: () => set({ editTask: null }),
      isInEditMode: false,
      editTask: null,
    }),
    {
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
      name: 'editStorage',
    }
  )
)
