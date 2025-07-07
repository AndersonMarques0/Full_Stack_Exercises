
const Header = (props) => {
    const content = props.course.name
    console.log('Hello from header: ', props.course)
    
    return (
        <>
            <h2>{content}</h2>
        </>
    )
}

export default Header