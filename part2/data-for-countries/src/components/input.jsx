
const Input = (props) => {

    const handleCountries = (event) => {
        props.setValue(event.target.value)
    }

    return (
        <div>
            find countries <input value={props.value} onChange={handleCountries} />
        </div>
    )
}

export default Input