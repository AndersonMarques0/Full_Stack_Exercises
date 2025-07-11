import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-123456', id: 1 },
    { name: 'Ada Lovelace', phone: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', phone: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', phone: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const handleNewName = event => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  
  const handleNewNumber = event => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilter = event => {
    console.log(event.target.value)
    setFilter(event.target.value)
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

  const filteredPersons = persons.filter(person => {
    console.log('Hello from filteredPersons! filter value is ', filter)
    const name = filter.toLocaleLowerCase()
    console.log('Hello from filteredPersons! name value is ', name)
    if (name === '') {
      return true
    } else {
      let match = ''
      const personName = person.name.toLowerCase()
      let index = 0
      nameFor :for (const n of name) {
        for (;index < personName.length; index++) {
          if (n === personName[index]) {
            match += n
            if(match.length === personName.length) break nameFor
            continue nameFor
          }
        }
      }
      console.log('Hello from filteredPersons! match result is ', match)
      if(match.length === name.length) {
        return true
      } else {
        return false
      }
    }
  })

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={filter} onChange={handleFilter} />
      </div>

      <h2>Add a new</h2>
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
      {filteredPersons.map(person => <p key={person.id} >{person.name} {person.phone}</p>)}
    </div>
  )
}

export default App