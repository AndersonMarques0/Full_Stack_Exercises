import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

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
	<Blog blog={blogs} user={user} />	
    )
  }

}

export default App
