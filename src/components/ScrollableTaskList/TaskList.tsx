import type { TTask } from '@/lib/types.ts'

import TaskItem from './TaskItem.tsx'

type Props = {
  items: TTask[] | []
}

export default function TaskList({ items }: Props) {
  return items.map((task, index) => (
    <TaskItem key={task.id} index={index} {...task} />
  ))
}
