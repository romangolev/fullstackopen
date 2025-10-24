import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

export const AnecdoteList = () => {
    const dispatch = useDispatch()

    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)

    const anecdotesToShow = (filter === ''
        ? anecdotes
        : anecdotes.filter(a =>
              a.content.toLowerCase().includes(filter.toLowerCase())
          )
    )

    const sortedAnecdotes = [...anecdotesToShow].sort((a, b) => b.votes - a.votes)
    const handleVote = (anecdote) => {
        dispatch(voteAnecdote(anecdote.id))
        dispatch(showNotification(`you voted for "${anecdote.content}"`, 5))
    }

    return (
        <>
            {sortedAnecdotes.map(anecdote => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => handleVote(anecdote)}>vote</button>
                    </div>
                </div>
              )
            )}
        </>
    )
}

