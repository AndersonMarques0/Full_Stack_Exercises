export default function Input(props) {

    const { textLabel, type, placehd, value, onChange } = props

    return (
        <div>
            <label>
                {textLabel}
                <input
                    name="input"
                    placeholder={placehd}
                    type={type}
                    value={value}
                    onChange={onChange}
                >
                </input>
            </label>

        </div>
    )
}