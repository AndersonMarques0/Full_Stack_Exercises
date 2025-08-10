import { useEffect } from "react"
import axios from "axios"

const ShowCountries = (props) => {

    useEffect(() => {
        
        if(!props.countries) {
            console.log('Hello from useEffect! Fetching data from server...')

            axios
            .get('https://studies.cs.helsinki.fi/restcountries/api/all')
            .then(response => {
                console.log(response.data)
                props.setCountries(response.data)
            })
        }

    }, )

    

    
    if(props.countries) {

        const filteredCountries = props.countries.filter(country => country.name.common.includes(props.value))
        
        if(filteredCountries.length > 10) {

            return (
                <p>Too many matches, specify another filter</p>
            )

        }else if(filteredCountries.length > 1 && filteredCountries.length < 11) {

            return (
                filteredCountries.map(country => <p key={country.name.common} >{country.name.common}</p>)
            )
        }else if(filteredCountries.length === 1) {
            console.log(Object.values(filteredCountries[0].languages))
            return (
                <>
                    <h1>{filteredCountries[0].name.common}</h1>

                    <p>
                        {filteredCountries[0].capital}<br/>
                        Area {filteredCountries[0].area}
                    </p>

                    <h2>Languages</h2>
                    <ul>
                        {Object.values(filteredCountries[0].languages).map(language => <li key={language} >{language}</li>)}
                    </ul>

                    <img 
                        src={filteredCountries[0].flags.png} 
                        alt={filteredCountries[0].flags.alt} 
                        style={{ width: '150px', height: 'auto', border: '1px solid #ccc' }} 
                    />
                    
                </>
                
            )
        }

    }
    
}

export default ShowCountries