import { useState, useEffect } from 'react'
import Filter from './components/filter'
import PersonForm from './components/personForm'
import Persons from './components/persons'
import servicePersons from './services/servicePersons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    servicePersons
    .getAll()
    .then(response => {
      setPersons(response.data)
    })
  }, [])

  const handleNewName = event => {
    setNewName(event.target.value)
  }
  
  const handleNewNumber = event => {
    setNewNumber(event.target.value)
  }

  const handleFilter = event => {
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