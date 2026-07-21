import { Link, useParams } from 'react-router-dom'
import Card from '@/components/card'
import WorkspaceSidebar from '../../components/workspaceSidebar'
import WorkStatusBadge from '../../components/workStatusBadge'
import { useWorkspace } from '../../context/workspaceContext'
import { getDueLabel, workstreams } from '../../data/workspaceData'

const WorkstreamPage = () => {
  const { workItems } = useWorkspace()
  const { workstreamId } = useParams()
  const workstream = workstreams.find((item) => item.id === workstreamId)

  if (!workstream) {
    return (
      <section className='min-h-[60vh] bg-[#F6F6F9] px-4 py-16 text-center'>
        <h1 className='text-2xl font-semibold text-[#242424]'>Workstream not found</h1>
        <p className='mt-2 text-sm text-[#616161]'>This workstream is not part of the launch plan.</p>
        <Link
          to='/van-arsdel/home'
          className='mt-5 inline-flex rounded-lg bg-[#5B5FC7] px-4 py-2 text-sm font-medium text-white'
        >
          Back to launch overview
        </Link>
      </section>
    )
  }

  const workstreamItems = workItems.filter((item) => item.workstreamId === workstream.id)
  const completedCount = workstreamItems.filter((item) => item.status === 'completed').length
  const atRiskCount = workstreamItems.filter((item) => item.status === 'at-risk').length
  const completionRate = workstreamItems.length
    ? Math.round((completedCount / workstreamItems.length) * 100)
    : 0

  return (
    <div className='min-h-full bg-[#F6F6F9] pb-8'>
      <div className='mx-auto flex w-full max-w-[1500px]'>
        <WorkspaceSidebar />

        <section
          className='min-w-0 flex-1 p-4 sm:p-6 lg:p-8'
          aria-labelledby='workstream-title'
        >
          <nav className='mb-5 text-sm text-[#616161]' aria-label='Breadcrumb'>
            <Link to='/van-arsdel/home' className='hover:text-[#5B5FC7] hover:underline'>
              Launch overview
            </Link>
            <span className='mx-2' aria-hidden='true'>
              /
            </span>
            <span aria-current='page'>{workstream.title}</span>
          </nav>

          <header className='mb-6'>
            <p className='text-xs font-semibold uppercase tracking-[0.16em] text-[#5B5FC7]'>
              {workstream.group}
            </p>
            <h1
              id='workstream-title'
              className='mt-2 text-2xl font-semibold tracking-tight text-[#242424] sm:text-3xl'
            >
              {workstream.title}
            </h1>
            <p className='mt-2 max-w-2xl text-sm leading-6 text-[#616161]'>
              {workstream.description}
            </p>
            <p className='mt-3 text-sm text-[#424242]'>
              Workstream lead: <span className='font-medium'>{workstream.lead}</span>
            </p>
          </header>

          <section className='grid gap-3 sm:grid-cols-3' aria-label='Workstream summary'>
            <Card
              title='Progress'
              value={`${completionRate}%`}
              description={`${completedCount} of ${workstreamItems.length} items completed`}
              accent='indigo'
              progress={completionRate}
            />
            <Card
              title='Open work'
              value={String(workstreamItems.length - completedCount)}
              description='Items still moving in this workstream'
              accent='teal'
            />
            <Card
              title='At risk'
              value={String(atRiskCount)}
              description='Items that need follow-up or a decision'
              accent='rose'
            />
          </section>

          <section className='mt-6 overflow-hidden rounded-xl border border-[#E1E1E8] bg-white shadow-sm'>
            <div className='border-b border-[#E1E1E8] px-4 py-4 sm:px-5'>
              <h2 className='font-semibold text-[#242424]'>Workstream tasks</h2>
              <p className='mt-1 text-sm text-[#616161]'>
                Open a task to review its owner, timing, and blockers.
              </p>
            </div>

            {workstreamItems.length === 0 ? (
              <div className='px-5 py-12 text-center' role='status'>
                <p className='font-medium text-[#242424]'>No tasks in this workstream</p>
                <p className='mt-1 text-sm text-[#616161]'>
                  Tasks will appear here when they are added.
                </p>
              </div>
            ) : (
              <div className='divide-y divide-[#ECECF1]'>
                {workstreamItems.map((item) => (
                  <article
                    key={item.id}
                    className='grid gap-4 px-4 py-4 sm:grid-cols-[minmax(0,1fr)_120px_120px] sm:items-center sm:px-5'
                  >
                    <div className='min-w-0'>
                      <h3>
                        <Link
                          to={`tasks/${item.id}`}
                          className='font-medium text-[#242424] hover:text-[#5B5FC7] hover:underline'
                        >
                          {item.title}
                        </Link>
                      </h3>
                      <p className='mt-1 text-sm text-[#616161]'>{item.description}</p>
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

export default WorkstreamPage
