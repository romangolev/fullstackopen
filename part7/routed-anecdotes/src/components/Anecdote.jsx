import { useParams } from 'react-router-dom'

const Anecdote = ({ anecdotes }) => {
    const { id } = useParams()
    const anecdote = anecdotes.find(a => a.id === Number(id))

    if (!anecdote) {
        return <div>Anecdote not found.</div>
    }

    return (
        <div>
            <h2>{anecdote.content}</h2>
            <div>Author: {anecdote.author}</div>
            <div>Votes: {anecdote.votes}</div>
            <br />
            <a href={anecdote.info}>{anecdote.info}</a>
        </div>
    )
}

export default Anecdote
