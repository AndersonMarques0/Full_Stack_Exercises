import { useState, useEffect } from 'react'
import Filter from './components/filter'
import PersonForm from './components/personForm'
import Persons from './components/persons'
import servicePersons from './services/servicePersons'
import Notification from './components/notification'
import './App.css'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [cssError, setCssError] = useState('')

  useEffect(() => {
    servicePersons
    .getAll()
    .then(response => {
      setPersons(response.data)
      console.log(response.data)
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

  console.log('Hello from App, cssError: ', cssError)

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} css={cssError} />
      <Filter value={filter} handle={handleFilter} />

      <h2>Add a new</h2>
      <PersonForm
        persons={persons} setPersons={setPersons}
        valueName={newName} handleName={handleNewName}
        valueNumber={newNumber} handleNumber={handleNewNumber}
        handleMessage={setErrorMessage}
        messageType={setCssError}
      />

      <h2>Numbers</h2>
      <Persons 
        persons={persons} setPersons={setPersons} 
        filter={filter} 
        handleMessage={setErrorMessage}
        messageType={setCssError}
      />
    </div>
  )
}

export default App