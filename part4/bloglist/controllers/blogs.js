const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
	const { title, author, url, likes } = request.body
	if (!title || !url) {
		return response
			.status(400).json({
			error: 'title or url are missing'
		})
	}
	const blog = new Blog(request.body)
	const saved = await blog.save()
    response.status(201).json(saved)
})

module.exports = blogsRouter
