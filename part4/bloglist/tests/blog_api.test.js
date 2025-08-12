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

after(async () => {
  await mongoose.connection.close()
})
