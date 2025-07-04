import Part from "./part"
import Total from "./total"

const Content = (props) => {
    console.log('Hello from Content name: ', props.exercises)

    return (
        <>
           <Part part={props.name[0].name} exercise={props.exercises[0].exercises} />
           <Part part={props.name[1].name} exercise={props.exercises[1].exercises} />
           <Part part={props.name[2].name} exercise={props.exercises[2].exercises} />
           <Part part={props.name[3].name} exercise={props.exercises[3].exercises} />
           <Total exercises={props.exercises} />
        </>
    )
}

export default Content