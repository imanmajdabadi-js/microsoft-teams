import { useState } from 'react'
import Filter from './components/filter'
import Tree, { TreeNode } from '@/components/tree'
import Card from '@/components/card'
import { WorkFilter, WorkItem, WorkStatus, workItems } from './dashboardData'

const workspaceTree: TreeNode[] = [
  {
    title: 'Product launch',
    key: 'launch',
    children: [
      {
        title: 'Launch overview',
        key: 'launch-overview',
      },
      {
        title: 'Spring campaign',
        key: 'spring-campaign',
      },
      {
        title: 'Retail partners',
        key: 'retail-partners',
      },
      {
        title: 'Creative assets',
        key: 'creative-assets',
      },
    ],
  },
  {
    title: 'Website refresh',
    key: 'website',
    children: [
      {
        title: 'Analytics review',
        key: 'analytics-review',
      },
      {
        title: 'Content updates',
        key: 'content-updates',
      },
    ],
  },
]

const statusLabels: Record<WorkStatus, string> = {
  'in-progress': 'In progress',
  'at-risk': 'At risk',
  completed: 'Completed',
}

const statusClasses: Record<WorkStatus, string> = {
  'in-progress': 'bg-[#E8F1FB] text-[#185B8C]',
  'at-risk': 'bg-[#FDE7E9] text-[#A4262C]',
  completed: 'bg-[#E7F3EC] text-[#107C41]',
}

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

const getDueLabel = (item: WorkItem) => {
  if (item.status === 'completed') {
    return 'Completed'
  }

  if (item.dueInDays === 0) {
    return 'Due today'
  }

  if (item.dueInDays === 1) {
    return 'Due tomorrow'
  }

  return `Due in ${item.dueInDays} days`
}

const Home = () => {
  const [expandedKeys, setExpandedKeys] = useState<string[]>(['launch'])
  const [activeFilter, setActiveFilter] = useState<WorkFilter>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const handleNodeSelect = (key: string) => {
    setExpandedKeys((prevKeys) => {
      if (prevKeys.includes(key)) {
        return prevKeys.filter((k) => k !== key)
      }
      return [...prevKeys, key]
    })
  }

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
        <aside className='hidden w-60 shrink-0 border-r border-[#E1E1E8] bg-white px-4 py-6 lg:block'>
          <h2 className='mb-3 text-xs font-semibold uppercase tracking-wide text-[#616161]'>
            Workstreams
          </h2>
          <Tree data={workspaceTree} expandedKeys={expandedKeys} onNodeSelect={handleNodeSelect} />
        </aside>

        <main className='min-w-0 flex-1 p-4 sm:p-6 lg:p-8'>
          <header className='mb-6'>
            <p className='text-xs font-semibold uppercase tracking-[0.16em] text-[#5B5FC7]'>
              Van Arsdel launch workspace
            </p>
            <h1 className='mt-2 text-2xl font-semibold tracking-tight text-[#242424] sm:text-3xl'>
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
                      <h3 className='font-medium text-[#242424]'>{item.title}</h3>
                      <p className='mt-1 text-sm text-[#616161]'>{item.workstream}</p>
                    </div>
                    <div>
                      <p className='text-[11px] uppercase tracking-wide text-[#8A8A8A]'>Owner</p>
                      <p className='mt-1 text-sm font-medium text-[#424242]'>{item.owner}</p>
                    </div>
                    <div className='sm:text-right'>
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusClasses[item.status]}`}
                      >
                        {statusLabels[item.status]}
                      </span>
                      <p className='mt-1.5 text-xs text-[#616161]'>{getDueLabel(item)}</p>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  )
}

export default Home
