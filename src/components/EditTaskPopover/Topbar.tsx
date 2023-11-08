import { deleteCachedTask, deleteRemoteTask } from '@/lib/mutations.ts'
import { ChevronsRight, Trash2 } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { queryClient } from '@/main.tsx'
import { useStore } from '@/store'
import { cn } from '@/lib/utils'

export default function Topbar() {
  const {
    disableEditMode,
    enableEditMode,
    clearEditTask,
    isInEditMode,
    editTask,
  } = useStore()
  const { mutate } = useMutation({
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (_, __, context) => {
      if (context) {
        queryClient.setQueryData(['tasks'], context.prevTasks)
      }
    },
    // Always refetch after error or success:
    onSettled: async () => {
      return await queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
    mutationFn: deleteRemoteTask,
    onMutate: deleteCachedTask,
  })

  const handleClick = () => {
    isInEditMode ? disableEditMode() : enableEditMode()
  }

  const handleRemove = () => {
    disableEditMode()
    if (!editTask) return
    mutate(editTask.id)
    clearEditTask()
  }

  return (
    <div
      className="header flex h-11 w-full items-center justify-between
      border-b border-b-zinc-100 bg-white"
    >
      <Button
        className="!h-11 hover:bg-[initial] "
        onClick={handleClick}
        variant="ghost"
      >
        <ChevronsRight />
      </Button>
      <Button
        className={cn(
          'flex items-center transition-opacity duration-150 ease-in-out',
          '!h-11 text-sm text-red-400 hover:bg-[initial] hover:text-red-400',
          isInEditMode ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
        onClick={handleRemove}
        variant="ghost"
      >
        <Trash2 className="mr-1.5" height={16} width={16} />
        <span>Delete</span>
      </Button>
    </div>
  )
}
