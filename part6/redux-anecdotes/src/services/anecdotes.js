import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  console.log(response)  
  if (response.status !== 200) {
    throw new Error('Failed to fetch anecdotes')
  }
  return response.data
}

const createNew = async (content) => {
  const newAnecdote = {
    content,
    votes: 0
  }

  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newAnecdote),
  }
  const response = await fetch(baseUrl, options)

  if (!response.ok){
    throw new Error('Failed to fetch anecdotes')
  }
  return await response.json()
}

export default { getAll, createNew }
