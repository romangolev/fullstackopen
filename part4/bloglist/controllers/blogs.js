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

blogsRouter.delete('/:id', async (request, response, next) => {
	try {
		const result = await Blog.findByIdAndDelete(request.params.id)
		if (result) {
			return response.status(204).end()
		} else {
			return response.status(404).send({ message: "entry not found"})
		}
	} catch (error) {
		next(error)
	}
})

blogsRouter.put('/:id', async (request, response, next) => {
	try {
		const { title, author, url, likes } = request.body
		if ( !title && !author && !url && !likes ){
			return response.status(400).json({ error: 'Nothing has been provoded' })
		}
		const blog = await Blog.findById(request.params.id)
		if (!blog) {
			return response.send(404).json({ error: 'Blog not found' })
		}
		if (title !== undefined) blog.title = title
		if (author !== undefined) blog.author = author
		if (url !== undefined) blog.url = url
		if (likes !== undefined) blog.likes = likes
		const result = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
		response.json(result.toJSON())
	} catch (error) {
		next(error)
	}
})

module.exports = blogsRouter
