
const Total = (props) => {
    console.log('Hello from Total: ', props)
    const exercises = props.exercises.map((exerc) => exerc.exercises)
    const total = exercises.reduce((sum,value) => sum + value, 0)

    return (
        <>
            <p><strong>Total of {total} exercises</strong></p>
        </>
    )
}

export default Total