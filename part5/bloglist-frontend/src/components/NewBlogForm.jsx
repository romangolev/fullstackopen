import { useState, useRef } from 'react'
import Togglable from './Togglable'

const NewBlogForm = ({ onCreate }) => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')
	const formRef = useRef(null)

	const handleNewblog = async (event) => {
		event.preventDefault()
		onCreate({ title, author, url })
		setTitle('')
		setAuthor('')
		setUrl('')	
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
							name="title"
							value={title}
						    onChange={({ target }) => setTitle(target.value)} />
					</label>
				</div>
				<div>
					<label>
						author:
						<input
							type="text"
							name="author"
							value={author}
						    onChange={({ target }) => setAuthor(target.value)} />
					</label>
				</div>
				<div>
					<label>
						url:
						<input
							type="text"
							name="url"
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
