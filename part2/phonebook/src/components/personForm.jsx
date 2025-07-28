import servicePersons from '../services/servicePersons'

const PersonForm = (props) => {

    const addPerson = event => {
      event.preventDefault()
      let changeNumber
      let id
      for (const person of props.persons) {
        
        if(person.number !== props.valueNumber && person.name === props.valueName) {
          changeNumber = confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)
          id = person.id
          if(!changeNumber) {
            return
          }
        } else if(person.number === props.valueNumber) {
          alert(`${person.name} is already added to phonebook`)
          return
        }

         
        
      }

      if(changeNumber) {

        const pe = props.persons.find(p => p.id == id)
        const changedPerson = { ...pe, number: props.valueNumber}
        servicePersons.update(id, changedPerson)
        .then(response => {
          props.setPersons(props.persons.map(person => person.id === id ? response.data : person))
        })
        props.handleMessage(`${changedPerson.name} changed your number!`)
        setTimeout(() => {
          props.handleMessage(null)
        }, 5000)
        return
      }

      const newPerson = {
        name: props.valueName,
        number: props.valueNumber,
        id: String(props.persons.length + 1)
      }

      servicePersons
      .create(newPerson)
      .then(response => {
        props.setPersons(props.persons.concat(response.data))
      })

      props.handleMessage(`${newPerson.name} added!`)
      setTimeout(() => {
        props.handleMessage(null)
      }, 5000)

  }

    return (
        <form onSubmit={addPerson}>
            <div>
            name: <input value={props.valueName} onChange={props.handleName} />
            </div>
            <div>
            number: <input value={props.valueNumber} onChange={props.handleNumber} />
            </div>
            <div>
            <button type="submit" >add</button>
            </div>
        </form>
    )
}

export default PersonForm