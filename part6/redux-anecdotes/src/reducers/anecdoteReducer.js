import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        vote(state, action) {
            const updated = action.payload
            return state.map(a =>
                a.id !== updated.id ? a : updated
            )
        },
        setAnecdotes(state, action) {
            return action.payload
        },
        appendAnecdote(state, action) {
            state.push(action.payload)
        }
    }
})

export const { vote, setAnecdotes, appendAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll()
        dispatch(setAnecdotes(anecdotes))
    }
}

export const createAnecdoteAsync = (content) => {
    return async dispatch => {
        const newAnecdote = await anecdoteService.createNew(content)
        dispatch(appendAnecdote(newAnecdote))
    }
}

export const voteAnecdote = (id) => {
    return async (dispatch, getState) => {
        const anecdote = getState().anecdotes.find(a => a.id === id)
        const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
        const returnedAnecdote = await anecdoteService.update(id, updatedAnecdote)
        dispatch(vote(returnedAnecdote))
    }
}

export default anecdoteSlice.reducer
