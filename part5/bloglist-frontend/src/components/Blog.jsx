import Button from './Button.jsx'

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
    

const Blog = ({ blog, user }) => (
  <div>
    <h2>Blogs</h2>
    
    {user.name} logged in. <Button 
	buttonText="Log out" onClick={logout}
    />

    {createList(blog)}
  </div>
)

export default Blog
