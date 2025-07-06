import axios from 'axios'
const baseUrl = 'https://api.openweathermap.org/data/2.5'
const iconsUrl = 'https://openweathermap.org/img/wn'
const apiKey = import.meta.env.VITE_OPEN_WEATHER_API

const getWeather = (capital) => {
	const req = axios.get(`${baseUrl}/weather?q=${capital}&appid=${apiKey}`)
	return req.then(res => res.data)
}

export default {
	getWeather : getWeather
}

