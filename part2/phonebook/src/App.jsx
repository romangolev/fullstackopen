import { useState } from 'react'

const App = () => {
	const [persons, setPersons] = useState([
		{
			name: 'Arto Hellas' ,
			id: 1
		}
	]) 
	const [newName, setNewName] = useState('')
	
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
				id: String(persons.length + 1)
			}
			setPersons(persons.concat(newObj))
			setNewName('')
		}
	}
	const handleNoteChange = (event) => {
		setNewName(event.target.value)
	}
	return (
	<div>
		<h2>Phonebook</h2>
		<form onSubmit={addNote}>
			<div>
			name: <input value={newName} onChange={handleNoteChange} />
			</div>
			<div>
				<button type="submit">add</button>
			</div>
		</form>
		<h2>Numbers</h2>
		{persons.map(person => <p>{person.name}</p> )}
	</div>
	)
}

export default App
