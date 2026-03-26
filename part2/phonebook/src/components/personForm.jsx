import servicePersons from '../services/servicePersons'

const PersonForm = (props) => {

  const addPerson = event => {
    event.preventDefault()
    const existingPerson = props.persons.find(p => p.name === props.valueName)

    if (existingPerson) {
      if (existingPerson.number === props.valueNumber) {
        alert(`${props.valueName} is already added to phonebook with this number`)
        return
      }

      const confirmUpdate = window.confirm(
        `${props.valueName} is already added to phonebook, replace the old number with a new one?`
      )

      if (confirmUpdate) {
        const changedPerson = { ...existingPerson, number: props.valueNumber }
        
        servicePersons
          .update(existingPerson.id, changedPerson)
          .then(response => {
            props.setPersons(props.persons.map(p => p.id !== existingPerson.id ? p : response.data))
            props.messageType('positive')
            props.handleMessage(`Updated ${changedPerson.name}'s number`)
            setTimeout(() => props.handleMessage(null), 5000)
          })
          .catch(error => {
            props.messageType('negative')
            props.handleMessage(error.response.data.error)
            setTimeout(() => props.handleMessage(null), 5000)
          })
      }
      return
    }

    const newPerson = {
      name: props.valueName,
      number: props.valueNumber,
    }

    servicePersons
      .create(newPerson)
      .then(response => {
        props.setPersons(props.persons.concat(response.data))
        props.messageType('positive')
        props.handleMessage(`Added ${newPerson.name}`)
        setTimeout(() => props.handleMessage(null), 5000)
      })
      .catch(error => {
        props.messageType('negative')
        props.handleMessage(error.response.data.error)
        console.log(error.response.data.error)
        setTimeout(() => props.handleMessage(null), 5000)
      })
  }

  return (
    <form onSubmit={addPerson}>
      <div>name: <input value={props.valueName} onChange={props.handleName} /></div>
      <div>number: <input value={props.valueNumber} onChange={props.handleNumber} /></div>
      <div><button type="submit">add</button></div>
    </form>
  )
}

export default PersonForm