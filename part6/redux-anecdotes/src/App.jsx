import { useDispatch } from 'react-redux'
import { voteAnecdote, createAnecdote } from './reducers/anecdoteReducer'
import { AnecdoteForm } from './components/AnecdoteForm'
import { AnecdoteList } from './components/AnecdoteList'

const App = () => {
	const dispatch = useDispatch()
	
	const vote = (id) => {
		console.log('vote', id)
		dispatch(voteAnecdote(id))
	}

	const addAnecdote = (event) => {
		event.preventDefault()
		const content = event.target.anecdote.value
		event.target.anecdote.value = ''
		dispatch(createAnecdote(content))
	}
	
  return (
      <div>
          <h2>Anecdotes</h2>
          <AnecdoteForm />
          <AnecdoteList />
      </div>
  )
}

export default App
