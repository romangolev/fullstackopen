const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())
morgan.token('body', function (req, res) {
	if (req.method === 'POST'){
		return JSON.stringify(req.body)
	} else {
		return ''
	}
} )
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

app.get('/', (request, response) => {
	response.send('<h1>Hello world!</h1>')
})

app.get('/api/persons', (request, response) => {
	response.json(persons)
})

app.get('/api/persons/:uid', (request, response) => {
	const elem = persons.filter(el => el.id === request.params.uid)
	if (elem.length){
		response.json(elem)
	} else {
		return response.status(400).send({
			message: 'Contact with this id does not exist'
		})
	}
})

app.delete('/api/persons/:uid', (request, response) => {
	const person = persons.find(elem => elem.id === request.params.uid)
	if (person){
		persons = persons.filter(prs => prs.id !== request.params.uid)
		response.json(person)
	} else {
		return response.status(400).send({
			message: 'Cannot delete a contact that does not exist'
		})
	}
})

app.post('/api/persons', (request, response) => {
	if (!request.body || !request.body.name || !request.body.number){
		return response.status(400).send({
			message: 'Name or number is missing'
		})
	}
	if (persons.find(person => person.name === request.body.name)){
		return response.status(400).send({
			message: 'Name already exists in phonebook. It should be unique'
		})
	}
	const newPerson = {
		name: request.body.name,
		number: request.body.number,
		id: String(Math.ceil(Math.random()*3000))
	}
	persons = persons.concat(newPerson)
	response.status(201).json(newPerson)
})

app.get('/info', (request, response) => {
	response.send(`Phonebook has info for ${persons.length} people </br> ${new Date()}`)
})

const PORT = 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
