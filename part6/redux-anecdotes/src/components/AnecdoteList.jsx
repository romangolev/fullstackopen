import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

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

    const vote = (id) => {
        dispatch(voteAnecdote(id))
    }

    return (
        <>
            {anecdotesToShow.map(anecdote => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            ))}
        </>
    )
}

