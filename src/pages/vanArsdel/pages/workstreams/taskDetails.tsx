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
      <section className='min-h-empty bg-surface-canvas px-4 py-16 text-center'>
        <h1 className='text-2xl font-semibold text-ink-strong'>Task not found</h1>
        <p className='mt-2 text-sm text-ink-muted'>The requested task does not match this workstream.</p>
        <Link
          to='/van-arsdel/home'
          className='mt-5 inline-flex rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white'
        >
          Back to launch overview
        </Link>
      </section>
    )
  }

  return (
    <div className='min-h-full bg-surface-canvas pb-8'>
      <div className='mx-auto flex w-full max-w-workspace'>
        <WorkspaceSidebar />

        <section className='min-w-0 flex-1 p-4 sm:p-6 lg:p-8' aria-labelledby='task-title'>
          <nav className='mb-5 text-sm text-ink-muted' aria-label='Breadcrumb'>
            <Link to='/van-arsdel/home' className='hover:text-brand hover:underline'>
              Launch overview
            </Link>
            <span className='mx-2' aria-hidden='true'>
              /
            </span>
            <Link
              to={`/van-arsdel/workstreams/${workstream.id}`}
              className='hover:text-brand hover:underline'
            >
              {workstream.title}
            </Link>
            <span className='mx-2' aria-hidden='true'>
              /
            </span>
            <span aria-current='page'>Task details</span>
          </nav>

          <article className='overflow-hidden rounded-xl border border-line bg-white shadow-sm'>
            <header className='border-b border-line px-5 py-5 sm:px-7 sm:py-6'>
              <div className='flex flex-wrap items-start justify-between gap-4'>
                <div className='flex flex-wrap items-center gap-3'>
                  <WorkStatusBadge status={task.status} />
                  <span className='text-xs font-medium uppercase tracking-wide text-ink-muted'>
                    {priorityLabels[task.priority]} priority
                  </span>
                </div>
                <div>
                  <label htmlFor='task-status' className='block text-xs font-medium text-ink-muted'>
                    Update status
                  </label>
                  <select
                    id='task-status'
                    value={task.status}
                    onChange={(event) => handleStatusChange(event.target.value)}
                    className={`
                      mt-1 h-10 rounded-lg border border-line-input bg-white px-3
                      text-sm text-ink-strong outline-none focus:border-brand
                      focus:ring-2 focus:ring-brand-soft
                    `}
                  >
                    {statusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <p className='mt-1 text-xs text-ink-subtle'>Saved on this device</p>
                </div>
              </div>
              <h1
                id='task-title'
                className='mt-4 text-2xl font-semibold tracking-tight text-ink-strong sm:text-3xl'
              >
                {task.title}
              </h1>
              <p className='mt-3 max-w-3xl text-sm leading-6 text-ink-muted'>{task.description}</p>
            </header>

            <div className='grid gap-6 px-5 py-6 sm:grid-cols-3 sm:px-7'>
              <div>
                <p className='text-xs uppercase tracking-wide text-ink-subtle'>Owner</p>
                <p className='mt-1 font-medium text-ink-strong'>{task.owner}</p>
              </div>
              <div>
                <p className='text-xs uppercase tracking-wide text-ink-subtle'>Workstream</p>
                <p className='mt-1 font-medium text-ink-strong'>{workstream.title}</p>
              </div>
              <div>
                <p className='text-xs uppercase tracking-wide text-ink-subtle'>Timing</p>
                <p className='mt-1 font-medium text-ink-strong'>{getDueLabel(task)}</p>
              </div>
            </div>

            <section className='border-t border-line px-5 py-6 sm:px-7'>
              <h2 className='font-semibold text-ink-strong'>Blocker</h2>
              {task.blocker ? (
                <div
                  className={`mt-3 rounded-lg border p-4 ${
                    task.status === 'completed'
                      ? 'border-success-300 bg-success-50'
                      : 'border-danger-300 bg-danger-100'
                  }`}
                >
                  <p
                    className={`text-sm leading-6 ${
                      task.status === 'completed' ? 'text-success-900' : 'text-danger-900'
                    }`}
                  >
                    {task.blocker}
                  </p>
                  <p
                    className={`mt-2 text-xs font-medium uppercase tracking-wide ${
                      task.status === 'completed' ? 'text-success-700' : 'text-danger-700'
                    }`}
                  >
                    {task.status === 'completed' ? 'Closed with task' : 'Decision needed'}
                  </p>
                </div>
              ) : (
                <p className='mt-2 text-sm text-ink-muted'>No blocker has been reported for this task.</p>
              )}
            </section>
          </article>
        </section>
      </div>
    </div>
  )
}

export default TaskDetails
