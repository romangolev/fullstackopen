import Blog from '../components/Blog'

const BlogForm = ({ blogs, user, handleLike, handleDelete }) => {
	return (
		<>
			<div>
		 		{blogs.map(blog =>
					<Blog
						key={blog.id}
						blog={blog}
						user={user}
						onLike={handleLike}
						onDelete={handleDelete} />
				)}
		    </div>
		</>)
}

export default BlogForm
