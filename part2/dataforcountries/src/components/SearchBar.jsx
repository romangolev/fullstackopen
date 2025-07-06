const SearchBar = ({value, onSearchChanged}) => {
	return (
		<div>
			find countries <input value={value} onChange={onSearchChanged} />
		</div>
	)
}

export default SearchBar
