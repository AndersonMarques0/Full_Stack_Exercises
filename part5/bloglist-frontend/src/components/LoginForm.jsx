import { useState } from 'react'
import Input from './Input.jsx'
import Button from './Button.jsx'
import loginService from '../services/login.js'

export default function LoginForm(props) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)

    const handleLogin = async event => {
        event.preventDefault()
        console.log('Loggin in with', username, password)

        try {
            const user = await loginService.login({ username, password })
            props.setUser(user)
            setUsername('')
            setPassword('')
        } catch {
            setErrorMessage('wrong credentials')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    return (
        <div>
            <p>{errorMessage}</p>

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