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

export default Course
