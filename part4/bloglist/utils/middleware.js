const jwt = require('jsonwebtoken')
const User = require('../models/user')

const errorHandler = (error, request, response, next) => {
	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' })
	} 
	
	if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message })
	}

	if (error.name === 'MongoServerError' && error.code == 11000) {
		return response.status(400).json({ error: 'expected `username` to be unique' })
	}

	if (error.name === 'JsonWebTokenError') {
		return response.status(401).json({ error: 'token invalid' })
	}

  next(error)
}

const tokenExtractor = (request, response, next) => {
	const authorization = request.get('authorization')
		|| request.headers.authorization
	if (authorization && authorization.toLowerCase().startsWith('bearer ')){
		request.token = authorization.substring(7)
	} else {
		request.token = null
	} 
	next()
}

const userExtractor = async (request, response, next) => {
    try {
		if (!request.token) {
			return  result.status(401).json({ error: 'token missing' })
		}
	
		const decodedToken = jwt.verify(request.token, process.env.SECRET)
		
		if (!decodedToken?.id) {
				return response.status(401).json({ error: 'token invalid' })
	 	}
		const user = await User.findById(decodedToken.id)
		
		if (!user) {
			return response.status(401).json({ error: 'no users in DB' })
		}
	
		request.user = user
		return next()
	} catch (err) {
		return next(err)
	}
}

module.exports = {
	tokenExtractor,
	userExtractor,
	errorHandler
}
