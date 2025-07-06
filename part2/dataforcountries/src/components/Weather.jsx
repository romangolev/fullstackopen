const Weather = ({capital, weather}) => {
	const link = weather ? `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png` : ""
	return (
		<>
			<h2>Weather in {capital}</h2>
			Temperature {weather ? weather.main.temp : ""} Celsius <br />
			{link ? (<><img src={link}/> <br /> </>): ""}
			Wind {weather ? weather.wind.speed : ""} m/s
		</>
	)
}

export default Weather
