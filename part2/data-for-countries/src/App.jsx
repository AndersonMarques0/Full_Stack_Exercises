import { useState } from "react"
import Input from "./components/input"
import ShowCountries from "./components/showCountries"

function App() {
  
  const [ value, setValue] = useState('')
  const [ countries, setCountries ] = useState(null)

  

  return (
    <>
      <Input value={value} setValue={setValue} />
      <ShowCountries countries={countries} setCountries={setCountries}
        value={value}
       />
    </>
  )
}

export default App
