import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import { useNotify } from '../context/NotificationCoxtext'

const AnecdoteForm = () => {
    const queryClient = useQueryClient()
    const notify = useNotify()

    const newAnecdoteMutation = useMutation({
        mutationFn: createAnecdote,
        onSuccess: (newAnecdote) => {
            queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
            notify(`you added '${newAnecdote.content}'`)
        },
        onError: () => {
            notify('anecdote must be at least 5 characters')
        }
    })

    const onCreate = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value.trim()
        event.target.anecdote.value = ''

        if (content.length < 5) {
            notify('anecdote must be at least 5 characters')
            return
        }

        newAnecdoteMutation.mutate({ content, votes: 0 })
    }

    return (
        <div>
            <h3>create new</h3>
            <form onSubmit={onCreate}>
                <input name="anecdote" />
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm
