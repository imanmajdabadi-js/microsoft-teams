import { Link } from 'react-router-dom'
import WorkspaceSidebar from '../../components/workspaceSidebar'
import WorkStatusBadge from '../../components/workStatusBadge'
import { useWorkspace } from '../../context/workspaceContext'
import { WorkItem, getDueLabel } from '../../data/workspaceData'

interface TimelineGroup {
  id: string
  title: string
  description: string
  items: WorkItem[]
}

const Timeline = () => {
  const { workItems } = useWorkspace()
  const openWorkItems = workItems.filter((item) => item.status !== 'completed')
  const nextWorkItem = [...openWorkItems].sort((firstItem, secondItem) => {
    return firstItem.dueInDays - secondItem.dueInDays
  })[0]
  const dueThisWeekCount = openWorkItems.filter((item) => item.dueInDays <= 7).length
  const atRiskCount = openWorkItems.filter((item) => item.status === 'at-risk').length

  const timelineGroups: TimelineGroup[] = [
    {
      id: 'urgent',
      title: 'Today and tomorrow',
      description: 'Work that needs immediate attention.',
      items: openWorkItems.filter((item) => item.dueInDays <= 1),
    },
    {
      id: 'this-week',
      title: 'This week',
      description: 'Open work due within the next seven days.',
      items: openWorkItems.filter((item) => item.dueInDays > 1 && item.dueInDays <= 7),
    },
    {
      id: 'later',
      title: 'Later',
      description: 'Planned work beyond the current week.',
      items: openWorkItems.filter((item) => item.dueInDays > 7),
    },
    {
      id: 'completed',
      title: 'Completed',
      description: 'Launch work already closed by the team.',
      items: workItems.filter((item) => item.status === 'completed'),
    },
  ]

  return (
    <div className='min-h-full bg-surface-canvas pb-8'>
      <div className='mx-auto flex w-full max-w-workspace'>
        <WorkspaceSidebar />

        <section className='min-w-0 flex-1 p-4 sm:p-6 lg:p-8' aria-labelledby='timeline-title'>
          <header>
            <p className='text-xs font-semibold uppercase tracking-eyebrow text-brand'>
              Launch schedule
            </p>
            <h1
              id='timeline-title'
              className='mt-2 text-2xl font-semibold tracking-tight text-ink-strong sm:text-3xl'
            >
              Launch timeline
            </h1>
            <p className='mt-2 max-w-2xl text-sm leading-6 text-ink-muted'>
              Review upcoming deadlines and follow work from the launch plan into task details.
            </p>
          </header>

          <section
            className='mt-6 grid overflow-hidden rounded-xl border border-line bg-white sm:grid-cols-3'
            aria-label='Timeline summary'
          >
            <div className='border-b border-line p-4 sm:border-b-0 sm:border-r sm:p-5'>
              <p className='text-xs uppercase tracking-wide text-ink-subtle'>Next deadline</p>
              <p className='mt-2 text-xl font-semibold text-ink-strong'>
                {nextWorkItem ? getDueLabel(nextWorkItem) : 'No open work'}
              </p>
              <p className='mt-1 truncate text-sm text-ink-muted'>
                {nextWorkItem?.title ?? 'Everything is completed'}
              </p>
            </div>
            <div className='border-b border-line p-4 sm:border-b-0 sm:border-r sm:p-5'>
              <p className='text-xs uppercase tracking-wide text-ink-subtle'>Due this week</p>
              <p className='mt-2 text-xl font-semibold text-ink-strong'>{dueThisWeekCount}</p>
              <p className='mt-1 text-sm text-ink-muted'>Open tasks inside the seven-day window</p>
            </div>
            <div className='p-4 sm:p-5'>
              <p className='text-xs uppercase tracking-wide text-ink-subtle'>Active risks</p>
              <p className='mt-2 text-xl font-semibold text-ink-strong'>{atRiskCount}</p>
              <p className='mt-1 text-sm text-ink-muted'>Items that still need a decision</p>
            </div>
          </section>

          <div className='mt-6 space-y-4'>
            {timelineGroups.map((group) => (
              <section
                key={group.id}
                className='overflow-hidden rounded-xl border border-line bg-white shadow-sm'
                aria-labelledby={`${group.id}-title`}
              >
                <div className='flex items-start justify-between gap-4 border-b border-line px-4 py-4 sm:px-5'>
                  <div>
                    <h2 id={`${group.id}-title`} className='font-semibold text-ink-strong'>
                      {group.title}
                    </h2>
                    <p className='mt-1 text-sm text-ink-muted'>{group.description}</p>
                  </div>
                  <span className='rounded-full bg-surface-muted px-2.5 py-1 text-xs font-medium text-ink'>
                    {group.items.length}
                  </span>
                </div>

                {group.items.length === 0 ? (
                  <p className='px-5 py-8 text-sm text-ink-muted' role='status'>
                    No work is scheduled in this window.
                  </p>
                ) : (
                  <div className='divide-y divide-line-subtle'>
                    {group.items.map((item) => (
                      <article
                        key={item.id}
                        className={`
                          grid gap-4 px-4 py-4 sm:grid-cols-timeline-row
                          sm:items-center sm:px-5
                        `}
                      >
                        <div>
                          <p className='text-caption uppercase tracking-wide text-ink-subtle'>Timing</p>
                          <p className='mt-1 text-sm font-medium text-ink'>
                            {getDueLabel(item)}
                          </p>
                        </div>
                        <div className='min-w-0'>
                          <h3>
                            <Link
                              to={`/van-arsdel/workstreams/${item.workstreamId}/tasks/${item.id}`}
                              className='font-medium text-ink-strong hover:text-brand hover:underline'
                            >
                              {item.title}
                            </Link>
                          </h3>
                          <p className='mt-1 text-sm text-ink-muted'>
                            {item.workstream} · {item.owner}
                          </p>
                        </div>
                        <div className='sm:text-right'>
                          <WorkStatusBadge status={item.status} />
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </section>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Timeline
