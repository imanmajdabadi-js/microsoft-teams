import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, useLocation } from 'react-router-dom'
import App from './App'
import { WORK_STATUS_STORAGE_KEY } from './pages/vanArsdel/context/workspaceContext'

jest.mock('@/hooks/useDevice', () => ({
  __esModule: true,
  default: () => ({
    isTabletOrMobile: false,
    isDesktopOrLaptop: true,
    isBigScreen: false,
    isPortrait: false,
    isRetina: false,
  }),
}))

const CurrentPath = () => {
  const { pathname } = useLocation()

  return <span data-testid='current-path'>{pathname}</span>
}

beforeEach(() => {
  window.localStorage.clear()
})

test('redirects the root route to Van Arsdel home', async () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
      <CurrentPath />
    </MemoryRouter>,
  )

  await waitFor(() => {
    expect(screen.getByTestId('current-path')).toHaveTextContent('/van-arsdel/home')
  })
})

test('redirects the legacy workspace chat route to the corrected decision log', async () => {
  render(
    <MemoryRouter initialEntries={['/van-ardsel/chat']}>
      <App />
      <CurrentPath />
    </MemoryRouter>,
  )

  await waitFor(() => {
    expect(screen.getByTestId('current-path')).toHaveTextContent('/van-arsdel/decisions')
  })

  expect(screen.getByRole('heading', { name: 'Decision log' })).toBeInTheDocument()
})

test('shows a recovery action instead of an unfinished shell page', () => {
  render(
    <MemoryRouter initialEntries={['/activity']}>
      <App />
    </MemoryRouter>,
  )

  expect(
    screen.getByRole('heading', { name: 'This workspace page is unavailable' }),
  ).toBeInTheDocument()
  expect(screen.queryByRole('heading', { name: 'Activity' })).not.toBeInTheDocument()
})

test('renders a task through the nested workstream route', () => {
  render(
    <MemoryRouter
      initialEntries={[
        '/van-arsdel/workstreams/spring-campaign/tasks/review-campaign-numbers',
      ]}
    >
      <App />
    </MemoryRouter>,
  )

  expect(
    screen.getByRole('heading', { name: 'Review spring campaign numbers' }),
  ).toBeInTheDocument()
  expect(screen.getByText('Decision needed')).toBeInTheDocument()
})

test('shows a recovery action for an invalid nested task route', () => {
  render(
    <MemoryRouter
      initialEntries={['/van-arsdel/workstreams/spring-campaign/tasks/missing-task']}
    >
      <App />
    </MemoryRouter>,
  )

  expect(screen.getByRole('heading', { name: 'Task not found' })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'Back to launch overview' })).toHaveAttribute(
    'href',
    '/van-arsdel/home',
  )
})

test('persists a task status update on the device', async () => {
  const taskPath = '/van-arsdel/workstreams/spring-campaign/tasks/review-campaign-numbers'
  const firstRender = render(
    <MemoryRouter initialEntries={[taskPath]}>
      <App />
    </MemoryRouter>,
  )

  fireEvent.change(screen.getByRole('combobox', { name: 'Update status' }), {
    target: { value: 'completed' },
  })

  await waitFor(() => {
    const savedStatuses = JSON.parse(
      window.localStorage.getItem(WORK_STATUS_STORAGE_KEY) ?? '[]',
    )

    expect(savedStatuses).toContainEqual({
      id: 'review-campaign-numbers',
      status: 'completed',
    })
  })

  firstRender.unmount()

  render(
    <MemoryRouter initialEntries={[taskPath]}>
      <App />
    </MemoryRouter>,
  )

  expect(screen.getByRole('combobox', { name: 'Update status' })).toHaveValue('completed')
  expect(screen.getByText('Closed with task')).toBeInTheDocument()
})
