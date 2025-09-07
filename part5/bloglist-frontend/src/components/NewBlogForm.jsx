import { useState, useRef } from 'react'
import blogService from '../services/blogs'
import Togglable from './Togglable'

const NewBlogForm = ({ setAllBlogs, showNotification }) => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')
	const formRef = useRef(null)

	const handleNewblog = async (event) => {
		event.preventDefault()
		if (title === '' || author === '' || url === '') {
			showNotification({ message:'title, author or url not specified', type: 'error' })
			return null
		}
		try {
			await blogService.create({ title, author, url })
			setAllBlogs()
			showNotification({ message:`a new blog ${title} added `, type: 'info' })
			setTitle('')
			setAuthor('')
			setUrl('')
		} catch (err) {
			showNotification({ message:`error : ${err} `, type: 'error' })
			console.log(err)
		}
	}

	return (
		<Togglable buttonLabelShow="create new blog" buttonLabelHide="cancel" ref={formRef}>
			<h2>create new</h2>
			<form onSubmit={handleNewblog}>
				<div>
					<label>
						title:
						<input
							type="text"
							value={title}
						    onChange={({ target }) => setTitle(target.value)} />
					</label>
				</div>
				<div>
					<label>
						author:
						<input
							type="text"
							value={author}
						    onChange={({ target }) => setAuthor(target.value)} />
					</label>
				</div>
				<div>
					<label>
						url:
						<input
							type="text"
							value={url}
						    onChange={({ target }) => setUrl(target.value)} />
					</label>
				</div>
				<button type="submit">create</button>
			</form>
		</Togglable>
	)
}

export default NewBlogForm
