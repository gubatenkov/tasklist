import type { TColumn } from '@/lib/types.ts'
import type { ReactNode } from 'react'

import AddTaskButton from '@/components/ScrollableTaskList/AddTaskButton'
import { CheckCircle2, Circle, Clock3 } from 'lucide-react'
import { createRemoteTask } from '@/lib/mutations.ts'
import { useMutation } from '@tanstack/react-query'
import { Droppable } from 'react-beautiful-dnd'
import { queryClient } from '@/main.tsx'

const iconMap = {
  CheckCircle2,
  Circle,
  Clock3,
}

export default function TaskColumn({
  itemsNumber,
  children,
  color,
  name,
  icon,
  id,
}: TColumn & { children: ReactNode; itemsNumber: number }) {
  const Icon = iconMap[icon]
  const { mutate } = useMutation({
    // Always refetch after error or success:
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['tasks'] })
      return await queryClient.invalidateQueries({ queryKey: ['columns'] })
    },
    mutationFn: createRemoteTask,
  })

  const handleAddNewTask = () => {
    mutate(id)
  }

  return (
    <div className="column mr-4 w-[16.25rem] last:mr-0">
      <div className="mb-2 flex h-8 items-center px-1 text-sm">
        <Icon
          className="mr-1.5 text-zinc-400"
          color={color}
          height={16}
          width={16}
        />
        <span className="font-medium text-zinc-400" style={{ color }}>
          {name}
        </span>
        <span className="px-2 font-normal text-zinc-400">{itemsNumber}</span>
      </div>
      <Droppable
        isCombineEnabled={true}
        isDropDisabled={false}
        droppableId={id}
        type="Column"
      >
        {(provided) => {
          return (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {children}
              {(provided.placeholder as ReactNode & { props: { on: object } })
                .props.on && (
                <div
                  className="mb-[5px] h-10 w-full rounded-md border
                  border-dashed"
                />
              )}
              <AddTaskButton onClick={handleAddNewTask} />
            </div>
          )
        }}
      </Droppable>
    </div>
  )
}
