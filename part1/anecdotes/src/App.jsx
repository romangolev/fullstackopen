import { useState } from 'react'

const Anecdotes = ({anecdote, votes}) => {
	return (
		<div>
			<h1>Anecdote of the day</h1>
			<p>{anecdote}</p>
			<p>has {votes} votes</p>
		</div>
	)	
}

const Buttons = ({onVoteClick, onNextClick}) => {
	return (
		<>
			<button onClick={onVoteClick}>vote</button>
			<button onClick={onNextClick}>next anecdote</button>
		</>
	)
}

const App = () => {
	const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
	]
   
	const [selected, setSelected] = useState(0)
	const [count, setCount] = useState(Array(8).fill(0))
	const handleNextClick = () =>{
		setSelected(Math.floor(Math.random() * 8))
	}
	const handleVoteClick = () =>{
		const copy = [...count]
		copy[selected] += 1
		setCount(copy)
	}
	const maxVotesIndex = count.indexOf(Math.max(...count))
	return (
    <>
		<Anecdotes anecdote={anecdotes[selected]} votes={count[selected]} />
		<Buttons onVoteClick={handleVoteClick} onNextClick={handleNextClick} />
		<Anecdotes anecdote={anecdotes[maxVotesIndex]} votes={count[maxVotesIndex]} />
	</>)
}

export default App
