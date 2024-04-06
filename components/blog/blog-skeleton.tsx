import { Skeleton } from '../ui/skeleton'

type BlogSkeletonProps = {
  qty?: number
}
export const BlogSkeleton = ({ qty=4 }: BlogSkeletonProps) => {
  return (
    <div className='grid md:gap-8 gap-4 grid-responsive my-8'>
      {
        Array.from({ length: qty }).map((_, index) => (
          <div className="flex flex-col space-y-3" key={index}>
            <Skeleton className="h-[14rem] rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-2 w-full" />
              <Skeleton className="h-16 w-full" />
            </div>
          </div>
        ))
      }
    </div>
  )
}