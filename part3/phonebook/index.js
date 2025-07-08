const express = require('express')
const app = express()

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

app.get('/info', (request, response) => {
	response.send(`Phonebook has info for ${persons.length} people </br> ${new Date()}`)
})

const PORT = 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
