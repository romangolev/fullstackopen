const dummy = (blogs) => {
	return 1
}

const totalLikes = (bloglist) => {
	const likes = bloglist.reduce(((acc, blog) => acc + blog.likes), 0)
	return likes
}

module.exports = {
	dummy,
	totalLikes 
}
