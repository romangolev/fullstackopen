const { test, after } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')

const api = supertest(app)

test.only('correct amount of blogs returned', async () => {
  const res = await api
    .get('/api/blogs')
	console.log(res.body)
	assert.strictEqual(res.body.length, 2)
})

after(async () => {
  await mongoose.connection.close()
})
