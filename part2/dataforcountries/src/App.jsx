import { useState } from 'react'


function App() {
	const [search, setSearch] = useState('')

	const handleSearchChange = (event) => {
		setSearch(event.target.value)
	}

	return (
		<div>
			find countries <input value={search} onChange={handleSearchChange} />
		</div>
	)
}
export default App
