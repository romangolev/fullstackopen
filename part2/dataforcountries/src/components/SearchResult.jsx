import { useState, useEffect } from 'react'
import countriesService from './../services/countries'
import weatherService from './../services/weather'
import Country from './Country'

const SearchResult = ({results, onShowClick}) => {
	const [countryData, setCountryData] = useState(null)
	const [weatherData, setWeatherData] = useState(null)

	const queryCountryData = (name) => {
		return countriesService.getSpecific(name)
	}

	const queryWeatherData = (capital) => {
		return weatherService.getWeather(capital)
	}

	useEffect(() => {
		if (results !== null && results.length === 1){
			queryCountryData(results[0].toLowerCase())
				.then(val => {
					setCountryData(val)
					queryWeatherData(val.capital).then(weatherData => {
						setWeatherData(weatherData)
					})
				})
		} else {
			setCountryData(null)
		}
	}, [results])

	if (results === null || results.length === 0){
		return null
	} else if (results.length == 1) {
		return (<Country name={results[0]}
						 data={countryData}
						 weather={weatherData} />)
	} else if (results.length > 10) {
		return (
			<div>
				<p>Too many matches, specify another filter</p>
			</div>
		)
	} else {
		return (
		<div>
			{results.map(elem => {
				return (
					<p key={elem}>{`${elem} `}<button value={elem} onClick={onShowClick}>Show</button></p>
				)
			})}
		</div>
		)
	}
}

export default SearchResult
