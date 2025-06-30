import { useState } from 'react'


const DisplayPhonebook = (props) => {
	const filtered = props.persons.filter(person => 
		person.name.toLowerCase().includes(props.search.toLowerCase()))
	
	return(
		<>
			<h2>Numbers</h2>
			{filtered.map(person => <p>{person.name} {person.number}</p> )}
		</>
	) 
}

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '040-123456', id: 1 },
		{ name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
		{ name: 'Dan Abramov', number: '12-43-234345', id: 3 },
		{ name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
	])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [newSearch, setNewSearch] = useState('')
	
	const checkName = () => {
		const find = persons.find(person => person.name === newName)
		return find
	}

	const addNote = (event) => {
		event.preventDefault()
		const newarr = persons.filter(checkName)
		if (newarr.length > 0){
			alert(`${newName} is already added to phonebook`)
		} else {
			const newObj = {
				name: newName,
				number: newNumber,
				id: String(persons.length + 1)
			}
			setPersons(persons.concat(newObj))
			setNewName('')
			setNewNumber('')
		}
	}

	const handleNameChange = (event) => {
		setNewName(event.target.value)
	}

	const handleNumberChange = (event) => {
		setNewNumber(event.target.value)
	}

	const handleSearchChange = (event) => {
		setNewSearch(event.target.value)
	}

	return (
	<div>
		<h2>Phonebook</h2>
		<form>
			<div>filter shown with <input value={newSearch} onChange={handleSearchChange} /> </div>
		</form>
		<h2>Add a new</h2>
		<form onSubmit={addNote}>
			<div>name: <input value={newName} onChange={handleNameChange} /></div>
			<div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
			<div>
				<button type="submit">add</button>
			</div>
		</form>
		<DisplayPhonebook persons={persons} search={newSearch} />
	</div>
	)
}

export default App
