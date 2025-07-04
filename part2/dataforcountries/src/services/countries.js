import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAll = () => {
	const req = axios.get(`${baseUrl}/all`)
	return req.then(res => res.data)
}

const getSpecific = (name) => {
	const req = axios.get(`${baseUrl}/name/${name}`)
	return req.then(res => res.data)
}

export default {
	getAll: getAll,
	getSpecific: getSpecific
}

