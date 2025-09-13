const _ = require('lodash');

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

const mostBlogs = (blogs) => {
	 if (!Array.isArray(blogs) || blogs.length === 0) return null;

	  const top = _(blogs)
	    .groupBy('author')
	    .map((arr, author) => ({ author, blogs: arr.length }))
	    .maxBy('blogs');

	 return top || null;
};

const mostLikes = (blogs) => {
	 if (!Array.isArray(blogs) || blogs.length === 0) return null;

	  const top = _(blogs)
	    .groupBy('author')
	    .map((arr, author) => ({ author, likes: _.sumBy(arr, (b) => Number(b.likes) || 0) }))
	    .maxBy('likes');

	 return top || null;
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes
}
