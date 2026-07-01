import Button from './Button.jsx'
import blogService from '../services/blogs.js'
import Notification from './Notification.jsx'
import Togglable from './Toggable.jsx'
import NewBlog from './NewBlog.jsx'

const Blog = ({ blog, user, setUser, title, setTitle, author, setAuthor, url, setUrl, likes, setLikes, message, setMessage, css, setCss }) => {
        
    console.log(blog)

    const likeBook = (index) => {
	
	let book = blog[index]

	book = {
	    likes: book.likes + 1 
	}

	return blogService.update(blog[index].id, book)	

    }

    const createList = (list) => {
	if(!Array.isArray(list)) {
	    return null
	}

	return list.map((item,index) => {
	    console.log(index)
	    return (
		    <div key={index} className='blog' >
			{item.title} {item.author} 
			<Togglable
			    buttonLabel="view"
			>
			    {item.url}<br/>
			    likes {item.likes} 
				<Button onClick={() => likeBook(index)}
				    buttonText="like"
				/> <br/>
			    {item.user.username} <br/>
			</Togglable>
		    </div>
	    )
	})
    }

    const logout = () => {
	window.localStorage.clear()
	return location.reload()
    }

    const createNewBook = (title, author, url, likes) => {

	const book = {
	    title: title,
	    author: author,
	    url: url,
	    likes: likes
	}

	try {
	    blogService.create(book)
	    setMessage(`Added the book ${book.title} by ${book.author}`)
	    setCss('positive')
	    setTimeout(() => setMessage(''), 5000)
	    location.reload()
	} catch (expection) {
	    console.error('Failed to create blog', exception)
	    setMessage(exception)
	    setCss(negative)
	    setTimeout(() => setMessage(''), 8000)
	}
    }

    return (
	<div>
	<h2>Blogs</h2>

	<Notification
	    message={message}
	    css={css}
	/>

	{user.name} logged in. 
	<Button 
	buttonText="Log out" onClick={logout}
	/>

	<Togglable buttonLabel="create new blog" >
	    <NewBlog
		title={title} setTitle={setTitle}
		author={author} setAuthor={setAuthor}
		url={url} setUrl={setUrl}
		likes={likes} setLikes={setLikes}
		createNewBook={createNewBook}
	    />
	    
	</Togglable>

	{createList(blog)}
	</div>

    )

}

export default Blog
