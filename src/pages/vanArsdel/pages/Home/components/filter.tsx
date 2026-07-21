import IconElement from '@/components/iconElement/IconElement'
import { ReactComponent as SearchIcon } from '@/assets/icons/search-icon.svg'
import { FC } from 'react'
import { WorkFilter } from '../../../data/workspaceData'

interface FilterProps {
  activeFilter: WorkFilter
  searchQuery: string
  resultCount: number
  totalCount: number
  onFilterChange: (filter: WorkFilter) => void
  onSearchChange: (query: string) => void
}

const filterOptions: Array<{ label: string; value: WorkFilter }> = [
  { label: 'All work', value: 'all' },
  { label: 'At risk', value: 'at-risk' },
  { label: 'Due this week', value: 'due-soon' },
  { label: 'Completed', value: 'completed' },
]

const Filter: FC<FilterProps> = ({
  activeFilter,
  searchQuery,
  resultCount,
  totalCount,
  onFilterChange,
  onSearchChange,
}) => {
  return (
    <section className='border-y border-line bg-white px-4 py-3 sm:px-6'>
      <div className='mx-auto flex max-w-workspace flex-col gap-3 xl:flex-row xl:items-center xl:justify-between'>
        <div
          className='flex gap-2 overflow-x-auto pb-1 xl:pb-0'
          aria-label='Filter work items'
          role='group'
        >
          {filterOptions.map((option) => {
            const isActive = activeFilter === option.value

            return (
              <button
                key={option.value}
                type='button'
                aria-pressed={isActive}
                onClick={() => onFilterChange(option.value)}
                className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'border-brand bg-brand text-white'
                    : 'border-line-input bg-white text-ink hover:border-brand'
                }`}
              >
                {option.label}
              </button>
            )
          })}
        </div>

        <div className='flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3'>
          <p className='text-xs text-ink-muted' aria-live='polite'>
            {resultCount} of {totalCount} work items
          </p>
          <div className='relative'>
            <label htmlFor='work-search' className='sr-only'>
              Search tasks or owners
            </label>
            <IconElement
              className='pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted'
              icon={SearchIcon}
              aria-hidden='true'
            />
            <input
              id='work-search'
              type='search'
              value={searchQuery}
              onChange={(event) => onSearchChange(event.target.value)}
              className={`
                h-10 w-full rounded-lg border border-line-input bg-white py-2 pl-9 pr-3
                text-sm text-ink-strong outline-none transition focus:border-brand
                focus:ring-2 focus:ring-brand-soft sm:w-64
              `}
              placeholder='Search tasks or owners'
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Filter
