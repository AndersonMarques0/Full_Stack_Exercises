import Content from "./content"
import Header from "./header"

const Course = (props) => {
    console.log('Hello from course: ', props.course)

    return (
        <>  
            <h1>Web development curriculum</h1>
            <Header course={props.course[0]} />
            <Content course={props.course[0]} />
            <Header course={props.course[1]} />
            <Content course={props.course[1]} />
        </>
    )
}

export default Course