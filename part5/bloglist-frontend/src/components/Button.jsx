export default function Button(props) {

    const { buttonText, buttonType } = props

    return (
        <div>
            <button
                type={buttonType}
            >
                {buttonText}
            </button>
        </div>
    )
}