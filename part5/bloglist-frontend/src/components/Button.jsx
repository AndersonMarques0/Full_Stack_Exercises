export default function Button(props) {

    const { buttonText, buttonType, onClick } = props

    return (
        <div>
            <button onClick={onClick}
                type={buttonType}
            >
                {buttonText}
            </button>
        </div>
    )
}
