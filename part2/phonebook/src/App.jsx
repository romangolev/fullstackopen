import { useState, useEffect } from 'react'
import axios from 'axios'

const Persons = (props) => {
	const filtered = props.persons.filter(person => 
		person.name.toLowerCase().includes(props.search.toLowerCase()))
	
	return(
		<>
			{filtered.map(person => <p>{person.name} {person.number}</p> )}
		</>
	) 
}

const Filter = (props) => {
	return (
		<form>
			<div>filter shown with <input value={props.search} onChange={props.onSearchChange} />
		</div>
		</form>
	)
}

const PersonForm = (props) => {
	
	return (
		<form onSubmit={props.addNote}>
			<div>name: <input value={props.name} onChange={props.onNameChange} /></div>
			<div>number: <input value={props.number} onChange={props.onNumberChange} /></div>
			<div>
				<button type="submit">add</button>
			</div>
		</form>
	)
}

const App = () => {
	const [persons, setPersons] = useState([])
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
				number: newNumber
			}
			setPersons(persons.concat(newObj))
			setNewName('')
			setNewNumber('')
			axios.post('http://localhost:3001/persons', newObj)
				.then(response => {console.log(response)})
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

	useEffect(() => {
		console.log('effect')
		axios.get('http://localhost:3001/persons')
			.then(response => {
				console.log('promise fullfilled')
				setPersons(response.data)
			})
	}, [])

	return (
	<div>
		<h2>Phonebook</h2>
		<Filter search={newSearch} onSearchChange={handleSearchChange} />
		<h3>Add a new</h3>
		<PersonForm name={newName}
					number={newNumber}
					onNameChange={handleNameChange}
					onNumberChange={handleNumberChange}
					addNote={addNote}/>
		<h3>Numbers</h3>
		<Persons persons={persons} search={newSearch} />
	</div>
	)
}

export default App
