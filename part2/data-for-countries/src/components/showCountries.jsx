import { useEffect } from "react"
import axios from "axios"
import ShowCountryInformation from "./showCountryInformation"

const ShowCountries = (props) => {

  useEffect(() => {
    if (!props.countries) {
      console.log('Hello from useEffect! Fetching data from server...')
      axios
        .get('https://studies.cs.helsinki.fi/restcountries/api/all')
        .then(response => {
          console.log(response.data)
          props.setCountries(response.data)
        })
    }
  }, [props])

  const showCountry = (countryName) => {
    props.setPickedCountry(countryName)
  }

  if (!props.countries) {
    return <p>Carregando países...</p>
  }

  const filteredCountries = props.countries.filter(country =>
    country.name.common.toLowerCase().includes(props.value.toLowerCase())
  )

  
  if (props.pickedCountry) {
    const index = props.countries.findIndex(
      (element) => element.name.common === props.pickedCountry
    )
    return <ShowCountryInformation index={index} array={props.countries} />
  }

  
  if (filteredCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  } else if (filteredCountries.length > 1) {
    return filteredCountries.map(country => (
      <p key={country.name.common}>
        {country.name.common}
        <button onClick={() => showCountry(country.name.common)}>Show</button>
      </p>
    ))
  } else if (filteredCountries.length === 1) {
    return <ShowCountryInformation index={0} array={filteredCountries} />
  }

  return null
}

export default ShowCountries
