const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

const Course = (props) => {
	return (
	<div>
		<Header course={props.course} />
		<Content course={props.course} />
		<Total course={props.course} />
	</div>
	)
}

const Content = (props) => {
	return (
	<>
		<Part part={props.course.parts[0]} />
		<Part part={props.course.parts[1]} />
		<Part part={props.course.parts[2]} />
	</>
	)
}

const Part = (props) => {
	return (
	  <p>
        {props.part.name} {props.part.exercises}
      </p>
	)
}

const Header = (props) => {

	return (
      <h1>{props.course.name}</h1>
	)
}

const Total = (props) => {
	const number = props.course.parts[0].exercises
				 + props.course.parts[1].exercises
				 + props.course.parts[2].exercises; 
	return (
      <p>Number of exercises {number}</p>
	)
}

export default App
