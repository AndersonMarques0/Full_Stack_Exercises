import axios from 'axios'
import { useEffect } from "react";

const ShowCountryInformation = (props) => {
    const {array, index, weather, setWeather } = props

    console.log('Hello from showcountryinformation', props)

    const urlWeatherApi = `${import.meta.env.VITE_WEATHER_API}q=${array[index].capital[0]}&units=metric&appid=${import.meta.env.VITE_API_KEY}&lang=en`

    useEffect(() => {
        
        axios
        .get(urlWeatherApi)
        .then(response => {
            console.log(response.data)
            setWeather(response.data)})

    }, [urlWeatherApi, setWeather])

    console.log('Hello from showcountryinformation', props)
    
    return (
            <>
                <h1>{array[index].name.common}</h1>

                <p>
                    {array[index].capital}<br/>
                    Area {array[index].area}
                </p>

                <h2>Languages</h2>
                <ul>
                    {Object.values(array[index].languages).map(language => <li key={language} >{language}</li>)}
                </ul>

                <img 
                    src={array[index].flags.png} 
                    alt={array[index].flags.alt} 
                    style={{ width: '150px', height: 'auto', border: '1px solid #ccc' }} 
                />

                <h2>Weather in {array[index].capital[0]}</h2>

                {weather ? <p>Temperature {Math.round(weather.main.temp)} Celsius</p> : <p></p>}

                {weather ? 
                    <img
                        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                        alt={weather.weather.description}
                    />
                    : <p></p>
                }

                {weather ? <p>Wind {weather.wind.speed} m/s</p> : <p></p>}

            </>
        )
        
}

export default ShowCountryInformation