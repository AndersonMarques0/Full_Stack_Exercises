import { useState } from 'react'

const Statistics = (props) => {

  return (
    <>
      <h1>Statistics</h1>
      <p>
        good {props.good} <br />
        neutral {props.neutral} <br />
        bad {props.bad} <br />
        all {props.all} <br />
        average {props.average} <br />
        positive {props.positive}%
      </p>

    </>
  )
}

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
    let updatedGood = good
    let updatedBad = bad
    let updatedAll = all

    if (button === 'good') {
      updatedGood = good + 1
      updateValue( good + 1, setGood )
    } else if (button === 'neutral') {
      updateValue( neutral + 1, setNeutral)
      
    } else if (button === 'bad') {
      updatedBad = bad + 1
      updateValue( bad + 1, setBad)
    }
    updatedAll = all + 1
    setAll(all + 1)
    if (updatedAll !== 0) {
      setAve((updatedGood - updatedBad) / updatedAll)
      setPos((updatedGood / updatedAll)*100)
    }

  }
  
  return (
    <div>
      <h1>give feedback</h1>
      <button type="button" onClick={countUp('good')} >good</button>
      <button type="button" onClick={countUp('neutral')} >neutral</button>
      <button type="button" onClick={countUp('bad')} >bad</button>
      
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positive={positive}
      />
      
    </div>
  )
}

export default App