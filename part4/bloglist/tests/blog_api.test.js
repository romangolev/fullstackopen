const { test, after } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')

const api = supertest(app)

test.only('correct amount of blogs returned', async () => {
	const res = await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)
	assert.strictEqual(res.body.length, 2)
})

test.only('verify that blog has unique identifier property', async () => {
	const res = await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)

	res.body.forEach(blog => {
		assert.ok(blog.id, 'blog should have an id property');
		assert.strictEqual(blog._id, undefined, 'internal _id for blogshould be undefined');
	})
})

test.only('verify that post request successfully creates new blogpost', async () => {
	const newblog = {
		title: "Test title",
		author: "Linus Torvalds",
		url: "http://canonical.com",
		likes: 100500
	}

	const res = await api
		.post('/api/blogs')
		.send(newblog)
		.expect(201)
		.expect('Content-Type', /application\/json/)

	const updatedBlogs = await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)
	
	const updatedTitles = updatedBlogs.body.map(blog => blog.title)
	assert.ok(updatedTitles.includes('Test title'))
})

test.only('verify that missing likes defaults to 0', async () => {
	const newblog = {
		title: "Test blog without lines",
		author: "Test Author",
		url: "http://example.com"
		// likes are not defined
	}
	const res = await api
		.post('/api/blogs')
		.send(newblog)
		.expect(201)
		.expect('Content-Type', /application\/json/)

	assert.strictEqual(res.body.likes, 0, 'Likes should default to 0')
})

after(async () => {
  await mongoose.connection.close()
})
