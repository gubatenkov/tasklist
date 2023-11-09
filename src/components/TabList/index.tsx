import type { ChangeEvent } from 'react'

import { createRemoteTask } from '@/lib/mutations.ts'
import { useMutation } from '@tanstack/react-query'
import { useAppStore } from '@/stores/appStore.ts'
import { Button } from '@/components/ui/button'
import { queryClient } from '@/main.tsx'

import Search from './Search'

export default function TabList() {
  const { setSearchQuery, searchQuery } = useAppStore()
  const { mutate } = useMutation({
    // Always refetch after error or success:
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['tasks'] })
      return await queryClient.invalidateQueries({ queryKey: ['columns'] })
    },
    mutationFn: createRemoteTask,
  })

  const handleClick = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    mutate()
  }

  const handleChangeQuery = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  return (
    <div className="px-6">
      <div
        className="relative flex h-10 items-center justify-between
        shadow-[0px_-1px_0px_inset] shadow-zinc-100"
      >
        <Search onChange={handleChangeQuery} value={searchQuery} />
        <Button onClick={handleClick} className="h-7">
          New
        </Button>
      </div>
    </div>
  )
}
