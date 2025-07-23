import Button from "./button"
import servicePersons from "../services/servicePersons"

const Persons = (props) => {

    const filteredPersons = props.persons.filter(person => {
      const name = props.filter.toLocaleLowerCase()
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

        if(match.length === name.length) {
          return true
        } else {
          return false
        }
      }
    })

    const deletePerson = (id, name ) => {
      console.log('Hello from deletePerson')
      const decision = confirm(`Delete ${name} ?`)

      if(decision) {
        
        servicePersons.deleteUser(id)
        props.setPersons(props.persons.toSpliced(props.persons.indexOf(name), 1))

      }else {
        return
      }

      
    }

    return (
        <div>
            {filteredPersons.map(person => <p key={person.id} >{person.name} {person.number} <Button text='delete' action={() => deletePerson(person.id, person.name) } /> </p>)}
        </div>
    )
}

export default Persons