import { useState } from 'react'

const App = () => {
	const [persons, setPersons] = useState([
		{
			name: 'Arto Hellas' ,
			number: '8 800 800 00 00 ',
			id: 1
		}
	]) 
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	
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

	return (
	<div>
		<h2>Phonebook</h2>
		<form onSubmit={addNote}>
			<div>name: <input value={newName} onChange={handleNameChange} /></div>
			<div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
			<div>
				<button type="submit">add</button>
			</div>
		</form>
		<h2>Numbers</h2>
		{persons.map(person => <p>{person.name} {person.number}</p> )}
	</div>
	)
}

export default App
