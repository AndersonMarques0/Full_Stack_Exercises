import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import './App.css'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [message, setMessage] = useState(null)
    const [css, setCss] = useState("")

    useEffect(() => {
	blogService.getAll().then(blogs =>
	    setBlogs(blogs)
	)
    }, [user])

    const likeBook = (index) => {
	
	let book = blogs[index]

	book.likes = book.likes + 1
	return blogService.update(blogs[index].id, book)	

    }

    if (!user) {
	return (
	    <div>
		<LoginForm
		    user={user} setUser={setUser}
		    message={message} setMessage={setMessage}
		    css={css} setCss={setCss}
	    />
	    </div>
	)
    } else {
	return (
	    <Blog 
		blogs={blogs} setBlogs={setBlogs} 
		user={user} setUser={setUser}
		message={message} setMessage={setMessage}
		css={css} setCss={setCss}
		likeBook={likeBook}
	    />	
	)
    }

}

export default App
