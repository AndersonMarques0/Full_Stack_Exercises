import Button from './Button.jsx'
import Input from './Input.jsx'
import blogService from '../services/blogs.js'
import Notification from './Notification.jsx'

const Blog = ({ blog, user, setUser, title, setTitle, author, setAuthor, url, setUrl, likes, setLikes, message, setMessage, css, setCss }) => {

    const createList = (list) => {
	return list.map((item,index) => {
	    return <p key={index} >
		{item.title} {item.author}
		</p>
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

	<h2>create new</h2>

	<Input    
	textLabel="title: "
	type="text"
	placehd="type a title"
	value={title}
	onChange={(e) => setTitle(e.target.value)}
	/>

	<Input
	textLabel="author: "
	type="text"
	placehd="type an author"
	value={author}
	onChange={(e) => setAuthor(e.target.value)}
	/>

	<Input 
	textLabel="url: "
	type="text"
	placehd="type an url"
	value={url}
	onChange={(e) => setUrl(e.target.value)}
	/>

	<Input
	textLabel="Likes: "
	type="number"
	placehd="type the book's likes' number"
	value={likes}
	onChange={(e) => setLikes(e.target.value)}

	/>

	<Button
	buttonText="create"
	onClick={() => createNewBook(title, author, url, likes)}
	/>

	{createList(blog)}
	</div>

    )

}

export default Blog
