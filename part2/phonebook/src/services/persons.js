import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
	const req = axios.get(baseUrl)
	return req.then(res => res.data)
}

const create = newObject => {
	const req = axios.post(baseUrl, newObject)
	return req.then(res => res.data)
}

const deleteObj = id => {
	const req = axios.delete(`${baseUrl}/${id}`)
	return req.then()
}

const update = (id, newObj) => {
	const req = axios.put(`${baseUrl}/${id}`, newObj)
	return req.then(res => res.data)
}

export default {
	getAll: getAll,
	create: create,
	deleteObj: deleteObj,
	update: update
}
