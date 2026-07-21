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
    <div className='min-h-full bg-[#F6F6F9] pb-8'>
      <div className='mx-auto flex w-full max-w-[1500px]'>
        <WorkspaceSidebar />

        <section className='min-w-0 flex-1 p-4 sm:p-6 lg:p-8' aria-labelledby='timeline-title'>
          <header>
            <p className='text-xs font-semibold uppercase tracking-[0.16em] text-[#5B5FC7]'>
              Launch schedule
            </p>
            <h1
              id='timeline-title'
              className='mt-2 text-2xl font-semibold tracking-tight text-[#242424] sm:text-3xl'
            >
              Launch timeline
            </h1>
            <p className='mt-2 max-w-2xl text-sm leading-6 text-[#616161]'>
              Review upcoming deadlines and follow work from the launch plan into task details.
            </p>
          </header>

          <section
            className='mt-6 grid overflow-hidden rounded-xl border border-[#E1E1E8] bg-white sm:grid-cols-3'
            aria-label='Timeline summary'
          >
            <div className='border-b border-[#E1E1E8] p-4 sm:border-b-0 sm:border-r sm:p-5'>
              <p className='text-xs uppercase tracking-wide text-[#8A8A8A]'>Next deadline</p>
              <p className='mt-2 text-xl font-semibold text-[#242424]'>
                {nextWorkItem ? getDueLabel(nextWorkItem) : 'No open work'}
              </p>
              <p className='mt-1 truncate text-sm text-[#616161]'>
                {nextWorkItem?.title ?? 'Everything is completed'}
              </p>
            </div>
            <div className='border-b border-[#E1E1E8] p-4 sm:border-b-0 sm:border-r sm:p-5'>
              <p className='text-xs uppercase tracking-wide text-[#8A8A8A]'>Due this week</p>
              <p className='mt-2 text-xl font-semibold text-[#242424]'>{dueThisWeekCount}</p>
              <p className='mt-1 text-sm text-[#616161]'>Open tasks inside the seven-day window</p>
            </div>
            <div className='p-4 sm:p-5'>
              <p className='text-xs uppercase tracking-wide text-[#8A8A8A]'>Active risks</p>
              <p className='mt-2 text-xl font-semibold text-[#242424]'>{atRiskCount}</p>
              <p className='mt-1 text-sm text-[#616161]'>Items that still need a decision</p>
            </div>
          </section>

          <div className='mt-6 space-y-4'>
            {timelineGroups.map((group) => (
              <section
                key={group.id}
                className='overflow-hidden rounded-xl border border-[#E1E1E8] bg-white shadow-sm'
                aria-labelledby={`${group.id}-title`}
              >
                <div className='flex items-start justify-between gap-4 border-b border-[#E1E1E8] px-4 py-4 sm:px-5'>
                  <div>
                    <h2 id={`${group.id}-title`} className='font-semibold text-[#242424]'>
                      {group.title}
                    </h2>
                    <p className='mt-1 text-sm text-[#616161]'>{group.description}</p>
                  </div>
                  <span className='rounded-full bg-[#F0F0F5] px-2.5 py-1 text-xs font-medium text-[#424242]'>
                    {group.items.length}
                  </span>
                </div>

                {group.items.length === 0 ? (
                  <p className='px-5 py-8 text-sm text-[#616161]' role='status'>
                    No work is scheduled in this window.
                  </p>
                ) : (
                  <div className='divide-y divide-[#ECECF1]'>
                    {group.items.map((item) => (
                      <article
                        key={item.id}
                        className={`
                          grid gap-4 px-4 py-4 sm:grid-cols-[100px_minmax(0,1fr)_120px]
                          sm:items-center sm:px-5
                        `}
                      >
                        <div>
                          <p className='text-[11px] uppercase tracking-wide text-[#8A8A8A]'>Timing</p>
                          <p className='mt-1 text-sm font-medium text-[#424242]'>
                            {getDueLabel(item)}
                          </p>
                        </div>
                        <div className='min-w-0'>
                          <h3>
                            <Link
                              to={`/van-ardsel/workstreams/${item.workstreamId}/tasks/${item.id}`}
                              className='font-medium text-[#242424] hover:text-[#5B5FC7] hover:underline'
                            >
                              {item.title}
                            </Link>
                          </h3>
                          <p className='mt-1 text-sm text-[#616161]'>
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
