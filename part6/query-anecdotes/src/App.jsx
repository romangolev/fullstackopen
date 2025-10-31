import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import { useNotify } from './context/NotificationCoxtext'

const App = () => {
    const notify = useNotify()
    const queryClient = useQueryClient()

    const result = useQuery({
        queryKey: ['anecdotes'],
        queryFn: getAnecdotes,
        retry: false
    })

    const voteAnecdoteMutation = useMutation({
        mutationFn: updateAnecdote,
        onSuccess: (updatedAnecdote) => {
            // update cache so UI updates immediately
            const anecdotes = queryClient.getQueryData(['anecdotes'])
            queryClient.setQueryData(
                ['anecdotes'],
                anecdotes.map(a => a.id !== updatedAnecdote.id ? a : updatedAnecdote)
            )
        }
    })

    const handleVote = (anecdote) => {
        const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
        voteAnecdoteMutation.mutate(updatedAnecdote)
        notify(`you voted '${anecdote.content}'`)
    }

    if (result.isLoading) {
        return <div>loading data...</div>
    }

    if (result.isError) {
        return <div>anecdote service not available due to problems in server</div>
    }

    const anecdotes = result.data

    return (
        <div>
            <h3>Anecdote app</h3>

            <Notification />
            <AnecdoteForm />

            {anecdotes.map((anecdote) => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => handleVote(anecdote)}>vote</button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default App
