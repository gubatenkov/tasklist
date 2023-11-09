import type { TaskPriority } from '@/lib/types.ts'

import FiltersPopover from '@/components/Filters/FiltersPopover'
import { useAppStore } from '@/stores/appStore.ts'
import { Button } from '@/components/ui/button'
import { priorities, cn } from '@/lib/utils'
import { PlusIcon } from 'lucide-react'

export default function Filters() {
  const { setFilterByPriority, filterByPriority } = useAppStore()
  const filterValue =
    filterByPriority in priorities
      ? priorities[filterByPriority as TaskPriority['value']].label
      : ''

  return (
    <div className="mt-1.5 flex items-center px-6">
      <Button
        className={cn(
          'h-7 px-2 py-0 font-normal text-zinc-700/50',
          filterByPriority ? 'block' : 'hidden'
        )}
        onClick={() => setFilterByPriority('')}
        variant="ghost"
      >
        {`Priority: ${filterValue}`}
      </Button>
      <FiltersPopover isHidden={Boolean(filterValue)}>
        <Button
          className="h-7 px-2 py-0 font-normal text-zinc-700/50"
          variant="ghost"
        >
          <PlusIcon height={16} width={16} />
          <span className="ml-1.5">Add filter</span>
        </Button>
      </FiltersPopover>
    </div>
  )
}
