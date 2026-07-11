import { render, screen } from '@testing-library/react'
import Blog from './Blog.jsx'
import '../App.css'

test('render blog\'s title and author', () => {
    
    const user = { username: "anderson" }
    const setUser = () => {}
    const setBlogs = () => {}
    const title = ""
    const setTitle = () => {}
    const author = ""
    const setAuthor = () => {}
    const url = ""
    const setUrl = () => {}
    const likes = 0 
    const setLikes = () => {}
    const message = ""
    const setMessage = () => {}
    const css = ""
    const setCss = () => {}
    
    const blogs = [
	{
	    title: "Os sete hábitos de pessoas altamente eficazes",
	    author: "Stephen R. Covey",
	    url: "https://www.pessoasaltamenteeficazes.com",
	    likes: 100,
	    user: {
		username: "anderson",
		name: "Anderson",
		id: "6a170b8378ecddea095aeb3e",
	    },
	    id: "6a36b282b3bbd7678912efa9"
	}
    ]
    
    render(
	<Blog
	    blogs={blogs} setBlogs={setBlogs}
	    user={user} setUser={setUser}
	    title={title} setTitle={setTitle}
	    author={author} setAuthor={setAuthor}
	    url={url} setUrl={setUrl}
	    likes={likes} setLikes={setLikes}
	    message={message} setMessage={setMessage}
	    css={css} setCss={setCss}
	/>
    )
    
    const titleTest = screen.getByText("Os sete hábitos de pessoas altamente eficazes", { exact: false })
    const authorTest = screen.getByText("Stephen R. Covey", { exact: false})
    const urlTest = screen.queryByText("https://www.pessoasaltamenteeficazes.com")
    const likesTest = screen.queryByText("100")
    expect(titleTest).toBeDefined()
    expect(authorTest).toBeDefined()
    expect(urlTest).toBeNull()
    expect(likesTest).toBeNull()

})
