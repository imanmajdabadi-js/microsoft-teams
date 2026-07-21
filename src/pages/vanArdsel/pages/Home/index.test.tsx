import { fireEvent, render, screen } from '@testing-library/react'
import Home from '.'

test('filters at-risk work and searches by owner', () => {
  render(<Home />)

  expect(screen.getByText('8 of 8 work items')).toBeInTheDocument()

  fireEvent.click(screen.getByRole('button', { name: 'At risk' }))

  expect(screen.getByText('2 of 8 work items')).toBeInTheDocument()
  expect(screen.getByText('Review spring campaign numbers')).toBeInTheDocument()
  expect(screen.queryByText('Approve retail partner deck')).not.toBeInTheDocument()

  fireEvent.change(screen.getByRole('searchbox', { name: 'Search tasks or owners' }), {
    target: { value: 'You' },
  })

  expect(screen.getByText('1 of 8 work items')).toBeInTheDocument()
  expect(screen.getByText('Fix checkout analytics events')).toBeInTheDocument()
  expect(screen.queryByText('Review spring campaign numbers')).not.toBeInTheDocument()
})
