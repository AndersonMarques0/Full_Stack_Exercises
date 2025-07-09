import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-1234567' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNewName = event => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  
  const handleNewNumber = event => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const addPerson = event => {
    event.preventDefault()
    console.log('form submite: ', newName)
    for (const person of persons) {
      console.log('person.name: ', person.name)
      console.log('newName.name: ', newName)
      if(person.name === newName) {
        alert(`${person.name} is already added to phonebook`)
        return
      }
    }

    const newPerson = {
      name: newName,
      phone: newNumber
    }
    setPersons(persons.concat(newPerson))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNewName} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNewNumber} />
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <p key={person.name} >{person.name} {person.phone}</p>)}
    </div>
  )
}

export default App