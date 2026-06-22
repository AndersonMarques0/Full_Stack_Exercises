import { useState, useEffect } from 'react'
import Input from './Input.jsx'
import Button from './Button.jsx'
import loginService from '../services/login.js'
import blogService from '../services/blogs.js'
import Notification from './Notification.jsx'

export default function LoginForm(props) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const time = 5000

    useEffect(() => {
	const loggedUserJSON = window.localStorage.getItem("loggedUser")
	if (loggedUserJSON) {
	    const user = JSON.parse(loggedUserJSON)
	    props.setUser(user)
	    blogService.setToken(user.token)
	}
    }, [])


    const handleLogin = async event => {
        event.preventDefault()
        console.log('Loggin in with', username, password)

        try {
            const user = await loginService.login({ username, password })

	    window.localStorage.setItem(
		'loggedUser', JSON.stringify(user)
	    )
	    blogService.setToken(user.token)
            props.setUser(user)
            setUsername('')
            setPassword('')
        } catch {
	    props.setMessage('wrong credentials')
	    props.setCss('negative')
	    setTimeout(() => props.setMessage('') ,time)    
        }
    }
    
    return (
        <div>
            <Notification
		message={props.message}
		css={props.css}
	    />

            <form onSubmit={handleLogin}>
                <Input 
                    textLabel="Username "
                    placehd="Type your username"
                    inputType="text"
                    inputValue={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <Input 
                    textLabel="Password "
                    placehd="Type your password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button 
                    buttonText="Login"
                    buttonType="submit"
                />

            </form>
            
        </div>
    )
}
