import { useDispatch } from 'react-redux'
import { createAnecdoteAsync } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

export const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdoteAsync(content))
        dispatch(showNotification(`you've created "${content}"`, 5))
    }

    return (
        <div>
            <form onSubmit={addAnecdote}>
                <div>
                    <input name="anecdote" />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}
