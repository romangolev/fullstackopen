import { useState } from 'react'

const StatisticLine = (props) => {
	const {text, value} = props
	return (
		<tr>
			<td>{text}</td>
			<td>{value}</td>
		</tr>
	)
}

const Button = (props) => {
	const {handleOnClick, text} = props
	return (
		<button onClick={handleOnClick} >{text}</button>
	)
}

const Statistics = (props) => {
	const {good, neutral, bad} = props
	const all = good + neutral + bad
	const average = (good - bad)/all
	const positive = good/all*100
	if (good === 0 && neutral ===0 && bad ===0){
		return (<p>No feedback given</p>)	
	} else {
		return (
			<>
				<h1>statistics</h1>
				<table>
					<tbody>
						<StatisticLine text="good" value={good} />
						<StatisticLine text="neutral" value={neutral} />
						<StatisticLine text="bad" value={bad} />
						<StatisticLine text="all" value={all} />
						<StatisticLine text="average" value={average} />
						<StatisticLine text="positive" value={positive + " %"} />
					</tbody>
				</table>
			</>
		)
	}
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
	
  const all = good + neutral + bad
  const average = (good - bad)/all
  const positive = good/all*100
  return (
    <div>
		<h1>give feedback</h1>
		<Button handleOnClick={()=>{setGood(good+1)}} text="good" />
		<Button handleOnClick={()=>{setNeutral(neutral+1)}} text="neutral" />
		<Button handleOnClick={()=>{setBad(bad+1)}} text="bad" />
		<Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
