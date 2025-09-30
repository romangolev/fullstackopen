import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

export const AnecdoteList = () => {
    const dispatch = useDispatch()

    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)

    const anecdotesToShow = (filter === ''
        ? anecdotes
        : anecdotes.filter(a =>
              a.content.toLowerCase().includes(filter.toLowerCase())
          )
    ).slice().sort((a, b) => b.votes - a.votes)

    const handleVote = (id) => {
        dispatch(vote(id))
    }

    return (
        <>
            {anecdotesToShow.map(anecdote => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => handleVote(anecdote.id)}>vote</button>
                    </div>
                </div>
            ))}
        </>
    )
}

