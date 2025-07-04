
const Total = (props) => {
    console.log('Hello from Total: ', props.exercises)
    const exercises = props.exercises.map((exerc) => exerc.exercises)
    const total = exercises.reduce((sum,value) => sum + value, 0)

    return (
        <>
            <p>Total of {total} exercises</p>
        </>
    )
}

export default Total