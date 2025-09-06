import Togglable from './Togglable'
import blogService from '../services/blogs'

const Blog = ({ blog, onLike }) => {
	const blogStyle = {
		paddingTop: 9,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}
	
	return (
	<div style={blogStyle}>
		<div>
			{blog.title} {blog.author}
		</div>
		<Togglable buttonLabelShow="view" buttonLabelHide="hide">
			<div>
			<div>{blog.url}</div>
			<div>
				likes {blog.likes}{' '}
				<button id={blog.id} onClick={() => onLike(blog)}>like</button>
			</div>
			<div>{blog.user?.name}</div>
			</div>
		</Togglable>
	</div>
)}

export default Blog
