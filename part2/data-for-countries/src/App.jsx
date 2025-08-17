import { useState } from "react"
import Input from "./components/input"
import ShowCountries from "./components/showCountries"

function App() {
  
  const [ value, setValue] = useState('')
  const [ countries, setCountries ] = useState(null)
  const [ pickedCountry, setPickedCountry] = useState(null)
  const [ weather, setWeather] = useState(null)

  return (
    <>
      <Input value={value} setValue={setValue} setPickedCountry={setPickedCountry} />
      <ShowCountries 
        countries={countries} setCountries={setCountries}
        pickedCountry={pickedCountry} setPickedCountry={setPickedCountry}
        value={value}
        weather={weather} setWeather={setWeather}
       />
    </>
  )
}

export default App
