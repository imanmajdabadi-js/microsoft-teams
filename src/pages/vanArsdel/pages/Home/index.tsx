import { useState } from 'react'
import { Link } from 'react-router-dom'
import Filter from './components/filter'
import Card from '@/components/card'
import WorkStatusBadge from '../../components/workStatusBadge'
import WorkspaceSidebar from '../../components/workspaceSidebar'
import { useWorkspace } from '../../context/workspaceContext'
import {
  WorkFilter,
  WorkItem,
  getDueLabel,
} from '../../data/workspaceData'

const matchesFilter = (item: WorkItem, filter: WorkFilter) => {
  if (filter === 'at-risk') {
    return item.status === 'at-risk'
  }

  if (filter === 'due-soon') {
    return item.status !== 'completed' && item.dueInDays <= 7
  }

  if (filter === 'completed') {
    return item.status === 'completed'
  }

  return true
}

const Home = () => {
  const { workItems } = useWorkspace()
  const [activeFilter, setActiveFilter] = useState<WorkFilter>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const normalizedSearch = searchQuery.trim().toLowerCase()
  const filteredWorkItems = workItems.filter((item) => {
    const searchableText = `${item.title} ${item.workstream} ${item.owner}`.toLowerCase()

    return matchesFilter(item, activeFilter) && searchableText.includes(normalizedSearch)
  })

  const completedCount = workItems.filter((item) => item.status === 'completed').length
  const openCount = workItems.length - completedCount
  const dueSoonCount = workItems.filter(
    (item) => item.status !== 'completed' && item.dueInDays <= 7,
  ).length
  const atRiskCount = workItems.filter((item) => item.status === 'at-risk').length
  const completionRate = Math.round((completedCount / workItems.length) * 100)

  return (
    <div className='min-h-full bg-surface-canvas pb-8'>
      <Filter
        activeFilter={activeFilter}
        searchQuery={searchQuery}
        resultCount={filteredWorkItems.length}
        totalCount={workItems.length}
        onFilterChange={setActiveFilter}
        onSearchChange={setSearchQuery}
      />

      <div className='mx-auto flex w-full max-w-workspace'>
        <WorkspaceSidebar />

        <section className='min-w-0 flex-1 p-4 sm:p-6 lg:p-8' aria-labelledby='launch-title'>
          <header className='mb-6'>
            <p className='text-xs font-semibold uppercase tracking-eyebrow text-brand'>
              Van Arsdel launch workspace
            </p>
            <h1
              id='launch-title'
              className='mt-2 text-2xl font-semibold tracking-tight text-ink-strong sm:text-3xl'
            >
              Launch work overview
            </h1>
            <p className='mt-2 max-w-2xl text-sm leading-6 text-ink-muted'>
              Track the team&apos;s priority work, upcoming deadlines, and items that need attention.
            </p>
          </header>

          <section
            className='grid gap-3 sm:grid-cols-2 xl:grid-cols-4'
            aria-label='Launch summary'
          >
            <Card
              title='Overall progress'
              value={`${completionRate}%`}
              description={`${completedCount} of ${workItems.length} priority items completed`}
              accent='indigo'
              progress={completionRate}
            />
            <Card
              title='Open work'
              value={String(openCount)}
              description='Items still moving across the launch team'
              accent='teal'
            />
            <Card
              title='Due this week'
              value={String(dueSoonCount)}
              description='Open items due within the next seven days'
              accent='amber'
            />
            <Card
              title='At risk'
              value={String(atRiskCount)}
              description='Items that need a decision or follow-up'
              accent='rose'
            />
          </section>

          <section className='mt-6 overflow-hidden rounded-xl border border-line bg-white shadow-sm'>
            <div className='border-b border-line px-4 py-4 sm:px-5'>
              <h2 className='text-base font-semibold text-ink-strong'>Priority work</h2>
              <p className='mt-1 text-sm text-ink-muted'>
                The current items shared across launch workstreams.
              </p>
            </div>

            {filteredWorkItems.length === 0 ? (
              <div className='px-5 py-12 text-center' role='status'>
                <p className='font-medium text-ink-strong'>No work items found</p>
                <p className='mt-1 text-sm text-ink-muted'>
                  Try another filter or clear the search field.
                </p>
              </div>
            ) : (
              <div className='divide-y divide-line-subtle'>
                {filteredWorkItems.map((item) => (
                  <article
                    key={item.id}
                    className='grid gap-4 px-4 py-4 sm:grid-cols-work-row sm:items-center sm:px-5'
                  >
                    <div className='min-w-0'>
                      <h3>
                        <Link
                          to={`/van-arsdel/workstreams/${item.workstreamId}/tasks/${item.id}`}
                          className='font-medium text-ink-strong hover:text-brand hover:underline'
                        >
                          {item.title}
                        </Link>
                      </h3>
                      <Link
                        to={`/van-arsdel/workstreams/${item.workstreamId}`}
                        className='mt-1 inline-block text-sm text-ink-muted hover:text-brand'
                      >
                        {item.workstream}
                      </Link>
                    </div>
                    <div>
                      <p className='text-caption uppercase tracking-wide text-ink-subtle'>Owner</p>
                      <p className='mt-1 text-sm font-medium text-ink'>{item.owner}</p>
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

export default Home
