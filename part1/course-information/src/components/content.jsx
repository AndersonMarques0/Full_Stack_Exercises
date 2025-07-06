import Part from "./part"
import Total from "./total"

const Content = (props) => {
    console.log('Hello from Content: ', props)

    return (
        <>
           <Part part={props.course.parts} />
           <Total exercises={props.course.parts} />
        </>
    )
}

export default Content