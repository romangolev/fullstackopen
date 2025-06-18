const App = () => {
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
	  <Header course={course} />
      <Content course={course} />
	  <Total number={exercises1 + exercises2 + exercises3} />
	</div>
  )
}

const Content = (props) => {
	return (
	<>
		<p>
			{props.course.parts[0].name} {props.course.parts[0].exercises}
		</p>
		<p>
			{props.course.parts[1].name} {props.course.parts[1].exercises}
		</p>
		<p>
			{props.course.parts[2].name} {props.course.parts[2].exercises}
		</p>
	</>
	)
}

const Part = (props) => {
	return (
	  <p>
        {props.part} {props.exercises}
      </p>
	)
}

const Header = (props) => {

	return (
      <h1>{props.course.name}</h1>
	)
};

const Total = (props) => {
	return (
      <p>Number of exercises {props.number}</p>
	)
}

export default App
