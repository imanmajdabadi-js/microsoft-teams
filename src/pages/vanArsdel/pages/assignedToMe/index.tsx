import { Link, useSearchParams } from 'react-router-dom'
import Card from '@/components/card'
import WorkspaceSidebar from '../../components/workspaceSidebar'
import WorkStatusBadge from '../../components/workStatusBadge'
import { useWorkspace } from '../../context/workspaceContext'
import { getDueLabel } from '../../data/workspaceData'

type AssignedFilter = 'all' | 'open' | 'at-risk' | 'completed'

const filterOptions: Array<{ label: string; value: AssignedFilter }> = [
  { label: 'All tasks', value: 'all' },
  { label: 'Open', value: 'open' },
  { label: 'At risk', value: 'at-risk' },
  { label: 'Completed', value: 'completed' },
]

const AssignedToMe = () => {
  const { workItems } = useWorkspace()
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
    <div className='min-h-full bg-surface-canvas pb-8'>
      <div className='mx-auto flex w-full max-w-workspace'>
        <WorkspaceSidebar />

        <section className='min-w-0 flex-1 p-4 sm:p-6 lg:p-8' aria-labelledby='assigned-title'>
          <header className='mb-6'>
            <p className='text-xs font-semibold uppercase tracking-eyebrow text-brand'>
              Personal work queue
            </p>
            <h1
              id='assigned-title'
              className='mt-2 text-2xl font-semibold tracking-tight text-ink-strong sm:text-3xl'
            >
              Assigned to me
            </h1>
            <p className='mt-2 max-w-2xl text-sm leading-6 text-ink-muted'>
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
            <section className='mt-6 rounded-xl border border-danger-300 bg-danger-50 p-5'>
              <p className='text-xs font-semibold uppercase tracking-wide text-danger-700'>
                Next attention item
              </p>
              <div className='mt-2 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between'>
                <div>
                  <h2 className='font-semibold text-ink-strong'>{focusItem.title}</h2>
                  <p className='mt-1 text-sm text-ink-muted'>{focusItem.blocker}</p>
                </div>
                <Link
                  to={`/van-arsdel/workstreams/${focusItem.workstreamId}/tasks/${focusItem.id}`}
                  className={`
                    inline-flex shrink-0 justify-center rounded-lg bg-brand px-4 py-2
                    text-sm font-medium text-white hover:bg-brand-hover
                  `}
                >
                  Review task
                </Link>
              </div>
            </section>
          )}

          <section className='mt-6 overflow-hidden rounded-xl border border-line bg-white shadow-sm'>
            <div className='border-b border-line px-4 py-4 sm:px-5'>
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
                          ? 'border-brand bg-brand text-white'
                          : 'border-line-input text-ink hover:border-brand'
                      }`}
                    >
                      {option.label}
                    </button>
                  )
                })}
              </div>
              <p className='mt-3 text-xs text-ink-muted' aria-live='polite'>
                {visibleWorkItems.length} of {assignedWorkItems.length} assigned tasks
              </p>
            </div>

            {visibleWorkItems.length === 0 ? (
              <div className='px-5 py-12 text-center' role='status'>
                <p className='font-medium text-ink-strong'>No tasks match this filter</p>
                <p className='mt-1 text-sm text-ink-muted'>Choose another status to review your work.</p>
              </div>
            ) : (
              <div className='divide-y divide-line-subtle'>
                {visibleWorkItems.map((item) => (
                  <article
                    key={item.id}
                    className='grid gap-4 px-4 py-4 sm:grid-cols-work-row sm:items-center sm:px-5'
                  >
                    <div className='min-w-0'>
                      <h2>
                        <Link
                          to={`/van-arsdel/workstreams/${item.workstreamId}/tasks/${item.id}`}
                          className='font-medium text-ink-strong hover:text-brand hover:underline'
                        >
                          {item.title}
                        </Link>
                      </h2>
                      <p className='mt-1 text-sm text-ink-muted'>{item.workstream}</p>
                    </div>
                    <div>
                      <p className='text-caption uppercase tracking-wide text-ink-subtle'>Priority</p>
                      <p className='mt-1 text-sm font-medium capitalize text-ink'>
                        {item.priority}
                      </p>
                    </div>
                    <div className='sm:text-right'>
                      <WorkStatusBadge status={item.status} />
                      <p className='mt-1.5 text-xs text-ink-muted'>{getDueLabel(item)}</p>
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
