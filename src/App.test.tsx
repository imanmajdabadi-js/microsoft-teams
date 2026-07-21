import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, useLocation } from 'react-router-dom'
import App from './App'

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

test('redirects the root route to Van Arsdel home', async () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
      <CurrentPath />
    </MemoryRouter>,
  )

  await waitFor(() => {
    expect(screen.getByTestId('current-path')).toHaveTextContent('/van-ardsel/home')
  })
})

test('renders a task through the nested workstream route', () => {
  render(
    <MemoryRouter
      initialEntries={[
        '/van-ardsel/workstreams/spring-campaign/tasks/review-campaign-numbers',
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
      initialEntries={['/van-ardsel/workstreams/spring-campaign/tasks/missing-task']}
    >
      <App />
    </MemoryRouter>,
  )

  expect(screen.getByRole('heading', { name: 'Task not found' })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'Back to launch overview' })).toHaveAttribute(
    'href',
    '/van-ardsel/home',
  )
})
