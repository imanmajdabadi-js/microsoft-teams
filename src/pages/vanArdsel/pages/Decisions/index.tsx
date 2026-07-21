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
    <article className='overflow-hidden rounded-xl border border-[#E1E1E8] bg-white shadow-sm'>
      <div className='border-b border-[#ECECF1] p-4 sm:p-5'>
        <div className='flex flex-wrap items-center justify-between gap-3'>
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
              isDecided
                ? 'bg-[#E7F5EF] text-[#0F6C4D]'
                : 'bg-[#FFF4CE] text-[#8A5700]'
            }`}
          >
            {isDecided ? 'Outcome recorded' : 'Waiting for input'}
          </span>
          <span className='text-xs text-[#616161]'>Requested from {decision.requestedFrom}</span>
        </div>
        <h2 className='mt-4 text-base font-semibold leading-6 text-[#242424]'>
          {decision.title}
        </h2>
        <p className='mt-2 text-sm leading-6 text-[#616161]'>{decision.context}</p>
        {relatedTask && (
          <Link
            to={`/van-ardsel/workstreams/${relatedTask.workstreamId}/tasks/${relatedTask.id}`}
            className='mt-3 inline-flex text-sm font-medium text-[#5B5FC7] hover:underline'
          >
            Review linked task
          </Link>
        )}
      </div>

      <form className='p-4 sm:p-5' onSubmit={handleSubmit}>
        <label
          htmlFor={`decision-${decision.id}`}
          className='text-sm font-medium text-[#242424]'
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
          className={`mt-2 w-full resize-y rounded-lg border border-[#C7C7CF] px-3 py-2 text-sm
            leading-6 text-[#242424] outline-none focus:border-[#5B5FC7]
            focus:ring-2 focus:ring-[#5B5FC7]/20`}
        />
        <div className='mt-3 flex flex-wrap items-center justify-between gap-3'>
          <p
            className={`text-xs ${
              message.startsWith('Add') ? 'text-[#A4262C]' : 'text-[#0F6C4D]'
            }`}
            role={message.startsWith('Add') ? 'alert' : 'status'}
          >
            {message}
          </p>
          <button
            type='submit'
            className='rounded-lg bg-[#5B5FC7] px-4 py-2 text-sm font-medium text-white hover:bg-[#4F52B2]'
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
    <div className='min-h-full bg-[#F6F6F9] pb-8'>
      <div className='mx-auto flex w-full max-w-[1500px]'>
        <WorkspaceSidebar />

        <section className='min-w-0 flex-1 p-4 sm:p-6 lg:p-8' aria-labelledby='decisions-title'>
          <header>
            <p className='text-xs font-semibold uppercase tracking-[0.16em] text-[#5B5FC7]'>
              Launch decisions
            </p>
            <h1
              id='decisions-title'
              className='mt-2 text-2xl font-semibold tracking-tight text-[#242424] sm:text-3xl'
            >
              Decision log
            </h1>
            <p className='mt-2 max-w-2xl text-sm leading-6 text-[#616161]'>
              Keep blockers, requested input, and agreed outcomes visible to the launch team.
            </p>
          </header>

          <section
            className='mt-6 grid overflow-hidden rounded-xl border border-[#E1E1E8] bg-white sm:grid-cols-3'
            aria-label='Decision summary'
          >
            <div className='border-b border-[#E1E1E8] p-4 sm:border-b-0 sm:border-r sm:p-5'>
              <p className='text-xs uppercase tracking-wide text-[#8A8A8A]'>Tracked</p>
              <p className='mt-2 text-xl font-semibold text-[#242424]'>{decisions.length}</p>
              <p className='mt-1 text-sm text-[#616161]'>Launch decisions in this workspace</p>
            </div>
            <div className='border-b border-[#E1E1E8] p-4 sm:border-b-0 sm:border-r sm:p-5'>
              <p className='text-xs uppercase tracking-wide text-[#8A8A8A]'>Waiting for input</p>
              <p className='mt-2 text-xl font-semibold text-[#242424]'>{pendingCount}</p>
              <p className='mt-1 text-sm text-[#616161]'>Blockers that still need direction</p>
            </div>
            <div className='p-4 sm:p-5'>
              <p className='text-xs uppercase tracking-wide text-[#8A8A8A]'>Outcomes recorded</p>
              <p className='mt-2 text-xl font-semibold text-[#242424]'>{decidedCount}</p>
              <p className='mt-1 text-sm text-[#616161]'>Decisions available for follow-up</p>
            </div>
          </section>

          <aside className='mt-4 rounded-lg border border-[#D8D8F0] bg-[#F7F7FF] px-4 py-3 text-sm leading-6 text-[#424242]'>
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
