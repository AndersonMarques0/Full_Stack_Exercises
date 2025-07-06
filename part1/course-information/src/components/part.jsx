
const Part = (props) => {
    console.log('Hello from part ', props.part );
    const coursesData = props.part.map(course => <p key={course.id} >{course.name} {course.exercises}</p>)
    console.log('coursesData ', coursesData);
    

    return (
        <>
            {coursesData}
        </>
    )
}

export default Part