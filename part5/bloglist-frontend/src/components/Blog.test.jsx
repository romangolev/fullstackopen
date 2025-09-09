import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('render content', async () => {
	const blog = {
		title: 'Mars settlement',
		author: 'Elon Musk',
		url: 'https://nasa.gov.com',
		likes: 9
	}

	render(<Blog blog={blog} />)

	expect(screen.getByText('Mars settlement')).toBeDefined()
	expect(screen.getByText('Elon Musk') ).toBeDefined()
	expect(screen.queryByText('https://nasa.gov.com')).not.toBeVisible()
	expect(screen.queryByText(/likes/i)).not.toBeVisible()

	await userEvent.click(screen.getByRole('button', { name: /view/i }))
	
	expect(screen.getByText('https://nasa.gov.com')).toBeVisible()
	expect(screen.getByText(/likes\s*9/i)).toBeVisible()
})
