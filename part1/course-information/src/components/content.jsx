import Part from "./part"

const Content = (props) => {
    console.log('Hello from Content name: ', props)

    return (
        <>
           <Part part={props.name[0].name} exercise={props.exercises[0].exercises} />
           <Part part={props.name[1].name} exercise={props.exercises[1].exercises} />
           <Part part={props.name[2].name} exercise={props.exercises[2].exercises} />
        </>
    )
}

export default Content