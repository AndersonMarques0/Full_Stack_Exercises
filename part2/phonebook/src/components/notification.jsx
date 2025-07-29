
const Notification = (props) => {
    console.log('Hello from Notification, props', props)
    const {message, css} = props
    console.log('Hello from Notification, message: ', message)
    console.log('Hello from Notification, css: ', css)

    if(message === null) {
        return null
    } else {
        if(css === 'positive') {
            return (
                <div className="positive">
                    {message}
                </div>
            )
        } else if(css === 'negative') {
            return (
                <div className="negative">
                    {message}
                </div>
            )
        }
    }

    

}

export default Notification