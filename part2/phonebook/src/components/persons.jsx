const Persons = (props) => {

    const filteredPersons = props.persons.filter(person => {
    console.log('Hello from filteredPersons! filter value is ', props.filter)
    const name = props.filter.toLocaleLowerCase()
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
            {filteredPersons.map(person => <p key={person.id} >{person.name} {person.phone}</p>)}
        </div>
    )
}

export default Persons