import { useState, useEffect } from 'react'
import axios from 'axios'
import perService from './services/persons'
import './index.css'

const Notification = ({notification}) => {
	if (notification === null){
		return null
	}
	return (
	<div className={notification.type}>
		{notification.message}
	</div>
	)
}

const Persons = (props) => {
	const filtered = props.persons.filter(person => 
		person.name.toLowerCase().includes(props.search.toLowerCase()))
	
	return(
		<>
			{filtered.map(person => <p key={person.id}>{person.name} {person.number} <button onClick={() => props.onDelete(person)}>delete</button></p>  )}
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
	const [notificationmsg, setNotificationmsg] = useState(null)

	const addNote = (event) => {
		event.preventDefault()
		const newarr = persons.filter(person => person.name === newName)
		if (newarr.length > 0){
			const res = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
			console.log(newarr)
			if (res === true){
				const newObj = {
					name: newName,
					number: newNumber
				}
				showNotification({
					message:`Updated ${newName} number in the contacts`,
					type:'notification'
				})
				setNewName('')
				setNewNumber('')
				perService
					.update(newarr[0].id, newObj).then(() => fillPersons())
					.catch(error => {
						showNotification({
							message: `Information of ${newarr[0].name} has already been removed from server`,
							type: 'error'
						})
						fillPersons()
					})
			}
		} else {
			const newObj = {
				name: newName,
				number: newNumber
			}
			showNotification({
				message:`Added ${newName}`,
				type:'notification'
			})
			setNewName('')
			setNewNumber('')
			perService.create(newObj).then(() => fillPersons())
		}
	}

	const showNotification = (msg) => {
		setNotificationmsg(msg)
		setTimeout(() => {setNotificationmsg(null)}, 5000)
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
	
	const handleDelete = (person) => {
		const res = window.confirm(`Delete ${person.name} ?`)
		if (res === true){
			perService.deleteObj(person.id)
				.then(() => {
					showNotification({
						message:`Deleted ${person.name} ftom the contacts`,
						type:'notification'
					})
					setPersons(persons.filter(prs => person.id !== prs.id)) })
				.catch(() => {
						showNotification({
							message: `Information of ${person.name} has already been removed from server`,
							type: 'error'
						})
						fillPersons()	
				})
				
		}

	}

	const fillPersons = () => {
		perService.getAll()
			.then(data => {
				setPersons(data)
			})
	}
	useEffect(() => {
		fillPersons()
	}, [])

	return (
	<div>
		<h2>Phonebook</h2>
		<Notification notification={notificationmsg} />
		<Filter search={newSearch} onSearchChange={handleSearchChange} />
		<h3>Add a new</h3>
		<PersonForm name={newName}
					number={newNumber}
					onNameChange={handleNameChange}
					onNumberChange={handleNumberChange}
					addNote={addNote}/>
		<h3>Numbers</h3>
		<Persons persons={persons}
				 search={newSearch}
				 onDelete={handleDelete} />
	</div>
	)
}

export default App
