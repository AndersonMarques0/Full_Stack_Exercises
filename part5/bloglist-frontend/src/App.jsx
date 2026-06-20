import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [author, setAuthor] = useState("")
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")
  const [likes, setLikes] = useState(0)

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
	/>	
    )
  }

}

export default App
