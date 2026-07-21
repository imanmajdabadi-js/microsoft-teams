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
  indigo: 'bg-brand',
  teal: 'bg-accent-teal',
  amber: 'bg-accent-amber',
  rose: 'bg-accent-rose',
}

const Card: FC<CardProps> = ({ title, value, description, accent, progress }) => {
  const progressWidth = Math.max(0, Math.min(progress ?? 0, 100))

  return (
    <article className='rounded-xl border border-line bg-white p-5 shadow-sm'>
      <div className='flex items-center gap-2'>
        <span className={`h-2.5 w-2.5 rounded-full ${accentClasses[accent]}`} />
        <p className='text-sm font-medium text-ink-muted'>{title}</p>
      </div>
      <p className='mt-3 text-3xl font-semibold tracking-tight text-ink-strong'>{value}</p>
      <p className='mt-2 min-h-10 text-sm leading-5 text-ink-muted'>{description}</p>
      {progress !== undefined && (
        <div
          className='mt-4 h-2 overflow-hidden rounded-full bg-line-muted'
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
