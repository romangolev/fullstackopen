import { useDispatch } from 'react-redux'
import { AnecdoteForm } from './components/AnecdoteForm'
import { AnecdoteList } from './components/AnecdoteList'
import { Filter } from './components/Filter'
import { Notification } from './components/Notification'

const App = () => {
	const dispatch = useDispatch()
	
	const addAnecdote = (event) => {
		event.preventDefault()
		const content = event.target.anecdote.value
		event.target.anecdote.value = ''
		dispatch(createAnecdote(content))
	}
	
  return (
    <>
      <div>
          <h2>Anecdotes</h2>
          <Filter />
          <Notification />
          <AnecdoteList />
      </div>
      <div>
          <h2>create new</h2>
          <AnecdoteForm />
      </div>
    </>
  )
}

export default App
