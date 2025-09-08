import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('render content', () => {
	const blog = {
		title: 'Mars settlement',
		author: 'Elon Musk',
		url: 'https://nasa.gov.com',
		likes: 9
	}

	render(<Blog blog={blog} />)

	const title = screen.getByText('Mars settlement')
	expect(title).toBeDefined()
	const author = screen.getByText('Elon Musk')
	expect(author).toBeDefined()
	expect(screen.queryByText('https://nasa.gov.com')).not.toBeVisible()
	expect(screen.queryByText(/likes/i)).not.toBeVisible()
})
