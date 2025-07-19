import axios from 'axios'

const PersonForm = (props) => {

    const addPerson = event => {
      event.preventDefault()
      for (const person of props.persons) {
        if(person.name === props.valueName) {
          alert(`${person.name} is already added to phonebook`)
          return
        }
      }

      const newPerson = {
        name: props.valueName,
        number: props.valueNumber,
        id: String(props.persons.length + 1)
      }

      axios
        .post('http://localhost:3001/persons', newPerson)
        .then(response => {
          props.setPersons(props.persons.concat(response.data))
        })

      
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