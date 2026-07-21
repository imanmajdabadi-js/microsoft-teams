import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter, useLocation } from 'react-router-dom'
import AssignedToMe from '.'

const CurrentSearch = () => {
  const { search } = useLocation()

  return <span data-testid='current-search'>{search}</span>
}

test('filters assigned work and keeps the selected filter in the URL', () => {
  render(
    <MemoryRouter initialEntries={['/van-ardsel/assigned-to-me']}>
      <AssignedToMe />
      <CurrentSearch />
    </MemoryRouter>,
  )

  expect(screen.getByText('3 of 3 assigned tasks')).toBeInTheDocument()

  fireEvent.click(screen.getByRole('button', { name: 'At risk' }))

  expect(screen.getByTestId('current-search')).toHaveTextContent('?status=at-risk')
  expect(screen.getByText('1 of 3 assigned tasks')).toBeInTheDocument()
  expect(
    screen.getByRole('link', { name: 'Fix checkout analytics events' }),
  ).toBeInTheDocument()
  expect(screen.queryByText('Prepare launch email sequence')).not.toBeInTheDocument()
})
