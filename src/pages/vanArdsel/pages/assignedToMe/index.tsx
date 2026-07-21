import { Link, useSearchParams } from 'react-router-dom'
import Card from '@/components/card'
import WorkspaceSidebar from '../../components/workspaceSidebar'
import WorkStatusBadge from '../../components/workStatusBadge'
import { getDueLabel, workItems } from '../../data/workspaceData'

type AssignedFilter = 'all' | 'open' | 'at-risk' | 'completed'

const filterOptions: Array<{ label: string; value: AssignedFilter }> = [
  { label: 'All tasks', value: 'all' },
  { label: 'Open', value: 'open' },
  { label: 'At risk', value: 'at-risk' },
  { label: 'Completed', value: 'completed' },
]

const AssignedToMe = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const requestedFilter = searchParams.get('status')
  const activeFilter = filterOptions.some((option) => option.value === requestedFilter)
    ? (requestedFilter as AssignedFilter)
    : 'all'

  const assignedWorkItems = workItems.filter((item) => item.owner === 'You')
  const openCount = assignedWorkItems.filter((item) => item.status !== 'completed').length
  const atRiskCount = assignedWorkItems.filter((item) => item.status === 'at-risk').length
  const completedCount = assignedWorkItems.filter((item) => item.status === 'completed').length
  const focusItem = assignedWorkItems.find((item) => item.status === 'at-risk')

  const visibleWorkItems = assignedWorkItems.filter((item) => {
    if (activeFilter === 'open') {
      return item.status !== 'completed'
    }

    if (activeFilter === 'at-risk') {
      return item.status === 'at-risk'
    }

    if (activeFilter === 'completed') {
      return item.status === 'completed'
    }

    return true
  })

  const handleFilterChange = (filter: AssignedFilter) => {
    const nextSearchParams = new URLSearchParams(searchParams)

    if (filter === 'all') {
      nextSearchParams.delete('status')
    } else {
      nextSearchParams.set('status', filter)
    }

    setSearchParams(nextSearchParams, { replace: true })
  }

  return (
    <div className='min-h-full bg-[#F6F6F9] pb-28 lg:pb-8'>
      <div className='mx-auto flex w-full max-w-[1500px]'>
        <WorkspaceSidebar />

        <section className='min-w-0 flex-1 p-4 sm:p-6 lg:p-8' aria-labelledby='assigned-title'>
          <header className='mb-6'>
            <p className='text-xs font-semibold uppercase tracking-[0.16em] text-[#5B5FC7]'>
              Personal work queue
            </p>
            <h1
              id='assigned-title'
              className='mt-2 text-2xl font-semibold tracking-tight text-[#242424] sm:text-3xl'
            >
              Assigned to me
            </h1>
            <p className='mt-2 max-w-2xl text-sm leading-6 text-[#616161]'>
              Review the launch work you own and focus on the next risk.
            </p>
          </header>

          <section className='grid gap-3 sm:grid-cols-3' aria-label='Assigned work summary'>
            <Card
              title='Open work'
              value={String(openCount)}
              description='Tasks that still need your attention'
              accent='teal'
            />
            <Card
              title='At risk'
              value={String(atRiskCount)}
              description='Your tasks that need a decision or follow-up'
              accent='rose'
            />
            <Card
              title='Completed'
              value={String(completedCount)}
              description='Tasks you have already finished'
              accent='indigo'
            />
          </section>

          {focusItem && (
            <section className='mt-6 rounded-xl border border-[#F3C6C9] bg-[#FFF8F8] p-5'>
              <p className='text-xs font-semibold uppercase tracking-wide text-[#A4262C]'>
                Next attention item
              </p>
              <div className='mt-2 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between'>
                <div>
                  <h2 className='font-semibold text-[#242424]'>{focusItem.title}</h2>
                  <p className='mt-1 text-sm text-[#616161]'>{focusItem.blocker}</p>
                </div>
                <Link
                  to={`/van-ardsel/workstreams/${focusItem.workstreamId}/tasks/${focusItem.id}`}
                  className={`
                    inline-flex shrink-0 justify-center rounded-lg bg-[#5B5FC7] px-4 py-2
                    text-sm font-medium text-white hover:bg-[#4F52B2]
                  `}
                >
                  Review task
                </Link>
              </div>
            </section>
          )}

          <section className='mt-6 overflow-hidden rounded-xl border border-[#E1E1E8] bg-white shadow-sm'>
            <div className='border-b border-[#E1E1E8] px-4 py-4 sm:px-5'>
              <div
                className='flex gap-2 overflow-x-auto pb-1'
                role='group'
                aria-label='Filter assigned tasks'
              >
                {filterOptions.map((option) => {
                  const isActive = activeFilter === option.value

                  return (
                    <button
                      key={option.value}
                      type='button'
                      aria-pressed={isActive}
                      onClick={() => handleFilterChange(option.value)}
                      className={`
                        whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium
                        transition-colors ${
                        isActive
                          ? 'border-[#5B5FC7] bg-[#5B5FC7] text-white'
                          : 'border-[#D1D1D8] text-[#424242] hover:border-[#5B5FC7]'
                      }`}
                    >
                      {option.label}
                    </button>
                  )
                })}
              </div>
              <p className='mt-3 text-xs text-[#616161]' aria-live='polite'>
                {visibleWorkItems.length} of {assignedWorkItems.length} assigned tasks
              </p>
            </div>

            {visibleWorkItems.length === 0 ? (
              <div className='px-5 py-12 text-center' role='status'>
                <p className='font-medium text-[#242424]'>No tasks match this filter</p>
                <p className='mt-1 text-sm text-[#616161]'>Choose another status to review your work.</p>
              </div>
            ) : (
              <div className='divide-y divide-[#ECECF1]'>
                {visibleWorkItems.map((item) => (
                  <article
                    key={item.id}
                    className='grid gap-4 px-4 py-4 sm:grid-cols-[minmax(0,1fr)_120px_120px] sm:items-center sm:px-5'
                  >
                    <div className='min-w-0'>
                      <h2>
                        <Link
                          to={`/van-ardsel/workstreams/${item.workstreamId}/tasks/${item.id}`}
                          className='font-medium text-[#242424] hover:text-[#5B5FC7] hover:underline'
                        >
                          {item.title}
                        </Link>
                      </h2>
                      <p className='mt-1 text-sm text-[#616161]'>{item.workstream}</p>
                    </div>
                    <div>
                      <p className='text-[11px] uppercase tracking-wide text-[#8A8A8A]'>Priority</p>
                      <p className='mt-1 text-sm font-medium capitalize text-[#424242]'>
                        {item.priority}
                      </p>
                    </div>
                    <div className='sm:text-right'>
                      <WorkStatusBadge status={item.status} />
                      <p className='mt-1.5 text-xs text-[#616161]'>{getDueLabel(item)}</p>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </section>
      </div>
    </div>
  )
}

export default AssignedToMe
