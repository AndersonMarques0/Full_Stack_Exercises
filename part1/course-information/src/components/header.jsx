
const Header = (props) => {
    const content = props.course.name
    console.log('Hello from header: ', props.course)
    
    return (
        <>
            <h1>{content}</h1>
        </>
    )
}

export default Header