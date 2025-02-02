import { useState, useEffect, useRef } from 'react'
import './App.css'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import CreateBlog from './components/CreateBlog'
import Blog from './components/Blog'
import Notification from './components/Notification'
import loginService from './services/login'
import blogService from './services/blogs'

const App = () => {
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    if(user) {
      blogService.getAll(user).then(blogs =>
        setBlogs( blogs.sort((a,b) => b.likes - a.likes) )
      )
    }  
  }, [user])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedInUser')
    if(loggedUser) {
      const user = JSON.parse(loggedUser)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({username, password})
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      setUser(user)
    } 
    catch (exception) {
      setNotificationMessage({type: 'error', text: 'Wrong username and password'})
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000);
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }

  const loginSection = <Togglable buttonText='Login Form'>
      <LoginForm userLogin={handleLogin}/>
    </Togglable>

  const handleCreateBlog = async (newBlog) => {
    try
    {
      const savedBlog = await blogService.createBlog(newBlog)
      blogFormRef.current.handleToggleVisibility()
      setNotificationMessage({type: 'success', text: `a new blog ${savedBlog.title} by ${savedBlog.author} added`})
      savedBlog.user={username: user['username'], name: user['name']}
      setBlogs(blogs.concat(savedBlog))
      setTimeout(() => setNotificationMessage(null),5000)
    }
    catch{
      setNotificationMessage({type: 'error', text: 'Unable to add this Blog. Please retry'})
      setTimeout(() => setNotificationMessage(null), 5000)
    }
  }

  const createBlogSection = <Togglable buttonText='Add Blog Form' ref={blogFormRef}>
      <CreateBlog addNewBlog={handleCreateBlog}/>
    </Togglable>

  const handleBlogLikeUpdate = async (blogToUpdate) => {
    try {
      const updatedBlog = await blogService.updateBlog(blogToUpdate)
      updatedBlog.user={username: user['username'], name: user['name']}
      let updatedBlogList = blogs.map(blog => blog.id === updatedBlog.id? updatedBlog : blog).sort((a,b) => b.likes - a.likes)
      setBlogs(updatedBlogList)
      setNotificationMessage({type: 'success', text: `likes updated in blog ${updatedBlog.title}`})
      setTimeout(() => setNotificationMessage(null), 5000)
    }
    catch (e) {
      setNotificationMessage({type: 'error', text: e.response.data.error})
      setTimeout(() => setNotificationMessage(null), 5000)
    }
  }

  const handleRemoveBlog = async (blogId) => {
    try {
      const updatedBlog = await blogService.deleteBlog(blogId)
      let updatedBlogList = blogs.filter(blog => blog.id !== blogId).sort((a,b) => b.likes - a.likes)
      setBlogs(updatedBlogList)
    }
    catch (e) {
      setNotificationMessage({type: 'error', text: e.response.data.error})
      setTimeout(() => setNotificationMessage(null), 5000)
    }
  }

  const userInfo = () => (user['name'] + ' logged in ')
  const logoutButton = <button type='submit' onClick={handleLogout}>logout</button>
  const blogsSection = blogs.map(blog => 
                  <Blog key={blog.id} 
                        blog={blog} 
                        blogLikeUpdate={handleBlogLikeUpdate} 
                        removeBlog={handleRemoveBlog}/>)

  return (
    <div>
      <Notification message={notificationMessage}/>
      <h2>blogs</h2>
      {user === null && loginSection}
      {user !== null &&  userInfo()}
      {user !== null && logoutButton}
      <br/>
      <br/>
      {user !== null && createBlogSection}
      {user !== null &&  blogsSection}
    </div>
  )
}

export default App