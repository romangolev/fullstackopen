const App = () => {
	const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

	return (courses.map(course =>  <Course key={course.id} course={course} />))
}

const Course = (props) => {
	return (
	<div>
		<h1>Web development curriculum</h1>
		<Header course={props.course} />
		<Content course={props.course} />
		<Total course={props.course} />
	</div>
	)
}

const Content = (props) => {
	return (
	<>
		{props.course.parts.map(i => <Part key={i.id} part={i} />)}
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
      <h2>{props.course.name}</h2>
	)
}

const Total = (props) => {
	const number = props.course.parts.reduce((sum, part) => sum + part.exercises, 0)
	return (
      <b>Total of exercises {number}</b>
	)
}

export default App
