import { useState } from 'react'
import Filter from './components/filter'
import PersonForm from './components/personForm'
import Persons from './components/persons'

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

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} handle={handleFilter} />

      <h2>Add a new</h2>
      <PersonForm
        persons={persons} setPersons={setPersons}
        valueName={newName} handleName={handleNewName}
        valueNumber={newNumber} handleNumber={handleNewNumber}
      />

      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} />
    </div>
  )
}

export default App