const config = require('./utils/config')
const mongoose = require('mongoose')
const express = require('express')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const errorHandler = require('./controllers/errors')
const app = express()

app.use(express.json())
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use(errorHandler)

mongoose.connect(config.MONGODB_URI)

module.exports = app
