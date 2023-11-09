import type { TaskPriority, TTask } from '@/lib/types.ts'
import type { ChangeEvent } from 'react'

import GenericSelect from '@/components/EditTaskPopover/GenericSelect'
import IconTextCol from '@/components/EditTaskPopover/IconTextCol'
import Topbar from '@/components/EditTaskPopover/Topbar'
import { updateRemoteTask } from '@/lib/mutations.ts'
import { useDebouncedCallback } from '@/lib/hooks.ts'
import { useEditStore } from '@/stores/editStore.ts'
import { useMutation } from '@tanstack/react-query'
import { ArrowDownUpIcon } from 'lucide-react'
import { priorities } from '@/lib/utils.ts'
import { queryClient } from '@/main.tsx'
import { cn } from '@/lib/utils'

import Input from './Input'

export default function EditTaskPopover() {
  const { updateEditTask, isInEditMode, editTask } = useEditStore()
  const { mutate } = useMutation<void, Error, TTask>({
    onSettled: async () => {
      return await queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
    mutationFn: updateRemoteTask,
  })
  const debouncedMutation = useDebouncedCallback<[TTask]>(mutate, 2500)

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value, name } = e.target
    if (!editTask) return
    const updatedTask: TTask = { ...editTask, [name]: value }
    updateEditTask(updatedTask)
    debouncedMutation(updatedTask)
  }

  const handleChangePriority = (value: TaskPriority['value']) => {
    if (!editTask) return
    const updatedTask: TTask = { ...editTask, priority: priorities[value] }
    updateEditTask(updatedTask)
    debouncedMutation(updatedTask)
  }

  return (
    <div
      className={cn(
        'absolute bottom-0 right-0 top-0 z-10 min-h-screen w-full bg-white',
        'shadow-md shadow-zinc-200 transition-transform duration-300 ease-in-out',
        'md:max-w-[50%]',
        isInEditMode ? 'translate-x-0' : 'translate-x-full'
      )}
    >
      <Topbar />
      <div className="px-6 py-10">
        <Input
          className="title caret-z min-h-[3.5rem] w-full resize-none
          whitespace-pre-wrap break-words px-0.5 py-[0.125rem] text-[2rem]
          font-bold leading-[1.2] text-zinc-900 caret-zinc-900"
          value={editTask?.title}
          onChange={handleChange}
          placeholder="Untitled"
          readOnly={!editTask}
          name="title"
        />

        <div className="mb-6 border-b border-zinc-100 pb-5 pt-4">
          <div className="flex items-center">
            <IconTextCol icon={ArrowDownUpIcon} text="Priority" />
            <GenericSelect<TaskPriority>
              variants={[...Object.values(priorities)]}
              value={editTask?.priority.value ?? '0'}
              onValueChange={handleChangePriority}
              className="h-8 w-full max-w-[10rem]"
              placeholder="Choose priority"
              disabled={!editTask}
            />
          </div>
        </div>

        <Input
          className="min-h-[5rem] w-full resize-none overflow-hidden text-base"
          placeholder="Tap here to add a description to the task"
          value={editTask?.description}
          onChange={handleChange}
          disabled={!editTask}
          name="description"
        />
      </div>
    </div>
  )
}
