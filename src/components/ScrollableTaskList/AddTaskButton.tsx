import { Button } from '@/components/ui/button'
import { ComponentProps } from 'react'
import { Plus } from 'lucide-react'

type Props = ComponentProps<typeof Button>

export default function AddTaskButton(props: Props) {
  return (
    <Button
      className="flex !h-9 w-full cursor-pointer items-center justify-start
      rounded-sm py-0 pl-2 pr-1.5 text-zinc-400 md:h-8"
      variant="ghost"
      {...props}
    >
      <Plus height={14} width={14} />
      <span className="ml-1.5 text-sm font-normal">New</span>
    </Button>
  )
}
