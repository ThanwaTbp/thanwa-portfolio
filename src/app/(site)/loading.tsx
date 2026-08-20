import { Skeleton } from '@/components/ui/Skeleton'

const SKELETON_CARD_KEYS = ['skeleton-card-1', 'skeleton-card-2', 'skeleton-card-3'] as const

export default function Loading() {
  return (
    <div className='mx-auto flex max-w-6xl flex-col gap-16 px-4 py-16 sm:px-6 sm:py-20 lg:px-8'>
      <div className='flex flex-col items-center gap-6 py-16 text-center'>
        <Skeleton className='h-7 w-40 rounded-full' />
        <Skeleton className='h-5 w-56' />
        <Skeleton className='h-14 w-full max-w-2xl' />
        <Skeleton className='h-5 w-full max-w-lg' />
        <div className='flex gap-3'>
          <Skeleton className='h-11 w-32 rounded-lg' />
          <Skeleton className='h-11 w-32 rounded-lg' />
        </div>
      </div>

      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {SKELETON_CARD_KEYS.map((cardKey) => (
          <div key={cardKey} className='flex flex-col gap-4'>
            <Skeleton className='aspect-16/10 w-full rounded-xl' />
            <Skeleton className='h-5 w-3/4' />
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-2/3' />
          </div>
        ))}
      </div>
    </div>
  )
}
