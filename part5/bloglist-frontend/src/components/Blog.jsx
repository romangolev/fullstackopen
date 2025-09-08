import Togglable from './Togglable'

const Blog = ({ blog, user, onLike, onDelete }) => {
	const blogStyle = {
		paddingTop: 9,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}

	const deleteButton = () => (
		<div>
			<button onClick={() => onDelete(blog)}>delete</button>
		</div>
	)

	return (
		<div className='blog' style={blogStyle}>
			<div>
				<span>{blog.title}</span>
				<span> - </span>
				<span>{blog.author}</span>
			</div>
			<Togglable buttonLabelShow="view" buttonLabelHide="hide">
				<div>
					<div>{blog.url}</div>
					<div>
						likes {blog.likes}{' '}
						<button
							id={blog.id}
							onClick={() => onLike(blog)}>
								like
						</button>
					</div>
					<div>{blog.user?.name}</div>
					{ (blog.user?.name === user?.name) ? deleteButton() : null}
				</div>
			</Togglable>
		</div>
	)
}

export default Blog
