import Content from "./content"
import Header from "./header"

const Course = (props) => {
    console.log('Hello from course: ', props.course.parts)

    return (
        <>
            <Header course={props.course.name} />
            <Content name={props.course.parts} exercises={props.course.parts} />
        </>
    )
}

export default Course