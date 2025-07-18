require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const Person = require('./models/person')

app.use(express.json())
app.use(express.static('dist'))
morgan.token('body', function (req, res) {
	if (req.method === 'POST'){
		return JSON.stringify(req.body)
	} else {
		return ''
	}
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response, next) => {
	Person.find({})
		.then(persons => {
			response.json(persons.map(person => person.toJSON()) )
		})
		.catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
	Person.findById(request.params.id)
		.then(person => {
			if (person){
				response.json(person.toJSON() )
			} else {
				response.status(404).end()
			}
		})
		.catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
	Person.findByIdAndDelete(request.params.id)
		.then(result => {
			if (result) {
				response.status(204).end()
			} else {
				response.status(400).send({
					message: 'Entry not found'
				})
			}
		})
		.catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
	const body = request.body
	if (!body || !body.name || !body.number){
		return response.status(400).send({
			message: 'Name or number is missing'
		})
	}

	const person = new Person({
		name: body.name, 
		number: body.number,
	})

	person.save()
		.then(result => {
			response.status(201).json(result)
		})
		.catch(error => next(error))
})

app.get('/info', (request, response) => {
	response.send(`Phonebook has info for ${persons.length} people </br> ${new Date()}`)
})

const errorHandler = (error, request, response, next) => {
	console.error(error.message)

	if (error.name === 'CastError'){
		return response.status(400).send({ error: 'malformatted id' })
	}

	next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
