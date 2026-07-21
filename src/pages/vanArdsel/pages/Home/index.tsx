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
    <div className='min-h-full bg-[#F6F6F9] pb-28 lg:pb-8'>
      <Filter
        activeFilter={activeFilter}
        searchQuery={searchQuery}
        resultCount={filteredWorkItems.length}
        totalCount={workItems.length}
        onFilterChange={setActiveFilter}
        onSearchChange={setSearchQuery}
      />

      <div className='mx-auto flex w-full max-w-[1500px]'>
        <WorkspaceSidebar />

        <section className='min-w-0 flex-1 p-4 sm:p-6 lg:p-8' aria-labelledby='launch-title'>
          <header className='mb-6'>
            <p className='text-xs font-semibold uppercase tracking-[0.16em] text-[#5B5FC7]'>
              Van Arsdel launch workspace
            </p>
            <h1
              id='launch-title'
              className='mt-2 text-2xl font-semibold tracking-tight text-[#242424] sm:text-3xl'
            >
              Launch work overview
            </h1>
            <p className='mt-2 max-w-2xl text-sm leading-6 text-[#616161]'>
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

          <section className='mt-6 overflow-hidden rounded-xl border border-[#E1E1E8] bg-white shadow-sm'>
            <div className='border-b border-[#E1E1E8] px-4 py-4 sm:px-5'>
              <h2 className='text-base font-semibold text-[#242424]'>Priority work</h2>
              <p className='mt-1 text-sm text-[#616161]'>
                The current items shared across launch workstreams.
              </p>
            </div>

            {filteredWorkItems.length === 0 ? (
              <div className='px-5 py-12 text-center' role='status'>
                <p className='font-medium text-[#242424]'>No work items found</p>
                <p className='mt-1 text-sm text-[#616161]'>
                  Try another filter or clear the search field.
                </p>
              </div>
            ) : (
              <div className='divide-y divide-[#ECECF1]'>
                {filteredWorkItems.map((item) => (
                  <article
                    key={item.id}
                    className='grid gap-4 px-4 py-4 sm:grid-cols-[minmax(0,1fr)_120px_120px] sm:items-center sm:px-5'
                  >
                    <div className='min-w-0'>
                      <h3>
                        <Link
                          to={`/van-ardsel/workstreams/${item.workstreamId}/tasks/${item.id}`}
                          className='font-medium text-[#242424] hover:text-[#5B5FC7] hover:underline'
                        >
                          {item.title}
                        </Link>
                      </h3>
                      <Link
                        to={`/van-ardsel/workstreams/${item.workstreamId}`}
                        className='mt-1 inline-block text-sm text-[#616161] hover:text-[#5B5FC7]'
                      >
                        {item.workstream}
                      </Link>
                    </div>
                    <div>
                      <p className='text-[11px] uppercase tracking-wide text-[#8A8A8A]'>Owner</p>
                      <p className='mt-1 text-sm font-medium text-[#424242]'>{item.owner}</p>
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

export default Home
