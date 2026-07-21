import { fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Decisions from '.'
import {
  DECISION_STORAGE_KEY,
  WorkspaceProvider,
} from '../../context/workspaceContext'

beforeEach(() => {
  window.localStorage.clear()
})

const renderDecisionLog = () => {
  return render(
    <MemoryRouter>
      <WorkspaceProvider>
        <Decisions />
      </WorkspaceProvider>
    </MemoryRouter>,
  )
}

test('records a decision outcome and restores it from device storage', async () => {
  const firstRender = renderDecisionLog()
  const decisionCard = screen
    .getByRole('heading', {
      name: 'Which paid media total should be used in the launch report?',
    })
    .closest('article')

  expect(decisionCard).not.toBeNull()

  const decisionForm = within(decisionCard as HTMLElement)

  fireEvent.change(decisionForm.getByRole('textbox', { name: 'Decision outcome' }), {
    target: { value: 'Use the reconciled finance total in the weekly report.' },
  })
  fireEvent.click(decisionForm.getByRole('button', { name: 'Record outcome' }))

  await waitFor(() => {
    const savedDecisions = JSON.parse(
      window.localStorage.getItem(DECISION_STORAGE_KEY) ?? '[]',
    )

    expect(savedDecisions).toContainEqual({
      id: 'confirm-paid-media-total',
      outcome: 'Use the reconciled finance total in the weekly report.',
    })
  })

  expect(decisionForm.getByText('Outcome recorded on this device.')).toBeInTheDocument()

  firstRender.unmount()
  renderDecisionLog()

  const restoredCard = screen
    .getByRole('heading', {
      name: 'Which paid media total should be used in the launch report?',
    })
    .closest('article')

  expect(restoredCard).not.toBeNull()
  expect(
    within(restoredCard as HTMLElement).getByRole('textbox', {
      name: 'Decision outcome',
    }),
  ).toHaveValue('Use the reconciled finance total in the weekly report.')
})

test('keeps the related task available for follow-up', () => {
  renderDecisionLog()

  const decisionCard = screen
    .getByRole('heading', { name: 'Which checkout event name is final?' })
    .closest('article')

  expect(decisionCard).not.toBeNull()
  expect(
    within(decisionCard as HTMLElement).getByRole('link', { name: 'Review linked task' }),
  ).toHaveAttribute(
    'href',
    '/van-ardsel/workstreams/website-refresh/tasks/fix-checkout-analytics',
  )
})
