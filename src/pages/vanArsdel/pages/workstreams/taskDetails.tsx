import { Link, useParams } from 'react-router-dom'
import WorkspaceSidebar from '../../components/workspaceSidebar'
import WorkStatusBadge from '../../components/workStatusBadge'
import { useWorkspace } from '../../context/workspaceContext'
import { WorkPriority, WorkStatus, getDueLabel, workstreams } from '../../data/workspaceData'

const priorityLabels: Record<WorkPriority, string> = {
  high: 'High',
  medium: 'Medium',
  low: 'Low',
}

const statusOptions: Array<{ label: string; value: WorkStatus }> = [
  { label: 'In progress', value: 'in-progress' },
  { label: 'At risk', value: 'at-risk' },
  { label: 'Completed', value: 'completed' },
]

const TaskDetails = () => {
  const { updateWorkItemStatus, workItems } = useWorkspace()
  const { taskId, workstreamId } = useParams()
  const workstream = workstreams.find((item) => item.id === workstreamId)
  const task = workItems.find(
    (item) => item.id === taskId && item.workstreamId === workstreamId,
  )

  const handleStatusChange = (value: string) => {
    const selectedStatus = statusOptions.find((option) => option.value === value)

    if (task && selectedStatus) {
      updateWorkItemStatus(task.id, selectedStatus.value)
    }
  }

  if (!workstream || !task) {
    return (
      <section className='min-h-[60vh] bg-[#F6F6F9] px-4 py-16 text-center'>
        <h1 className='text-2xl font-semibold text-[#242424]'>Task not found</h1>
        <p className='mt-2 text-sm text-[#616161]'>The requested task does not match this workstream.</p>
        <Link
          to='/van-arsdel/home'
          className='mt-5 inline-flex rounded-lg bg-[#5B5FC7] px-4 py-2 text-sm font-medium text-white'
        >
          Back to launch overview
        </Link>
      </section>
    )
  }

  return (
    <div className='min-h-full bg-[#F6F6F9] pb-8'>
      <div className='mx-auto flex w-full max-w-[1500px]'>
        <WorkspaceSidebar />

        <section className='min-w-0 flex-1 p-4 sm:p-6 lg:p-8' aria-labelledby='task-title'>
          <nav className='mb-5 text-sm text-[#616161]' aria-label='Breadcrumb'>
            <Link to='/van-arsdel/home' className='hover:text-[#5B5FC7] hover:underline'>
              Launch overview
            </Link>
            <span className='mx-2' aria-hidden='true'>
              /
            </span>
            <Link
              to={`/van-arsdel/workstreams/${workstream.id}`}
              className='hover:text-[#5B5FC7] hover:underline'
            >
              {workstream.title}
            </Link>
            <span className='mx-2' aria-hidden='true'>
              /
            </span>
            <span aria-current='page'>Task details</span>
          </nav>

          <article className='overflow-hidden rounded-xl border border-[#E1E1E8] bg-white shadow-sm'>
            <header className='border-b border-[#E1E1E8] px-5 py-5 sm:px-7 sm:py-6'>
              <div className='flex flex-wrap items-start justify-between gap-4'>
                <div className='flex flex-wrap items-center gap-3'>
                  <WorkStatusBadge status={task.status} />
                  <span className='text-xs font-medium uppercase tracking-wide text-[#616161]'>
                    {priorityLabels[task.priority]} priority
                  </span>
                </div>
                <div>
                  <label htmlFor='task-status' className='block text-xs font-medium text-[#616161]'>
                    Update status
                  </label>
                  <select
                    id='task-status'
                    value={task.status}
                    onChange={(event) => handleStatusChange(event.target.value)}
                    className={`
                      mt-1 h-10 rounded-lg border border-[#D1D1D8] bg-white px-3
                      text-sm text-[#242424] outline-none focus:border-[#5B5FC7]
                      focus:ring-2 focus:ring-[#E3E3F7]
                    `}
                  >
                    {statusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <p className='mt-1 text-xs text-[#8A8A8A]'>Saved on this device</p>
                </div>
              </div>
              <h1
                id='task-title'
                className='mt-4 text-2xl font-semibold tracking-tight text-[#242424] sm:text-3xl'
              >
                {task.title}
              </h1>
              <p className='mt-3 max-w-3xl text-sm leading-6 text-[#616161]'>{task.description}</p>
            </header>

            <div className='grid gap-6 px-5 py-6 sm:grid-cols-3 sm:px-7'>
              <div>
                <p className='text-xs uppercase tracking-wide text-[#8A8A8A]'>Owner</p>
                <p className='mt-1 font-medium text-[#242424]'>{task.owner}</p>
              </div>
              <div>
                <p className='text-xs uppercase tracking-wide text-[#8A8A8A]'>Workstream</p>
                <p className='mt-1 font-medium text-[#242424]'>{workstream.title}</p>
              </div>
              <div>
                <p className='text-xs uppercase tracking-wide text-[#8A8A8A]'>Timing</p>
                <p className='mt-1 font-medium text-[#242424]'>{getDueLabel(task)}</p>
              </div>
            </div>

            <section className='border-t border-[#E1E1E8] px-5 py-6 sm:px-7'>
              <h2 className='font-semibold text-[#242424]'>Blocker</h2>
              {task.blocker ? (
                <div
                  className={`mt-3 rounded-lg border p-4 ${
                    task.status === 'completed'
                      ? 'border-[#B7D7C3] bg-[#F2FAF5]'
                      : 'border-[#F3C6C9] bg-[#FFF4F4]'
                  }`}
                >
                  <p
                    className={`text-sm leading-6 ${
                      task.status === 'completed' ? 'text-[#0E5A2B]' : 'text-[#7A1F25]'
                    }`}
                  >
                    {task.blocker}
                  </p>
                  <p
                    className={`mt-2 text-xs font-medium uppercase tracking-wide ${
                      task.status === 'completed' ? 'text-[#107C41]' : 'text-[#A4262C]'
                    }`}
                  >
                    {task.status === 'completed' ? 'Closed with task' : 'Decision needed'}
                  </p>
                </div>
              ) : (
                <p className='mt-2 text-sm text-[#616161]'>No blocker has been reported for this task.</p>
              )}
            </section>
          </article>
        </section>
      </div>
    </div>
  )
}

export default TaskDetails
