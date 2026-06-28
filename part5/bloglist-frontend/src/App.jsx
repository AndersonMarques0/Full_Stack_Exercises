import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import './App.css'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [author, setAuthor] = useState("")
    const [title, setTitle] = useState("")
    const [url, setUrl] = useState("")
    const [likes, setLikes] = useState(0)
    const [message, setMessage] = useState(null)
    const [css, setCss] = useState("")

    useEffect(() => {
	blogService.getAll().then(blogs =>
	    setBlogs(blogs)
	)
    }, [user])

    if (!user) {
	return (
	    <div>
	    <LoginForm
	    user={user}
	    setUser={setUser}
	    message={message}
	    setMessage={setMessage}
	    css={css}
	    setCss={setCss}
	    />
	    </div>
	)
    } else {
	return (
	    <Blog blog={blogs} 
		user={user} setUser={setUser}
		title={title} setTitle={setTitle}
		author={author} setAuthor={setAuthor}
		url={url} setUrl={setUrl}
		likes={likes} setLikes={setLikes}
		message={message}
		setMessage={setMessage}
		css={css}
		setCss={setCss}
	    />	
	)
    }

}

export default App
