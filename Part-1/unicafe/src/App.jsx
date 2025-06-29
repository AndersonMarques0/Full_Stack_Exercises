import { useState, useEffect } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAve] = useState(0)
  const [positive, setPos] = useState(0)

  const updateValue = (value, trigger ) => trigger(value)

  const countUp = (button) => () => {

    if (button === 'good') {
      updateValue( good + 1, setGood )
      updateValue( all + 1, setAll)
    } else if (button === 'neutral') {
      updateValue( neutral + 1, setNeutral)
      updateValue( all + 1, setAll)
    } else if (button === 'bad') {
      updateValue( bad + 1, setBad)
      updateValue( all + 1, setAll)
    }
  }

  useEffect(
    () => {
      if (all !== 0) {
        updateValue( (good / all) * 100, setPos)
        updateValue( (good - bad) / all, setAve)
      }
    }, [good, bad, all]
  )
  
  return (
    <div>
      <h1>give feedback</h1>
      <button type="button" onClick={countUp('good')} >good</button>
      <button type="button" onClick={countUp('neutral')} >neutral</button>
      <button type="button" onClick={countUp('bad')} >bad</button>

      <h1>statistics</h1>

      <p>
        good {good} <br />
        neutral {neutral} <br />
        bad {bad} <br />
        all {all} <br />
        average {average} <br />
        positive {positive}%
      </p>
      
      
    </div>
  )
}

export default App