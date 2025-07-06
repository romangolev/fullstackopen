import { useState, useEffect } from 'react'
import countriesService from './services/countries'

const SearchBar = ({value, onSearchChanged}) => {
	return (
		<div>
			find countries <input value={value} onChange={onSearchChanged} />
		</div>
	)
}

const Country = ({name, data}) => {
	if (data === null){
		return (<>Loading ...</>)
	} else {
		console.log(data)
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
					{Object.values(data.languages).map(val => <li>{val}</li>)}
					</ul>
				</div>
				<div>
					<img src={data.flags.png} />
				</div>
			</>
		)
	}
}

const SearchResult = ({results, onShowClick}) => {
	const [countryData, setCountryData] = useState(null)

	const queryCountryData = (name) => {
		return countriesService.getSpecific(name)
	}
	
	useEffect(() => {
		if (results !== null && results.length === 1){
			queryCountryData(results[0].toLowerCase()).then(val => setCountryData(val))
		} else {
			setCountryData(null)
		}
	}, [results])

	if (results === null || results.length === 0){
		return null
	} else if (results.length == 1) {
		return (<Country name={results[0]} data={countryData} />)
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

function App() {
	const [search, setSearch] = useState('')
	const [countries, setCountries] = useState(null)
	const [searchResult, setSearchResult] = useState(null)

	const handleSearchChange = (event) => {
		setSearch(event.target.value)
		handleSearch(event.target.value)
	}

	const handleSearch = (searchValue) => {
		console.log(searchValue)
		if (countries === null) {
			setSearchResult(null)
		} else {
			const result = countries.reduce((acc, country) => {
				if (country.name.common.toLowerCase().includes(searchValue)){
					acc.push(country.name.common)
				}
				return acc
			}, []) 
			setSearchResult(result)
		}
	}
	
	const handleShowClick = (event) => {
		setSearch(event.target.value)
		setSearchResult([event.target.value])
	}

	useEffect(() => {
		countriesService.getAll()
			.then( data => {
				setCountries(data)
			})
	}, [])

	return (
		<>
			<SearchBar  value={search}
						onSearchChanged={handleSearchChange} />
			<SearchResult results={searchResult}
						  onShowClick={handleShowClick}/>
		</>
	)
}
export default App
