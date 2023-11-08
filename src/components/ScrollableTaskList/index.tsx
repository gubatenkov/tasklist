import type { TaskId, ColId } from '@/lib/types.ts'

import { updateRemoteColumn, updateCachedColumn } from '@/lib/mutations.ts'
import { DragDropContext, type DropResult } from 'react-beautiful-dnd'
import { useMutation } from '@tanstack/react-query'
import { useCallback, Suspense } from 'react'
import { queryClient } from '@/main.tsx'

import TaskColumnSkeleton from './TaskColumnSkeleton.tsx'
import ColumnList from './ColumnList.tsx'

export default function ScrollableTaskList() {
  // Mutation with Optimistic update strategy
  const { mutate } = useMutation({
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (_, __, context) => {
      if (context) {
        queryClient.setQueryData(['columns'], context.prevColumns)
      }
    },
    // Always refetch after error or success:
    onSettled: async () => {
      return await queryClient.invalidateQueries({ queryKey: ['columns'] })
    },
    mutationFn: updateRemoteColumn,
    // When mutate is called:
    onMutate: updateCachedColumn,
  })

  const handleDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) return
      const { destination, draggableId, source } = result
      const fromSourceIndex = source.index
      const toTargetIndex = destination.index
      const sourceColId = source.droppableId as ColId
      const targetColId = destination.droppableId as ColId
      const taskId = draggableId as TaskId
      console.log(
        `Task: ${taskId} removed from Col: ${sourceColId} to Col: ${targetColId} from index ${fromSourceIndex} to ${toTargetIndex}`
      )
      mutate({
        fromSourceIndex,
        toTargetIndex,
        sourceColId,
        targetColId,
        taskId,
      })
    },
    [mutate]
  )

  return (
    <div className="mt-3 w-screen min-w-full max-w-max overflow-x-auto pb-3">
      <div className="mx-6 inline-flex w-fit items-stretch">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Suspense fallback={<TaskColumnSkeleton />}>
            <ColumnList />
          </Suspense>
        </DragDropContext>
      </div>
    </div>
  )
}
