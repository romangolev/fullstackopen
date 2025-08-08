const dummy = (blogs) => {
	return 1
}

const totalLikes = (bloglist) => {
	const likes = bloglist.reduce(((acc, blog) => acc + blog.likes), 0)
	return likes
}

const favoriteBlog = (bloglist) => {
	if (bloglist.length === 0 || !Array.isArray(bloglist)){
		return null;
	}
	return favorites = bloglist.reduce((max, current) => {
		return current.likes > max.likes ? current : max;
	});
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog 
}
