import type { TaskPriority } from '@/lib/types.ts'
import type { ReactNode } from 'react'

import {
  PopoverContent,
  PopoverTrigger,
  Popover,
} from '@/components/ui/popover'
import GenericSelect from '@/components/EditTaskPopover/GenericSelect'
import { useAppStore } from '@/stores/appStore.ts'
import { Label } from '@/components/ui/label'
import { priorities, cn } from '@/lib/utils'

type Props = { children: ReactNode; className?: string; isHidden: boolean }

export default function FiltersPopover({
  className = '',
  isHidden,
  children,
}: Props) {
  const { setFilterByPriority, filterByPriority } = useAppStore()

  return (
    !isHidden && (
      <Popover>
        <PopoverTrigger asChild>{children}</PopoverTrigger>
        <PopoverContent
          className={cn(
            'w-full min-w-[calc(100vw-3rem)] sm:min-w-[20rem] sm:max-w-none',
            className
          )}
          align="start"
        >
          <div className="flex flex-col">
            <div className="">
              <h4 className="mb-4 font-medium leading-none">
                Available filters
              </h4>
            </div>
            <div className="flex flex-col">
              <div className="grid grid-cols-[0.8fr_1.2fr] items-center">
                <Label
                  className="font-normal text-zinc-500"
                  htmlFor="maxHeight"
                >
                  Priority:
                </Label>
                <GenericSelect<TaskPriority>
                  onValueChange={(value: TaskPriority['value']) =>
                    setFilterByPriority(value)
                  }
                  value={filterByPriority as TaskPriority['value']}
                  variants={[...Object.values(priorities)]}
                  placeholder="Choose priority"
                  className="!h-8 w-full"
                />
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    )
  )
}
