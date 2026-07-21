import { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import WorkspaceSidebar from '../../components/workspaceSidebar'
import { useWorkspace } from '../../context/workspaceContext'
import { LaunchDecision, WorkItem } from '../../data/workspaceData'

interface DecisionCardProps {
  decision: LaunchDecision
  relatedTask?: WorkItem
  onSave: (decisionId: string, outcome: string) => void
}

const DecisionCard = ({ decision, relatedTask, onSave }: DecisionCardProps) => {
  const [outcome, setOutcome] = useState(decision.outcome ?? '')
  const [message, setMessage] = useState('')
  const isDecided = Boolean(decision.outcome)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!outcome.trim()) {
      setMessage('Add an outcome before saving.')
      return
    }

    onSave(decision.id, outcome)
    setOutcome(outcome.trim())
    setMessage(isDecided ? 'Outcome updated on this device.' : 'Outcome recorded on this device.')
  }

  return (
    <article className='overflow-hidden rounded-xl border border-line bg-white shadow-sm'>
      <div className='border-b border-line-subtle p-4 sm:p-5'>
        <div className='flex flex-wrap items-center justify-between gap-3'>
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
              isDecided
                ? 'bg-success-100 text-success-800'
                : 'bg-warning-100 text-warning-700'
            }`}
          >
            {isDecided ? 'Outcome recorded' : 'Waiting for input'}
          </span>
          <span className='text-xs text-ink-muted'>Requested from {decision.requestedFrom}</span>
        </div>
        <h2 className='mt-4 text-base font-semibold leading-6 text-ink-strong'>
          {decision.title}
        </h2>
        <p className='mt-2 text-sm leading-6 text-ink-muted'>{decision.context}</p>
        {relatedTask && (
          <Link
            to={`/van-arsdel/workstreams/${relatedTask.workstreamId}/tasks/${relatedTask.id}`}
            className='mt-3 inline-flex text-sm font-medium text-brand hover:underline'
          >
            Review linked task
          </Link>
        )}
      </div>

      <form className='p-4 sm:p-5' onSubmit={handleSubmit}>
        <label
          htmlFor={`decision-${decision.id}`}
          className='text-sm font-medium text-ink-strong'
        >
          Decision outcome
        </label>
        <textarea
          id={`decision-${decision.id}`}
          value={outcome}
          maxLength={240}
          rows={3}
          onChange={(event) => {
            setOutcome(event.target.value)
            setMessage('')
          }}
          placeholder='Record the agreed outcome and next direction.'
          className={`mt-2 w-full resize-y rounded-lg border border-line-strong px-3 py-2 text-sm
            leading-6 text-ink-strong outline-none focus:border-brand
            focus:ring-2 focus:ring-brand/20`}
        />
        <div className='mt-3 flex flex-wrap items-center justify-between gap-3'>
          <p
            className={`text-xs ${
              message.startsWith('Add') ? 'text-danger-700' : 'text-success-800'
            }`}
            role={message.startsWith('Add') ? 'alert' : 'status'}
          >
            {message}
          </p>
          <button
            type='submit'
            className='rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-hover'
          >
            {isDecided ? 'Update outcome' : 'Record outcome'}
          </button>
        </div>
      </form>
    </article>
  )
}

const Decisions = () => {
  const { decisions, workItems, recordDecision } = useWorkspace()
  const decidedCount = decisions.filter((decision) => decision.outcome).length
  const pendingCount = decisions.length - decidedCount

  return (
    <div className='min-h-full bg-surface-canvas pb-8'>
      <div className='mx-auto flex w-full max-w-workspace'>
        <WorkspaceSidebar />

        <section className='min-w-0 flex-1 p-4 sm:p-6 lg:p-8' aria-labelledby='decisions-title'>
          <header>
            <p className='text-xs font-semibold uppercase tracking-eyebrow text-brand'>
              Launch decisions
            </p>
            <h1
              id='decisions-title'
              className='mt-2 text-2xl font-semibold tracking-tight text-ink-strong sm:text-3xl'
            >
              Decision log
            </h1>
            <p className='mt-2 max-w-2xl text-sm leading-6 text-ink-muted'>
              Keep blockers, requested input, and agreed outcomes visible to the launch team.
            </p>
          </header>

          <section
            className='mt-6 grid overflow-hidden rounded-xl border border-line bg-white sm:grid-cols-3'
            aria-label='Decision summary'
          >
            <div className='border-b border-line p-4 sm:border-b-0 sm:border-r sm:p-5'>
              <p className='text-xs uppercase tracking-wide text-ink-subtle'>Tracked</p>
              <p className='mt-2 text-xl font-semibold text-ink-strong'>{decisions.length}</p>
              <p className='mt-1 text-sm text-ink-muted'>Launch decisions in this workspace</p>
            </div>
            <div className='border-b border-line p-4 sm:border-b-0 sm:border-r sm:p-5'>
              <p className='text-xs uppercase tracking-wide text-ink-subtle'>Waiting for input</p>
              <p className='mt-2 text-xl font-semibold text-ink-strong'>{pendingCount}</p>
              <p className='mt-1 text-sm text-ink-muted'>Blockers that still need direction</p>
            </div>
            <div className='p-4 sm:p-5'>
              <p className='text-xs uppercase tracking-wide text-ink-subtle'>Outcomes recorded</p>
              <p className='mt-2 text-xl font-semibold text-ink-strong'>{decidedCount}</p>
              <p className='mt-1 text-sm text-ink-muted'>Decisions available for follow-up</p>
            </div>
          </section>

          <aside className='mt-4 rounded-lg border border-brand-border bg-brand-surface px-4 py-3 text-sm leading-6 text-ink'>
            Recording an outcome does not close its linked task. Update the task after the agreed work is complete.
          </aside>

          <div className='mt-4 grid gap-4 xl:grid-cols-2'>
            {decisions.map((decision) => (
              <DecisionCard
                key={decision.id}
                decision={decision}
                relatedTask={workItems.find((item) => item.id === decision.taskId)}
                onSave={recordDecision}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Decisions
