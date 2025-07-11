
const PersonForm = (props) => {
    console.log(props.valueName)

    const addPerson = event => {
    event.preventDefault()
    console.log('form submite: ', props.valueName)
    for (const person of props.persons) {
      console.log('person.name: ', person.name)
      console.log('newName.name: ', props.valueName)
      if(person.name === props.valueName) {
        alert(`${person.name} is already added to phonebook`)
        return
      }
    }

    const newPerson = {
      name: props.valueName,
      phone: props.valueNumber,
      id: props.persons[props.persons.length - 1].id + 1
    }
    props.setPersons(props.persons.concat(newPerson))
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