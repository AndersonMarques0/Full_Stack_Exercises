export default function Button(props) {

    const { buttonText, buttonType, onClick } = props

    return (
	<button onClick={onClick}
	type={buttonType}
	>
	{buttonText}
	</button>
    )
}
