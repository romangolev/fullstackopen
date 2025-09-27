import { useSelector, useDispatch } from 'react-redux'

export const AnecdoteList = () => {
	const anecdotes = useSelector(state => state)

  return (
    <>
      {anecdotes
            .slice()
            .sort((a, b) => b.votes - a.votes)
            .map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )
      }
    </>
  )
}
