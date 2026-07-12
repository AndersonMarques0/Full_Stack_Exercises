import { useState } from 'react'
import Button from "./Button.jsx"
import Input from "./Input.jsx"

const NewBlog = ({ createNewBook }) => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const [likes, setLikes] = useState(0)

    return (
	<div>
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
	</div>
    )

}

export default NewBlog
