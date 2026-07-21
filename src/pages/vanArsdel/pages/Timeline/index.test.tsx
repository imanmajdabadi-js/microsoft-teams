import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Timeline from '.'
import { WorkspaceProvider } from '../../context/workspaceContext'

beforeEach(() => {
  window.localStorage.clear()
})

test('groups launch work by its next deadline', () => {
  render(
    <MemoryRouter>
      <WorkspaceProvider>
        <Timeline />
      </WorkspaceProvider>
    </MemoryRouter>,
  )

  const urgentSection = screen.getByRole('heading', { name: 'Today and tomorrow' }).closest('section')
  const thisWeekSection = screen.getByRole('heading', { name: 'This week' }).closest('section')

  expect(urgentSection).not.toBeNull()
  expect(thisWeekSection).not.toBeNull()
  expect(within(urgentSection as HTMLElement).getByText('Review spring campaign numbers')).toBeInTheDocument()
  expect(within(thisWeekSection as HTMLElement).getByText('Fix checkout analytics events')).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'Confirm product photography' })).toHaveAttribute(
    'href',
    '/van-arsdel/workstreams/creative-assets/tasks/confirm-product-photography',
  )
})
