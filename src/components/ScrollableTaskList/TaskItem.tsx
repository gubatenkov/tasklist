import type { TTask } from '@/lib/types.ts'

import { useEditStore } from '@/stores/editStore.ts'
import { Draggable } from 'react-beautiful-dnd'

export default function TaskItem({
  title = 'Untitled',
  index,
  id,
}: TTask & { index: number }) {
  const { enableEditMode, setEditTask } = useEditStore()

  const handleClick = () => {
    setEditTask(id)
    enableEditMode()
  }

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          className="task-item mb-[5px] line-clamp-1 !h-10 !cursor-pointer
          rounded-md bg-white px-2 text-sm font-medium leading-[2.8575]
          shadow-[0px_0px_0px_1px,0px_2px_4px] shadow-zinc-200 hover:bg-zinc-100"
          style={{
            ...provided.draggableProps.style,
          }}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          placeholder="Untitled"
          onClick={handleClick}
        >
          {title}
        </div>
      )}
    </Draggable>
  )
}
