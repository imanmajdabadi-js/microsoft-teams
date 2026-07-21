import { FC } from 'react'

type CardAccent = 'indigo' | 'teal' | 'amber' | 'rose'

interface CardProps {
  title: string
  value: string
  description: string
  accent: CardAccent
  progress?: number
}

const accentClasses: Record<CardAccent, string> = {
  indigo: 'bg-[#5B5FC7]',
  teal: 'bg-[#00A6A6]',
  amber: 'bg-[#D97706]',
  rose: 'bg-[#C4314B]',
}

const Card: FC<CardProps> = ({ title, value, description, accent, progress }) => {
  const progressWidth = Math.max(0, Math.min(progress ?? 0, 100))

  return (
    <article className='rounded-xl border border-[#E1E1E8] bg-white p-5 shadow-sm'>
      <div className='flex items-center gap-2'>
        <span className={`h-2.5 w-2.5 rounded-full ${accentClasses[accent]}`} />
        <p className='text-sm font-medium text-[#616161]'>{title}</p>
      </div>
      <p className='mt-3 text-3xl font-semibold tracking-tight text-[#242424]'>{value}</p>
      <p className='mt-2 min-h-10 text-sm leading-5 text-[#616161]'>{description}</p>
      {progress !== undefined && (
        <div
          className='mt-4 h-2 overflow-hidden rounded-full bg-[#ECECF3]'
          aria-label={`${progress}% complete`}
          aria-valuemax={100}
          aria-valuemin={0}
          aria-valuenow={progressWidth}
          role='progressbar'
        >
          <div
            className={`h-full rounded-full ${accentClasses[accent]}`}
            style={{ width: `${progressWidth}%` }}
          />
        </div>
      )}
    </article>
  )
}

export default Card
