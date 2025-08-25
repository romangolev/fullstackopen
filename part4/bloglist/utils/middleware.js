
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


module.exports = errorHandler
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

module.exports = {
	tokenExtractor,
	errorHandler
}
