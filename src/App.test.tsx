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
