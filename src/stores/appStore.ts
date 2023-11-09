import type { TaskPriority } from '@/lib/types.ts'

import { createJSONStorage, persist } from 'zustand/middleware'
import { create } from 'zustand'

type Store = {
  setFilterByPriority: (value: TaskPriority['value'] | '') => void
  filterByPriority: TaskPriority['value'] | ''
  setBoardTitle: (newTitle: string) => void
  setSearchQuery: (query: string) => void
  searchQuery: string
  boardTitle: string
}

export const useAppStore = create<Store>()(
  persist(
    (set): Store => ({
      setFilterByPriority: (priorityValue) =>
        set({
          filterByPriority: priorityValue,
        }),
      setBoardTitle: (newTitle) => set({ boardTitle: newTitle }),
      setSearchQuery: (searchQuery) => set({ searchQuery }),
      filterByPriority: '',
      boardTitle: 'Tasks',
      searchQuery: '',
    }),
    {
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
      name: 'appStorage',
    }
  )
)
