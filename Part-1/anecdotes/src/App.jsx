import { useState } from 'react'

const Button = ({text,action}) => <button type="button" onClick={action} >{text}</button>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [ votes, setVotes ] = useState(
    [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
    ]
  )

  const [ mostVote, setMostVote] = useState(0)   
  const [selected, setSelected] = useState(0)

  const changeQuote = () => setSelected(Math.floor(Math.random() * 8))

  const getVotes = () => {
    let newVotes = [...votes]
    newVotes[selected]++
    setVotes(newVotes)
    showAnecdoteWithMostVotes(newVotes)
  }

  const showAnecdoteWithMostVotes = (list = votes) => {
    let mostVotes
    let mostIndex
    for (let index = 0; index < list.length; index++) {
      
      if(index === 0) {
        mostVotes = list[index]
        mostIndex = index
      } else {
        if(list[index] > mostVotes) {
        mostVotes = list[index]
        mostIndex = index
        }
      }
      
    }

    setMostVote(mostIndex)

  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button text='vote' action={getVotes} />
      <Button text='next anecdote' action={changeQuote} />

      <h1>Anecdote with most votes</h1>

      <p>{anecdotes[mostVote]}</p>
    </div>
  )
}

export default App