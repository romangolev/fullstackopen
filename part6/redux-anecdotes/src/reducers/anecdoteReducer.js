import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        vote(state, action) {
            const id = action.payload
            const anecdoteToChange = state.find(a => a.id === id)
            if (anecdoteToChange) {
                anecdoteToChange.votes += 1
            }
        },
        createAnecdote(state, action) {
            state.push(asObject(action.payload))
        },
        setAnecdotes(state, action) {
            return action.payload
        }
    }
})

export const { vote, createAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
    return async (dispatch) => {
        const anecdotes = await anecdoteService.getAll()
        dispatch(setAnecdotes(anecdotes))
    }
}

export const createAnecdoteAsync = (content) => {
    return async (dispatch) => {
      const response = await anecdoteService.createNew(content)
      dispatch(createAnecdote(response.content))
    }
}

export default anecdoteSlice.reducer
