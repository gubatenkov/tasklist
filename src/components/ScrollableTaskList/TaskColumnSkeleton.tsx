import { Skeleton } from '@/components/ui/skeleton.tsx'

export default function TaskColumnSkeleton() {
  return (
    <>
      <div className="mr-4 w-[16.25rem] pt-2 last:mr-0">
        <div className="mb-4 flex items-center">
          <Skeleton className="mr-2 h-4 w-[8rem] rounded-md" />
          <Skeleton className="h-4 w-[1rem] rounded-full" />
        </div>
        <Skeleton className="mb-1.5 h-10 w-full rounded-md" />
        <Skeleton className="mb-2 h-10 w-full rounded-md" />
        <Skeleton className="h-5 w-[40%] rounded-full" />
      </div>
      <div className="mr-4 w-[16.25rem] pt-2 last:mr-0">
        <div className="mb-4 flex items-center">
          <Skeleton className="mr-2 h-4 w-[8rem] rounded-md" />
          <Skeleton className="h-4 w-[1rem] rounded-full" />
        </div>
        <Skeleton className="mb-1.5 h-10 w-full rounded-md" />
        <Skeleton className="mb-2 h-10 w-full rounded-md" />
        <Skeleton className="h-5 w-[40%] rounded-full" />
      </div>
      <div className="mr-4 w-[16.25rem] pt-2 last:mr-0">
        <div className="mb-4 flex items-center">
          <Skeleton className="mr-2 h-4 w-[8rem] rounded-md" />
          <Skeleton className="h-4 w-[1rem] rounded-full" />
        </div>
        <Skeleton className="mb-1.5 h-10 w-full rounded-md" />
        <Skeleton className="mb-2 h-10 w-full rounded-md" />
        <Skeleton className="h-5 w-[40%] rounded-full" />
      </div>
    </>
  )
}
