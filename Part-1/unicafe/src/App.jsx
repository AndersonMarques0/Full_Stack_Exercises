import { useState } from 'react'

const Button = ({ text, handleclick }) => {

  return (
    <button type="button" onClick={handleclick} >{text}</button>
  )

}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const countGood = () => {
      setGood(good+1)
      console.log(good)
  }

  const countNeutral = () => {
      setNeutral(neutral+1)
      console.log(neutral)
  }

  const countBad = () => {
      setBad(bad+1)
  }
  
  return (
    <div>
      <h1>give feedback</h1>
      <button type="button" onClick={countGood} >good</button>
      <button type="button" onClick={countNeutral} >neutral</button>
      <button type="button" onClick={countBad} >bad</button>

      <h1>statistics</h1>

      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      

    </div>
  )
}

export default App