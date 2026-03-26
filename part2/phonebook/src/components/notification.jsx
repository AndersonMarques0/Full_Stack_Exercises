const Notification = ({ message, css }) => {
    if (!message) {
        return null
    }

    return (
        <div className={css}>
            {message}
        </div>
    )
}

export default Notification