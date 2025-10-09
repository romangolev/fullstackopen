import { createSlice } from '@reduxjs/toolkit'

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
        }
    }
})

export const { vote, createAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer
