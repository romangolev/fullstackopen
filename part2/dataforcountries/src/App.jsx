import { useState, useEffect } from 'react'
import countriesService from './services/countries'
import SearchBar from './components/SearchBar'
import SearchResult from './components/SearchResult'


function App() {
	const [search, setSearch] = useState('')
	const [countries, setCountries] = useState(null)
	const [searchResult, setSearchResult] = useState(null)

	const handleSearchChange = (event) => {
		setSearch(event.target.value)
		handleSearch(event.target.value)
	}

	const handleSearch = (searchValue) => {
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
