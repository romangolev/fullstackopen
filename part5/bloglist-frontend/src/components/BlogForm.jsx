import Blog from '../components/Blog'

const BlogForm = ({ blogs, handleLike }) => {
    return(
	<>
		<div>
		{blogs.map(blog =>
				<Blog key={blog.id} blog={blog} onLike={handleLike} />
			)}
	    </div>
	</>)
}

export default BlogForm
