import Weather from  './Weather'

const Country = ({name, data, weather}) => {
	if (data === null){
		return (<>Loading ...</>)
	} else {
		return (
			<>
				<h1>{name}</h1>
				<div>
					Capital {data.capital} <br/>
					Area {data.area}
				</div>
				<h2>Languages</h2>
				<div>
					<ul>
					{Object.values(data.languages).map(val => <li key={val}>{val}</li>)}
					</ul>
				</div>
				<div>
					<img src={data.flags.png} />
				</div>
				<Weather capital={data.capital} weather={weather} />
			</>
		)
	}
}

export default Country
